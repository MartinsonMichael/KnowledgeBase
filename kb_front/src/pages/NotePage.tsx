import * as React from "react";
import Editor from "rich-markdown-editor";
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../store";
import {Note, NoteID} from "../store/messages";
import {addTag, delTag, loadNote, updateBody, updateNote, updateNoteName} from "../store/note/note_actions";
import {RouteComponentProps, withRouter} from "react-router";
import { TagBar } from "../components/TagBar";
import {renderError} from "../components/ErrorPlate";
import {TextField} from "@material-ui/core";


const mapStoreStateToProps = (store: RootState) => ({
    note: store.note.note,

    isLoading: store.note.isLoading,
    error: store.note.error,
});
const mapDispatchToProps = (dispatch: any) => {
    return {
        loadNote: (note_id: NoteID) => dispatch(loadNote(note_id)),
        updateBody: (note_id: NoteID, body: string, locally: boolean = false) => dispatch(updateBody(note_id, body, locally)),
        // updateName: (note: Note, newName: string) => dispatch(updateNoteName(note, newName)),
        // addNoteTag: (note: Note, tagName: string) => dispatch(addTag(note, tagName)),
        // delNoteTag: (note: Note, tagName: string) => dispatch(delTag(note, tagName)),

        updateBodyAndName: (note: Note, body: string, name: string) => dispatch(
            updateNote(note, name, body)
        ),
        addTag: (note: Note, body: string, name: string, tagName: string) => dispatch(
            updateNote(note, name, body, tagName)
        ),
        delTag: (note: Note, body: string, name: string, tagName: string) => dispatch(
            updateNote(note, name, body, undefined, tagName)
        ),
        addLink: (note: Note, body: string, name: string, linkID: string) => dispatch(
            updateNote(note, name, body, undefined, undefined, linkID)
        ),
        delLink: (note: Note, body: string, name: string, linkID: string) => dispatch(
            updateNote(note, name, body, undefined, undefined, undefined, linkID)
        )


    }
};
const connector = connect(mapStoreStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export interface NotePageState {
    localNoteBody: string,
    localNoteName: string,
    localAttributesLoaded: boolean,
    unsavedChangesNumber: number,
}


type PathParamsType = {
  pathNoteID: NoteID
}

export type NotePageProps = PropsFromRedux & RouteComponentProps<PathParamsType> & {
    noteID?: NoteID,
}


class NotePage extends React.Component<NotePageProps, NotePageState>{
    constructor(props: NotePageProps) {
        super(props);
        this.state = {
            unsavedChangesNumber: 0,
            localNoteBody: "",
            localNoteName: "",
            localAttributesLoaded: false,
        };

        this.updateBodyAndName = this.updateBodyAndName.bind(this);
        this.forceUpdate = this.forceUpdate.bind(this);
    }

    componentDidMount(): void {
        let needID: NoteID | undefined = undefined
        if (this.props.noteID !== undefined) {
            needID = this.props.noteID
        } else if (this.props.match.params.pathNoteID !== undefined) {
            needID = this.props.match.params.pathNoteID
        }

        if (needID !== undefined) {
            this.props.loadNote(needID)
        } else {
            console.log('AAAAAA, panic! no note ID')
        }

        // window.addEventListener("beforeunload", (ev) => {
        //     this.forceUpdate();
        //     ev.preventDefault();
        // });
    }


    updateBodyAndName(body: string, name: string): void {
        if (this.props.note === undefined) {
            return;
        }
        if (this.state.unsavedChangesNumber > 20) {
            this.setState({
                localNoteBody: body,
                localNoteName: name,
                unsavedChangesNumber: 0,
            });
            this.props.updateBodyAndName(this.props.note, body, name);
            return;
        }

        this.setState({
            localNoteBody: body,
            localNoteName: name,
            unsavedChangesNumber: this.state.unsavedChangesNumber + 1,
        });
    }

    componentWillUnmount(): void {
        this.forceUpdate()
    }

    forceUpdate(): void {
        if (this.props.note !== undefined) {
            console.log('force save!!');
            this.props.updateBodyAndName(this.props.note, this.state.localNoteBody, this.state.localNoteName);
        }
    }

    render(): React.ReactNode {

        if (this.props.isLoading) {
            return <span>Loading...</span>
        }

        if (this.props.error !== undefined) {
            return renderError(this.props.error)
        }

        if (this.props.note === undefined) {
            return <span>No Note, khm, try to reload page.</span>
        }

        if (!this.state.localAttributesLoaded) {
            this.setState({
                localAttributesLoaded: true,
                localNoteName: this.props.note.name,
                localNoteBody: this.props.note.body,
            })
        }

        const { id, tags, links } = this.props.note;
        return (
            <div style={{margin: "20px"}}>
                <div style={{display: "flex"}}>
                    ID: { id }
                </div>
                <div style={{display: "flex"}}>
                    Name:
                    <TextField
                        value={ this.state.localNoteName }
                        onChange={e => this.updateBodyAndName(this.state.localNoteBody, e.target.value)}
                        onKeyDown={e => {

                            // cntr + S
                            if (e.ctrlKey && (e.keyCode === 83)) {
                                e.preventDefault();
                                this.forceUpdate();
                            }
                        }}
                    />
                </div>
                <TagBar
                    tags={tags}
                    showTagsLabel={true}
                    size={16}
                    onTagAdd={(tagName) => {
                        if (this.props.note !== undefined) {
                            this.props.addTag(this.props.note, this.state.localNoteBody, this.state.localNoteName, tagName)
                            this.setState({unsavedChangesNumber: 0})
                        }
                    }}
                    onDelete={(tagName) => {
                        if (this.props.note !== undefined) {
                            this.props.delTag(this.props.note, this.state.localNoteBody, this.state.localNoteName, tagName)
                            this.setState({unsavedChangesNumber: 0})
                        }
                    }}
                />
                <Editor
                    value={ this.state.localNoteBody }
                    onChange={(valueGetter: () => string) => {
                        this.updateBodyAndName(valueGetter(), this.state.localNoteName)
                    }}
                    onSave={() => this.forceUpdate()}
                    onKeyDown={e => {

                        // cntr + S
                        if (e.ctrlKey && (e.keyCode === 83)) {
                            e.preventDefault();
                            this.forceUpdate();
                        }
                    }}
                />
            </div>
        );
    }
}

export default withRouter(connector(NotePage));
