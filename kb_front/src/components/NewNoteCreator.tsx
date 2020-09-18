import * as React from "react";
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../store";
import {createNewNote, updateNote} from "../store/note/note_actions";
import { RouteComponentProps, withRouter } from "react-router";
import {Dialog, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { renderError } from "./ErrorPlate";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import {toggleNewNoteCreator} from "../store/system/system_actions";
import {Note, NoteID} from "../store/messages";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";


const mapStoreStateToProps = (store: RootState) => ({
    newNote: store.note.createdNote,

    isLoading: store.note.isLoading,
    error: store.note.error,
});
const mapDispatchToProps = (dispatch: any) => {
    return {
        createNewNote: (noteID: string, name: string) => dispatch(createNewNote(noteID, name)),
        addLink: (note: Note, linkToAdd: NoteID) => dispatch(
            updateNote(note, undefined, undefined, undefined, undefined, linkToAdd)
        ),
    }
};
const connector = connect(mapStoreStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

type CreationState = "fill-form" | "waiting" | "ready"
export interface NewNotePageState {
    newNoteID: string
    newNoteName: string

    creationState: CreationState
}

export type NewNotePageProps = PropsFromRedux & RouteComponentProps<{}> & {
    isOpen: boolean,
    close: () => void,

    noteToAddNewAsLink?: Note,
}


class NewNoteCreator extends React.Component<NewNotePageProps, NewNotePageState>{
    constructor(props: NewNotePageProps) {
        super(props);
        this.state = {
            newNoteID: NewNoteCreator.generateRandomNoteId(),
            newNoteName: "",

            creationState: "fill-form",
        };

        this.createNote = this.createNote.bind(this)
    }

    static generateRandomNoteId(): string {
        const curDate = new Date();
        return curDate.toISOString();
    }

    createNote() {
        if (this.state.newNoteName.length === 0) {
            alert("Note name must be not empty");
            return
        }
        this.props.createNewNote(this.state.newNoteID, this.state.newNoteName);
        this.setState({ creationState: "waiting" })
    }

    render(): React.ReactNode {

        if (this.state.creationState === "waiting") {
            if (!this.props.isLoading && this.props.error === undefined && this.props.newNote !== undefined) {
                this.setState({ creationState: "ready" });
                
                if (this.props.noteToAddNewAsLink !== undefined) {
                    this.props.addLink(this.props.noteToAddNewAsLink, this.props.newNote)
                }
            } else if (this.props.error !== undefined) {
                return renderError(this.props.error)
            }
        }

        return (
            <Dialog
                open={ this.props.isOpen }
                onEscapeKeyDown={this.props.close}
                onBackdropClick={this.props.close}
            >
                <DialogContent>
                    <span>State : { this.state.creationState }</span>
                    <p/>
                    Enter name for note (you can modify it in future, but it can't be empty)
                    <p/>
                    Then pres 'Create' to create note.
                    <p/>
                    <TextField
                        disabled={ this.state.creationState !== "fill-form" }
                        placeholder="Enter note name"
                        value={this.state.newNoteName}
                        onChange={e => this.setState({ newNoteName: e.target.value })}
                    />
                    <p/>
                    You can type human-readable note ID, or just use generated one.
                    <p/>
                    <TextField
                        disabled={ this.state.creationState !== "fill-form" }
                        value={ this.state.newNoteID }
                        onChange={e => this.setState({ newNoteID: e.target.value })}
                    />
                    <p/>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={ () => {
                            this.props.history.push(`/note/${ this.props.newNote }`)
                            this.props.close()
                        } }
                        disabled={ this.state.creationState !== "ready" }
                    >
                        Go to Note
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={ this.createNote }
                        disabled={ this.state.creationState !== "fill-form" }
                    >
                        Create
                    </Button>
                    <Button variant="contained" color="secondary" onClick={ this.props.close }>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withRouter(connector(NewNoteCreator));
