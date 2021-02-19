import * as React from "react";
import Editor from "rich-markdown-editor";
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../store";
import * as noteAct from "../store/noteService/noteService_actions";
import { RouteComponentProps, withRouter } from "react-router";
import TagBar from "../components/TagBar";
import { Button, IconButton, TextField, Typography } from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { renderUnsavedChangedMarker } from "../components/UnsaveTracker";
import { renderError } from "../components/renderUtils";
import NoteLinkList from "../components/NoteLinkList";



const mapStoreStateToProps = (store: RootState) => ({
    note: store.note.note,
    noteHeadStore: store.structure.noteHeadStore,
    tagStore: store.structure.tagStore,

    error: store.note.error,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadNote: (note_id: string) => dispatch(noteAct.getNote(note_id)),

        updateName: (note: string, name: string) => dispatch(noteAct.updateNoteName(note, name)),
        updateBody: (note: string, body: string,) => dispatch(noteAct.updateNoteName(note, body)),

        addTag: (note_id: string, tag_id: string) => dispatch(noteAct.addNoteTag(note_id, tag_id)),
        delTag: (note_id: string, tag_id: string) => dispatch(noteAct.delNoteTag(note_id, tag_id)),

        addLink: (note_id: string, link_note_id: string) => dispatch(noteAct.addNoteLink(note_id, link_note_id)),
        delLink: (note_id: string, link_note_id: string) => dispatch(noteAct.delNoteLink(note_id, link_note_id)),
    }
};
const connector = connect(mapStoreStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export interface NotePageState {
    unsavedChangesNumber: number,

    bodyState: string,
    addLinkVisible: boolean,
    showNoteSettings: boolean
    showNewPageCreator: boolean,
}


type PathParamsType = {
    pathstring: string
}

export type NotePageProps = PropsFromRedux & RouteComponentProps<PathParamsType> & {}


class NotePage extends React.Component<NotePageProps, NotePageState> {
    private inputBody: any;

    constructor(props: NotePageProps) {
        super(props);
        this.state = {
            unsavedChangesNumber: 0,

            bodyState: "view",
            addLinkVisible: false,
            showNoteSettings: false,
            showNewPageCreator: false,
        };

        this.renderBody = this.renderBody.bind(this);
        this.forceUpdate = this.forceUpdate.bind(this);
        this.loadNote = this.loadNote.bind(this);

        document.addEventListener('keydown', e => {

            // for cnts+s == save
            if (e.ctrlKey && (e.keyCode === 83)) {
                e.preventDefault();
                this.forceUpdate();
            }
        })
    }

    componentDidMount(): void {
        console.log("HERE");
        this.loadNote()
    }

    loadNote(): void {
        let needID = this.props.match.params.pathstring;

        if (needID === "undefined") {
            alert("no note ID");
            console.log("no note ID");
            return;
        }
        this.props.loadNote(needID);
    }

    forceUpdate(): void {
        if (this.props.note !== undefined) {
            this.setState({unsavedChangesNumber: 0})
        }
    }

    renderBody(): React.ReactNode {
        if (this.props.note === undefined) {
            return null;
        }
        const { note_id, body } = this.props.note;
        if (this.state.bodyState === "view") {
            return (
                <div key={note_id + this.props.match.params.pathstring + body}>
                <Editor
                    readOnly
                    placeholder="No any body yet"
                    defaultValue={ body }
                    value={ body }
                    onChange={() => null}
                    onClickLink={(href: string) => {
                        if (href.includes("/note/")) {
                            this.props.history.push(`/note/${href.split("/note/")[1]}`);
                            return;
                        }
                        if (href.includes("/tag/")) {
                            this.props.history.push(`/tag/${href.split("/tag/")[1]}`);
                            return;
                        }
                        window.open(href, "_blank")
                    }}
                />
                </div>
            )
        }
        if (this.state.bodyState === "edit") {
            return null
        }
    }

    render(): React.ReactNode {

        if (this.props.error !== undefined) {
            return renderError(this.props.error)
        }

        if (this.props.note === undefined) {
            return <span>No Note, khm, try to reload page.</span>
        }


        const { note_id, tags, links } = this.props.note;
        return (
            <div style={{margin: "20px", display: "flex" }}>
                <div style={{ width: "70%", marginRight: "20px"}}>
                    {/*{ this.state.bodyState === "edit" ?*/}
                    {/*    <Link*/}
                    {/*        href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"*/}
                    {/*        target="_blank"*/}
                    {/*     >*/}
                    {/*        Markdown Cheatsheet*/}
                    {/*    </Link>*/}
                    {/*    :*/}
                    {/*    null*/}
                    {/*}*/}

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Button
                            onClick={() => this.props.history.goBack()}
                            size="small"
                        >
                            <ArrowBackIcon/>
                            Back
                        </Button>
                        <IconButton
                            onClick={() => this.setState({showNoteSettings: true})}
                        >
                            <SettingsIcon/>
                        </IconButton>
                        {this.state.bodyState === "view" ?
                            <Button onClick={() => this.setState({bodyState: "edit"})} color="primary">
                                <EditIcon/>
                                Edit
                            </Button>
                            :
                            <Button
                                onClick={() => {
                                    this.forceUpdate();
                                    this.setState({ bodyState: "view" })
                                }}
                            >
                                <SaveIcon/>
                                Save
                            </Button>
                        }
                        { renderUnsavedChangedMarker(this.state.unsavedChangesNumber) }
                    </div>

                    <div style={{display: "flex", alignItems: "center" }}>
                        {this.state.bodyState === "view" ?
                            <Typography>{ this.props.note.name }</Typography>
                            :
                            <TextField
                                fullWidth
                                size="small"
                                value={ this.props.note.name }
                                // onChange={e => this.props.updateName(this.props.note, e.target.value)}
                            />
                        }
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <TagBar
                            parentstring={ note_id }
                            tags={ tags }
                            size={ 16 }
                            showAddButtons={this.state.bodyState === "edit"}
                            showDeleteButtons={this.state.bodyState === "edit"}
                            onTagAdd={ (tag_id: string) => this.props.addTag(note_id, tag_id) }
                            onTagDelete={ (tag_id: string) => this.props.delTag(note_id, tag_id) }
                        />
                    </div>
                    { this.renderBody() }
                </div>
                <div style={{ width: "30%" }}>
                    <NoteLinkList
                        noteList={ links }
                        showDelButtons={ this.state.bodyState === "edit" }
                        showAddButton
                        onAdd={ (link_note_id: string) => this.props.addLink(note_id, link_note_id) }
                        onDelete={ (link_note_id: string) => this.props.delLink(note_id, link_note_id) }
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(connector(NotePage));