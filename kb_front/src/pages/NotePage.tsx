import * as React from "react";
import Editor from "rich-markdown-editor";
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../store";
import {Note, NoteID} from "../store/messages";
import {addTag, delTag, loadNote, updateBody} from "../store/note/note_actions";
import {RouteComponentProps, withRouter} from "react-router";
import { TagBar } from "../components/TagBar";


const mapStoreStateToProps = (store: RootState) => ({
    note: store.note.note,

    isLoading: store.note.isLoading,
    error: store.note.error,
});
const mapDispatchToProps = (dispatch: any) => {
    return {
        loadNote: (note_id: NoteID) => dispatch(loadNote(note_id)),
        updateBody: (note_id: NoteID, body: string, locally: boolean = false) => dispatch(updateBody(note_id, body, locally)),

        addNoteTag: (note: Note, tagName: string) => dispatch(addTag(note, tagName)),
        delNoteTag: (note: Note, tagName: string) => dispatch(delTag(note, tagName)),
    }
};
const connector = connect(mapStoreStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export interface NotePageState {
    localNoteBody?: string,
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
            localNoteBody: undefined,
            unsavedChangesNumber: 0,
        };

        this.updateBody = this.updateBody.bind(this);
        this.forceUpdateBody = this.forceUpdateBody.bind(this);
    }

    componentDidMount(): void {
        let needID: NoteID | undefined = undefined
        if (this.props.noteID !== undefined) {
            needID = this.props.noteID
        } else if (this.props.match.params.pathNoteID !== undefined) {
            needID = this.props.match.params.pathNoteID
        }

        // if (this.props.note !== undefined && this.props.note.id === needID) {
        //     return
        // }

        if (needID !== undefined) {
            this.props.loadNote(needID)
        } else {
            console.log('AAAAAA, panic! no note ID')
        }

        window.addEventListener("beforeunload", (ev) => {
            this.forceUpdateBody();
            ev.preventDefault();
        });
    }


    updateBody(newValue: string): void {
        if (this.props.note === undefined) {
            return;
        }
        if (this.state.unsavedChangesNumber > 30) {
            this.setState({
                localNoteBody: newValue,
                unsavedChangesNumber: 0,
            });
            this.props.updateBody(this.props.note.id, newValue, true);
            return;
        }

        this.setState({
            localNoteBody: newValue,
            unsavedChangesNumber: this.state.unsavedChangesNumber + 1,
        });
    }

    componentWillUnmount(): void {
        this.forceUpdateBody()
    }

    forceUpdateBody(): void {
        if (this.props.note !== undefined && this.state.localNoteBody !== undefined) {
            console.log('force save!!');
            this.props.updateBody(this.props.note.id, this.state.localNoteBody, true)
        }
    }

    render(): React.ReactNode {

        if (this.props.isLoading) {
            return <span>Loading...</span>
        }

        if (this.props.note === undefined) {
            return <span>No Note, khm, try to reload page.</span>
        }

        const { id, name, tags, links, body } = this.props.note;
        return (
            <div style={{margin: "20px"}}>
                <div style={{display: "flex"}}>
                    ID: { id }
                </div>
                <div style={{display: "flex"}}>
                    Name: { name }
                </div>
                <TagBar
                    tags={tags}
                    showTagsLabel={true}
                    size={16}
                    onTagAdd={(tagName) => {
                        if (this.props.note !== undefined) {
                            this.props.addNoteTag(this.props.note, tagName)
                        }
                    }}
                    onDelete={(tagName) => {
                        if (this.props.note !== undefined) {
                            this.props.delNoteTag(this.props.note, tagName)
                        }
                    }}
                />
                <Editor
                    defaultValue={body}
                    onChange={(valueGetter: () => string) => this.updateBody(valueGetter())}
                    onSave={() => this.forceUpdateBody()}
                    onKeyDown={e => {

                        // cntr + S
                        if (e.ctrlKey && (e.keyCode === 83)) {
                            e.preventDefault();
                            this.forceUpdateBody();
                        }
                    }}
                />
            </div>
        );
    }
}

export default withRouter(connector(NotePage));
