import * as React from "react";
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
import { renderError, renderSuccessMsg } from "../components/renderUtils";
import NoteLinkList from "../components/NoteLinkList";
import NoteBody from "../components/NoteBody";
import { needBodyUpdate, removeSuccessMsg } from "../store/noteService/noteService_inplace_actions";
import { addBrowserHistoryNote, unsetNeedReload } from "../store/system/system_actions";
import { createNewTag } from "../store/structureService/createNewTag_action";
import {Note, NoteHeadStore} from "../store/generated_messages";
import {createNewNote} from "../store/noteService/createNewNote_action";



const mapStoreStateToProps = (store: RootState) => ({
    noteHeadStore: store.structure.noteHeadStore,
    tagStore: store.structure.tagStore,

    note: store.note.note,
    changeNum: store.note.changeNum,

    needReloading: store.system.needReloading,
    noteBrowserHistory: store.system.noteBrowserHistory,

    isLoading: store.note.isLoading,
    msg: store.note.msg,
    error: store.note.error,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadNote: (note_id: string) => dispatch(noteAct.getNote(note_id)),
        createNewNote: (noteName: string, note: Note | undefined) => dispatch(createNewNote(noteName, note)),

        updateName: (note: string, name: string) => dispatch(noteAct.updateNoteName(note, name)),
        needBodyUpdate: () => dispatch(needBodyUpdate()),

        createNewTag: (note_id: string, tagName: string, note: Note | undefined) => dispatch(createNewTag(tagName, note_id, note)),
        addTag: (note_id: string, tag_id: string) => dispatch(noteAct.addNoteTag(note_id, tag_id)),
        delTag: (note_id: string, tag_id: string) => dispatch(noteAct.delNoteTag(note_id, tag_id)),

        addLink: (note_id: string, link_note_id: string) => dispatch(noteAct.addNoteLink(note_id, link_note_id)),
        delLink: (note_id: string, link_note_id: string) => dispatch(noteAct.delNoteLink(note_id, link_note_id)),

        removeMsg: () => dispatch(removeSuccessMsg()),
        unsetNeedReload: () => dispatch(unsetNeedReload()),
        addBrowserHistoryNote: (note_id: string) => dispatch(addBrowserHistoryNote(note_id)),
    }
};
const connector = connect(mapStoreStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export interface NotePageState {
    bodyState: "view" | "edit",
    showNoteSettings: boolean
}


type PathParamsType = {
    note_id: string
}

export type NotePageProps = PropsFromRedux & RouteComponentProps<PathParamsType> & {}


class NotePage extends React.Component<NotePageProps, NotePageState> {

    constructor(props: NotePageProps) {
        super(props);
        this.state = {
            bodyState: "view",
            showNoteSettings: false,
        };
        this.loadNote = this.loadNote.bind(this);

        document.addEventListener('keydown', e => {

            // for cnts+s == save
            if (e.ctrlKey && (e.keyCode === 83)) {
                e.preventDefault();
            }
        });
    }

    componentDidMount(): void {
        this.loadNote()
    }

    loadNote(): void {
        let needID = this.props.match.params.note_id;
        if (needID === undefined) {
            return
        }
        this.props.loadNote(needID);
    }

    renderSaveButton(): React.ReactNode {
        if (this.state.bodyState === "view") {
            return (
                <Button onClick={() => this.setState({bodyState: "edit"})} color="primary">
                    <EditIcon/>
                    Edit
                </Button>
            )
        }
        if (this.state.bodyState === "edit" && this.props.note !== undefined) {
            return (
                <Button
                    onClick={() => {
                        if (this.props.changeNum !== 0) {
                            this.props.needBodyUpdate();
                        }
                        this.setState({bodyState: "view"})
                    }}
                >
                    <SaveIcon/>
                    Save
                </Button>
            )
        }
    }

    showMsg(): React.ReactNode {
        const { msg } = this.props;
        if (msg === undefined) {
            return null;
        }
        setTimeout(() => this.props.removeMsg(), 3000);
        return renderSuccessMsg(msg);
    }

    showError(): React.ReactNode {
        const { error } = this.props;
        if (error === undefined) {
            return null;
        }
        setTimeout(() => this.props.removeMsg(), 5000);
        return renderError(error);
    }

    render(): React.ReactNode {

        if (this.props.note === undefined) {
            return <span>No Note, khm, try to reload page.</span>
        }
        if (this.props.needReloading) {
            this.loadNote();
            this.props.unsetNeedReload();
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
                            onClick={() => {
                                const last_note_id = this.props.noteBrowserHistory.pop();
                                if (last_note_id !== undefined) {
                                    this.props.history.push(`/note/${last_note_id}`)
                                }
                            } }
                            size="small"
                            disabled={ this.props.noteBrowserHistory.length === 1 }
                        >
                            <ArrowBackIcon/>
                            Back
                        </Button>
                        <IconButton
                            onClick={() => this.setState({showNoteSettings: true})}
                        >
                            <SettingsIcon/>
                        </IconButton>
                        { this.renderSaveButton() }
                        { renderUnsavedChangedMarker(this.props.changeNum) }
                    </div>

                    <div style={{display: "flex", alignItems: "center" }}>
                        {this.state.bodyState === "view" ?
                            <Typography>{ this.props.note.name }</Typography>
                            :
                            <TextField
                                fullWidth
                                size="small"
                                value={ this.props.note.name }
                                onChange={e => this.props.updateName(note_id, e.target.value)}
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
                            onNewTag={ (tagName: string) => this.props.createNewTag(note_id, tagName, this.props.note) }
                        />
                    </div>
                    <NoteBody
                        note_id={ note_id }
                        mode={ this.state.bodyState }
                    />
                </div>
                <div style={{ width: "30%" }}>
                    <NoteLinkList
                        noteList={ links }
                        showDelButtons={ this.state.bodyState === "edit" }
                        showAddButton
                        onAdd={ (link_note_id: string) => this.props.addLink(note_id, link_note_id) }
                        onDelete={ (link_note_id: string) => this.props.delLink(note_id, link_note_id) }
                        onNew={ (noteName: string) => this.props.createNewNote(noteName, this.props.note) }
                    />
                </div>
                { this.showMsg() }
                { this.showError() }
            </div>
        );
    }
}

export default withRouter(connector(NotePage));