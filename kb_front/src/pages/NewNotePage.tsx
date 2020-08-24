import * as React from "react";
import Editor from "rich-markdown-editor";
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../store";
import {Note, NoteHead, NoteID, NoteTag} from "../store/messages";
import {createNewNote, loadNote, updateBody} from "../store/note/note_actions";
import {RouteComponentProps, withRouter} from "react-router";
import {TagBar} from "../components/TagBar";
import {renderNoteList} from "../components/NoteList";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import { useHistory } from 'react-router-dom';
import {renderError} from "../components/ErrorPlate";


const mapStoreStateToProps = (store: RootState) => ({
    note: store.note.note,

    isLoading: store.note.isLoading,
    error: store.note.error,
});
const mapDispatchToProps = (dispatch: any) => {
    return {
        createNewNote: (noteID: string, name: string) => dispatch(createNewNote(noteID, name)),
    }
};
const connector = connect(mapStoreStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export interface NewNotePageState {
    newNoteID: string
    newNoteName: string
    waiting: boolean
}

type PathParamsType = {
}

export type NewNotePageProps = PropsFromRedux & RouteComponentProps<PathParamsType> & {
}


class NewNotePage extends React.Component<NewNotePageProps, NewNotePageState>{
    constructor(props: NewNotePageProps) {
        super(props);
        this.state = {
            newNoteID: NewNotePage.generateRandomNoteId(),
            newNoteName: "",
            waiting: false,
        }
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
        this.setState({waiting: true})
    }

    render(): React.ReactNode {

        if (this.state.waiting) {
            if (this.props.isLoading) {
                return <span>Wait for creating...</span>
            } else if (this.props.error !== undefined) {
                return renderError(this.props.error)
            } else if (this.props.note !== undefined) {
                this.props.history.push(`/note/${this.props.note.id}`)
            } else {
                return renderError("No error, but no note object loaded, strange... Try to reload page")
            }
        }

        return (
            <div style={{margin: "20px"}}>

                Enter name for note (you can modify it in future, can't be empty)
                <p/>
                Then pres 'Create' or Cntr+S or Enter to create note.
                <p/>
                <TextField
                    placeholder="Enter note name"
                    value={this.state.newNoteName}
                    onChange={e => this.setState({newNoteName: e.target.value})}
                    onKeyDown={e => {
                        // cntr + S
                        if (e.ctrlKey && (e.keyCode === 83)) {
                            this.createNote()
                        }
                    }}
                />
                <p/>
                You can type human-readable note ID, or just use generated one.
                <p/>
                <TextField
                    value={this.state.newNoteID}
                    onChange={e => this.setState({newNoteID: e.target.value})}
                    onKeyDown={e => {
                        // cntr + S
                        if (e.ctrlKey && (e.keyCode === 83)) {
                            this.createNote()
                        }
                    }}
                />
                <p/>
                <Button variant="contained" color="primary" onClick={() => this.createNote()}>
                    Create
                </Button>
            </div>
        );
    }
}

export default withRouter(connector(NewNotePage));
