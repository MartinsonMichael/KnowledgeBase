import * as React from "react";
import Editor from "rich-markdown-editor";
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../store";
import { construct_Note, Note, NoteHead, NoteID, NoteTag } from "../store/messages";
import * as noteAct from "../store/noteService/noteService_actions";
import { RouteComponentProps, withRouter } from "react-router";
import TagBar from "../components/TagBar";
import { renderError } from "../components/ErrorPlate";
import {Button, CircularProgress, IconButton, InputBase, TextField, Typography} from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import QueueIcon from '@material-ui/icons/Queue';
import TagCreator from "../components/NewTagCreator"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import LinkSearch from "../components/LinkDialogSearch";
import { ChangeLinkDialogState, OpenNewTagCreatorSystemAction } from "../store/system/system_actions";
import { createMDLinkToNote, createMDLinkToTag, insertStringIntoString } from "../components/utils";
import NoteLinkList from "../components/NoteLinkList";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import NewNoteCreator from "../components/NewNoteCreator";
import {renderUnsavedChangedMarker} from "../components/UnsaveTracker";
import axios from "../store/client";



const mapStoreStateToProps = (store: RootState) => ({
    note: store.note.note,
    noteHeadStore: store.structure.noteHeadStore,

    error: store.note.error,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadNote: (note_id: NoteID) => dispatch(noteAct.getNote(note_id)),

        updateName: (note: string, name: string) => dispatch(noteAct.updateNoteName(note, name)),
        updateBody: (note: string, body: string,) => dispatch(noteAct.updateNoteName(note, body)),

        openDialogLinks: () => dispatch(ChangeLinkDialogState("link")),
        closeDialog: () => dispatch(ChangeLinkDialogState("close")),

        openCreateTagDialog: () => dispatch(OpenNewTagCreatorSystemAction()),
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
  pathNoteID: NoteID
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
        let needID = this.props.match.params.pathNoteID;

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
        const { id, body } = this.props.note;
        if (this.state.bodyState === "view") {
            return (
                <div key={id + this.props.match.params.pathNoteID + body}>
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
            return (
                <InputBase
                    multiline
                    placeholder="Start to add body for this Note..."
                    style={{ width: "100%" }}
                    value={ body }
                    // onChange={e => this.props.updateBody(this.props.note.id, e.target.value)}
                    ref={el=>this.inputBody=el}
                    onKeyDown={e => {

                        // ?? should be @
                        if (e.keyCode === 50 && e.ctrlKey) {
                            this.props.openDialogLinks();
                        }
                    }}
                />
            )
        }
    }

    renderNoteSettings(): React.ReactNode {
        return (
            <Dialog
                open={ this.state.showNoteSettings }
                onEscapeKeyDown={ () => this.setState({ showNoteSettings: false }) }
            >

                <div>
                    <Button onClick={() => this.setState({ showNewPageCreator: true, showNoteSettings: false })}>
                        Make new Note as child Note
                    </Button>
                    <Button onClick={() => {
                        // if (this.props.note !== undefined) {
                        //     this.props.updateHomePage(this.props.note.id)
                        // }
                        this.setState({ showNoteSettings: false })
                    }}>
                        <div>
                            <span>Set this page as root</span>
                            <p/>
                            {/*<span color="grey">Now it is a "{ this.props.homePage }"</span>*/}
                        </div>
                    </Button>
                </div>

                <DialogActions>
                  <Button onClick={() => this.setState({showNoteSettings: false})} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
            </Dialog>
        )
    }

    render(): React.ReactNode {

        if (this.props.error !== undefined) {
            return renderError(this.props.error)
        }

        if (this.props.note === undefined) {
            return <span>No Note, khm, try to reload page.</span>
        }


        const { id, tags, links } = this.props.note;
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

                    <NewNoteCreator
                        isOpen={ this.state.showNewPageCreator }
                        close={() => this.setState({ showNewPageCreator: false })}
                        noteToAddNewAsLink={ this.props.note }
                    />

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
                                    this.forceUpdate()
                                    this.setState({ bodyState: "view" })
                                }}
                            >
                                <SaveIcon/>
                                Save
                            </Button>
                        }
                        { renderUnsavedChangedMarker(this.state.unsavedChangesNumber) }
                        {/*{ this.props.isLoading_NoteUpdate ? <CircularProgress/> : null }*/}
                    </div>
                    { this.renderNoteSettings() }


                    <div style={{display: "flex"}}>
                        <Typography> ID: { id }</Typography>
                    </div>
                    <div style={{display: "flex", alignItems: "center" }}>
                        <Typography> Name: </Typography>
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
                            parentNoteID={ id }
                            tags={ tags }
                            showTagsLabel
                            size={ 16 }
                            showAddButtons={this.state.bodyState === "edit"}
                            showDeleteButtons={this.state.bodyState === "edit"}
                            onTagAdd={(tagName) => {
                                if (this.props.note !== undefined) {
                                    // this.props.addTag(this.props.note, tagName);
                                    this.setState({unsavedChangesNumber: 0})
                                }
                            }}
                            onTagDelete={(tagName) => {
                                if (this.props.note !== undefined) {
                                    // this.props.delTag(this.props.note, tagName);
                                    this.setState({unsavedChangesNumber: 0})
                                }
                            }}
                        />
                        { this.state.bodyState === "edit" ?
                            <IconButton
                                onClick={() => this.props.openCreateTagDialog()}
                                size="small"
                            >
                                <QueueIcon fontSize="small"/>
                                Create new Tag
                            </IconButton>
                            :
                            null
                        }
                        <TagCreator noteToAddNewTag={this.props.note}/>
                    </div>
                    {/*<LinkSearch onSelect={result => {*/}
                    {/*    if (this.props.note === undefined) {*/}
                    {/*        return;*/}
                    {/*    }*/}
                    {/*    if (result.type === "link") {*/}
                    {/*        const noteHead = result.payload as NoteHead;*/}
                    {/*        const newBody = insertStringIntoString(*/}
                    {/*            this.state.localNoteBody,*/}
                    {/*            createMDLinkToNote(noteHead.id, noteHead.name),*/}
                    {/*            this.inputBody.selectionStart,*/}
                    {/*        );*/}
                    {/*        this.props.addLink(*/}
                    {/*            this.props.note,*/}
                    {/*            newBody,*/}
                    {/*            this.state.localNoteName,*/}
                    {/*            noteHead.id,*/}
                    {/*        );*/}
                    {/*        this.setState({localNoteBody: newBody, unsavedChangesNumber: 0});*/}
                    {/*    }*/}
                    {/*    if (result.type === "tag") {*/}
                    {/*        const noteTag = result.payload as NoteTag;*/}
                    {/*        this.updateBodyAndName(*/}
                    {/*            insertStringIntoString(*/}
                    {/*                this.state.localNoteBody,*/}
                    {/*                createMDLinkToTag(noteTag.name),*/}
                    {/*                this.inputBody.selectionStart,*/}
                    {/*            ),*/}
                    {/*            this.state.localNoteName,*/}
                    {/*        )*/}
                    {/*    }*/}
                    {/*}}/>*/}
                    { this.renderBody() }
                </div>
                <div style={{ width: "30%" }}>
                    Link from this note:
                    {/*<NoteLinkList*/}
                    {/*    showTags*/}
                    {/*    noteIDList={ links }*/}
                    {/*    showDelButtons={ this.state.bodyState === "edit" }*/}
                    {/*    showAddButton*/}
                    {/*    onAdd={(linkNoteID: NoteID) => {*/}
                    {/*        if (this.props.note !== undefined) {*/}
                    {/*            this.props.addLink(*/}
                    {/*                this.props.note.id,*/}
                    {/*                linkNoteID,*/}
                    {/*            )*/}
                    {/*        }*/}
                    {/*    }}*/}
                    {/*    onDelete={(linkNoteID: NoteID) => {*/}
                    {/*        if (this.props.note !== undefined) {*/}
                    {/*            this.props.delLink(*/}
                    {/*                this.props.note,*/}
                    {/*                linkNoteID,*/}
                    {/*            )*/}
                    {/*        }*/}
                    {/*    }}*/}
                    {/*/>*/}
                </div>
            </div>
        );
    }
}

export default withRouter(connector(NotePage));