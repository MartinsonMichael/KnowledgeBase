import * as React from "react";
import Editor from "rich-markdown-editor";
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../store";
import {Note, NoteHead, NoteID, NoteTag} from "../store/messages";
import {loadNote, updateHomePage, updateNote} from "../store/note/note_actions";
import { RouteComponentProps, withRouter } from "react-router";
import TagBar from "../components/TagBar";
import { renderError } from "../components/ErrorPlate";
import {Button, CircularProgress, IconButton, InputBase, Link, TextField, Typography} from "@material-ui/core";
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
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import NewNoteCreator from "../components/NewNoteCreator";
import {renderUnsavedChangedMarker} from "../components/UnsaveTracker";



const mapStoreStateToProps = (store: RootState) => ({
    note: store.note.note,
    noteHeadStore: store.note.noteHeadStore,
    homePage: store.note.homePage,

    isLoading: store.note.isLoading,
    error: store.note.error,
});
const mapDispatchToProps = (dispatch: any) => {
    return {
        loadNote: (note_id: NoteID) => dispatch(loadNote(note_id)),

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
        ),

        openDialogLinks: () => dispatch(ChangeLinkDialogState("link")),
        // openDialogTags: () => dispatch(ChangeLinkDialogState("tag")),
        closeDialog: () => dispatch(ChangeLinkDialogState("close")),

        openCreateTagDialog: () => dispatch(OpenNewTagCreatorSystemAction()),

        updateHomePage: (homePage: NoteID) => dispatch(updateHomePage(homePage)),
    }
};
const connector = connect(mapStoreStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export interface NotePageState {
    localNoteBody: string,
    localNoteName: string,
    localNoteID: NoteID,
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
            localNoteBody: "",
            localNoteName: "",
            localNoteID: "",

            bodyState: "view",
            addLinkVisible: false,
            showNoteSettings: false,
            showNewPageCreator: false,
        };

        this.updateBodyAndName = this.updateBodyAndName.bind(this);
        this.forceUpdate = this.forceUpdate.bind(this);
        this.onOpenNote = this.onOpenNote.bind(this);

        document.addEventListener('keydown', e => {

            // for cnts+s == save
            if (e.ctrlKey && (e.keyCode === 83)) {
                e.preventDefault();
                this.forceUpdate();
            }
        })
    }

    componentDidMount(): void {
        this.onOpenNote();
    }

    onOpenNote(): void {
        if (this.props.homePage === undefined) {
            return;
        }

        let needID = this.props.match.params.pathNoteID;

        if (needID === "undefined") {
            needID = this.props.homePage;
            this.props.history.push(`/note/${ this.props.homePage }`);
        }

        if (this.state.localNoteID !== needID) {
            this.props.loadNote(needID)
        }
    }

    componentDidUpdate(prevProps: NotePageProps) {
        if (this.props.location !== prevProps.location) {
            this.onOpenNote();
        }
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
            this.props.updateBodyAndName(this.props.note, this.state.localNoteBody, this.state.localNoteName);
            this.setState({unsavedChangesNumber: 0})
        }
    }

    renderBody(): React.ReactNode {
        if (this.state.bodyState === "view") {
            return (
                <div key={this.state.localNoteID + this.props.match.params.pathNoteID + this.state.localNoteBody}>
                <Editor
                    readOnly
                    placeholder="No any body yet"
                    defaultValue={ this.state.localNoteBody }
                    value={ this.state.localNoteBody }
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
                    value={ this.state.localNoteBody }
                    onChange={e => this.updateBodyAndName(e.target.value, this.state.localNoteName)}
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
                        if (this.props.note !== undefined) {
                            this.props.updateHomePage(this.props.note.id)
                        }
                        this.setState({ showNoteSettings: false })
                    }}>
                        <div>
                            <span>Set this page as root</span>
                            <p/>
                            <span color="grey">Now it is a "{ this.props.homePage }"</span>
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

        this.onOpenNote();

        if (this.props.note === undefined) {
            return <span>No Note, khm, try to reload page.</span>
        }

        if (this.state.localNoteID !== this.props.note.id) {
            this.setState({
                localNoteID: this.props.note.id,
                localNoteName: this.props.note.name,
                localNoteBody: this.props.note.body,
            })
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
                                    this.setState({bodyState: "view"})
                                }}
                            >
                                <SaveIcon/>
                                Save
                            </Button>
                        }
                        { renderUnsavedChangedMarker(this.state.unsavedChangesNumber) }
                        { this.props.isLoading ? <CircularProgress/> : null }
                    </div>
                    { this.renderNoteSettings() }


                    <div style={{display: "flex"}}>
                        <Typography> ID: { id }</Typography>
                    </div>
                    <div style={{display: "flex", alignItems: "center" }}>
                        <Typography> Name: </Typography>
                        {this.state.bodyState === "view" ?
                            <Typography>{ this.state.localNoteName }</Typography>
                            :
                            <TextField
                                fullWidth
                                size="small"
                                value={this.state.localNoteName}
                                onChange={e => this.updateBodyAndName(this.state.localNoteBody, e.target.value)}
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
                                    this.props.addTag(this.props.note, this.state.localNoteBody, this.state.localNoteName, tagName);
                                    this.setState({unsavedChangesNumber: 0})
                                }
                            }}
                            onTagDelete={(tagName) => {
                                if (this.props.note !== undefined) {
                                    this.props.delTag(this.props.note, this.state.localNoteBody, this.state.localNoteName, tagName);
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
                    <LinkSearch onSelect={result => {
                        if (this.props.note === undefined) {
                            return;
                        }
                        if (result.type === "link") {
                            const noteHead = result.payload as NoteHead;
                            const newBody = insertStringIntoString(
                                this.state.localNoteBody,
                                createMDLinkToNote(noteHead.id, noteHead.name),
                                this.inputBody.selectionStart,
                            );
                            this.props.addLink(
                                this.props.note,
                                newBody,
                                this.state.localNoteName,
                                noteHead.id,
                            );
                            this.setState({localNoteBody: newBody, unsavedChangesNumber: 0});
                        }
                        if (result.type === "tag") {
                            const noteTag = result.payload as NoteTag;
                            this.updateBodyAndName(
                                insertStringIntoString(
                                    this.state.localNoteBody,
                                    createMDLinkToTag(noteTag.name),
                                    this.inputBody.selectionStart,
                                ),
                                this.state.localNoteName,
                            )
                        }
                    }}/>
                    { this.renderBody() }
                </div>
                <div style={{ width: "30%" }}>
                    Link from this note:
                    <NoteLinkList
                        showTags
                        noteIDList={ links }
                        showDelButtons={ this.state.bodyState === "edit" }
                        showAddButton
                        // showAddButton={ this.state.bodyState === "edit" }
                        onAdd={(linkNoteID: NoteID) => {
                            if (this.props.note !== undefined) {
                                this.props.addLink(
                                    this.props.note,
                                    this.state.localNoteBody,
                                    this.state.localNoteName,
                                    linkNoteID,
                                )
                            }
                        }}
                        onDelete={(linkNoteID: NoteID) => {
                            if (this.props.note !== undefined) {
                                this.props.delLink(
                                    this.props.note,
                                    this.state.localNoteBody,
                                    this.state.localNoteName,
                                    linkNoteID,
                                )
                            }
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(connector(NotePage));