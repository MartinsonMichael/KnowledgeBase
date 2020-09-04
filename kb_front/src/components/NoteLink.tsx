import {Note, NoteHead} from "../store/messages";
import * as React from "react";
import {Link} from "react-router-dom";
import { TagBar } from "./TagBar";

export function renderNoteLink(note: Note | NoteHead, showTags: boolean = false): React.ReactNode {
    const {id, name, tags} = note;

    return (
        <div key={id}>
            <Link to={`/note/${id}`}> {name} </Link>
            { showTags ? (
                <TagBar tags={tags} size={10} key={id}/>
            ) : null }
        </div>
    )
}