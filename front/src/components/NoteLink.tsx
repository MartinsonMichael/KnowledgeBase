import { Note, NoteHead } from "../store/generated_messages";
import * as React from "react";
import { Link } from "react-router-dom";
import TagBar from "./TagBar";
import {IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

export function renderNoteLink(
    note: Note | NoteHead,
    onDelete?: (id: string) => void | undefined,
): React.ReactNode {
    const { note_id, name, tags } = note;

    if (onDelete === undefined) {
        return (
            <div key={note_id} style={{ marginBottom: "10px" }}>
                <Link to={`/note/${note_id}`}> {name} </Link>
            </div>
        )
    }

    return (
        <div key={note_id} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex" }}>
                <div style={{ marginRight: "2px" }}>
                    <IconButton
                        onClick={() => onDelete(note_id)}
                        size="small"
                    >
                        <DeleteIcon/>
                    </IconButton>
                </div>
                <div>
                    <Link to={`/note/${ note_id }`}>{ name }</Link>
                </div>
            </div>
        </div>
    )
}