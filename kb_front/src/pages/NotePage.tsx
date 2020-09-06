import * as React from "react";
import Editor from "rich-markdown-editor";
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../store";
import {Note, NoteHead, NoteID, NoteTag} from "../store/messages";
import { loadNote, updateNote } from "../store/note/note_actions";
import { RouteComponentProps, withRouter } from "react-router";
import { TagBar } from "../components/TagBar";
import { renderError } from "../components/ErrorPlate";
import { Button, Link, TextField } from "@material-ui/core";
import TagCreator from "../components/NewTagCreator"
import LinkSearch from "../components/LinkDialogSearch";
import { ChangeLinkDialogState, OpenNewTagCreatorSystemAction } from "../store/system/system_actions";
import { createMDLinkToNote, createMDLinkToTag, insertStringIntoString } from "../components/utils";
import NoteLinkList from "../components/NoteLinkList";
import NoteNameSelect from "../components/NoteNameSelect";



const mapStoreStateToProps = (store: RootState) => ({
    note: store.note.note,
    noteHeadStore: store.note.noteHeadStore,

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
    }
};
const connector = connect(mapStoreStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export interface NotePageState {
    localNoteBody: string,
    localNoteName: string,
    localNoteID: NoteID,
    unsavedChangesNumber: number,

    linkSearchPosition: number,
    bodyState: string,
    addLinkVisible: boolean,
}


type PathParamsType = {
  pathNoteID: NoteID
}

export type NotePageProps = PropsFromRedux & RouteComponentProps<PathParamsType> & {
    noteID?: NoteID,
}


class NotePage extends React.Component<NotePageProps, NotePageState> {
    private inputBody: any;

    constructor(props: NotePageProps) {
        super(props);
        this.state = {
            unsavedChangesNumber: 0,
            localNoteBody: "",
            localNoteName: "",
            localNoteID: "",

            linkSearchPosition: 0,
            bodyState: "view",
            addLinkVisible: false,
        };

        this.updateBodyAndName = this.updateBodyAndName.bind(this);
        this.forceUpdate = this.forceUpdate.bind(this);
    }

    componentDidMount(): void {
        this.onOpenNote()
    }

    onOpenNote(): void {
        let needID: NoteID | undefined = undefined;
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
        }
    }

    renderBody(): React.ReactNode {
        if (this.state.bodyState === "view") {
            return (
                <Editor
                    readOnly
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
            )
        }
        if (this.state.bodyState === "edit") {
            return (
                <textarea
                    style={{ width: "100%", height: "400px" }}
                    value={ this.state.localNoteBody }
                    onKeyPress={e => console.log(e)}
                    onChange={e => {
                        if (typeof(this.inputBody)==='object' && this.inputBody!==null) {
                            const selectionStart = this.inputBody.selectionStart;
                            if (typeof(selectionStart)==='number') {
                                this.setState({linkSearchPosition: selectionStart});
                            }
                        }
                        this.updateBodyAndName(e.target.value, this.state.localNoteName)
                    }}
                    ref={el=>this.inputBody=el}
                    // onSave={() => this.forceUpdate()}
                    onSelect={e => console.log(e)}
                    onKeyDown={e => {

                        // ?? should be @
                        if (e.keyCode === 50) {
                            this.props.openDialogLinks();
                        }

                        // cntr + S
                        if (e.ctrlKey && (e.keyCode === 83)) {
                            e.preventDefault();
                            this.forceUpdate();
                        }
                    }}
                />
            )
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

                    { this.state.bodyState === "edit" ?
                        <Link
                            href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
                            target="_blank"
                         >
                            Markdown Cheatsheet
                        </Link>
                        :
                        null
                    }


                    <div style={{display: "flex"}}>
                        ID: { id }
                    </div>
                    <div style={{display: "flex"}}>
                        Name:
                        <TextField
                            fullWidth
                            value={ this.state.localNoteName }
                            onChange={e => {
                                if (this.state.bodyState === "edit") {
                                    this.updateBodyAndName(this.state.localNoteBody, e.target.value)
                                } else {
                                    alert("Switch to Edit mode")
                                }
                            }}
                            onKeyDown={e => {

                                // cntr + S
                                if (e.ctrlKey && (e.keyCode === 83)) {
                                    e.preventDefault();
                                    this.forceUpdate();
                                }
                            }}
                        />
                    </div>
                    <div style={{ display: "flex"}}>
                        <TagBar
                            tags={tags}
                            showTagsLabel
                            size={16}
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
                            <button onClick={() => this.props.openCreateTagDialog()}>Create new Tag</button>
                            :
                            null
                        }
                        <TagCreator noteToAddNewTag={this.props.note}/>
                    </div>
                    <LinkSearch onSelect={result => {
                        if (this.props.note === undefined) {
                            return;
                        }
                        console.log("linkSearchPosition", this.state.linkSearchPosition);
                        console.log(result);
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
                    <div style={{display: "flex"}}>
                        <button
                            onClick={() => this.setState({bodyState: "view"})}
                            disabled={this.state.bodyState === "view"}
                        >
                            View
                        </button>
                        <button
                            onClick={() => this.setState({bodyState: "edit"})}
                            disabled={this.state.bodyState === "edit"}
                        >
                            Edit
                        </button>
                    </div>
                    { this.renderBody() }
                </div>
                <div style={{ width: "30%" }}>
                    Link from this note:
                    <NoteLinkList
                        showTags
                        noteIDList={ links }
                        showDelButtons={ this.state.bodyState === "edit" }
                        showAddButton={ this.state.bodyState === "edit" }
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