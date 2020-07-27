import {Note, NoteHead} from "../store/messages";
import * as React from "react";
import {Link} from "react-router-dom";

export function renderNoteLink(note: Note | NoteHead): React.ReactNode {
    const {id, name} = note;

    return (
        <div>
            <Link to={`note/${id}`}> {name} </Link>
        </div>
    )
}