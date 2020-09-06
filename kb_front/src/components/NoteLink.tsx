import {Note, NoteHead, NoteID} from "../store/messages";
import * as React from "react";
import {Link} from "react-router-dom";
import { TagBar } from "./TagBar";

export function renderNoteLink(
    note: Note | NoteHead,
    showTags: boolean = false,
    onDelete?: (id: NoteID) => void | undefined,
): React.ReactNode {
    const { id, name, tags } = note;

    if (onDelete === undefined) {
        return (
            <div key={id} style={{ marginBottom: "10px" }}>
                <Link to={`/note/${id}`}> {name} </Link>
                { showTags ? (
                    <TagBar tags={tags} size={10} key={id}/>
                ) : null }
            </div>
        )
    }

    return (
        <div key={id} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex" }}>
                <div style={{ marginRight: "2px" }}>
                    <button onClick={() => onDelete(id)}>
                        x
                    </button>
                </div>
                <div>
                    <Link to={`/note/${id}`}> {name} </Link>
                    { showTags ? (
                        <TagBar tags={tags} size={10} key={id}/>
                    ) : null }
                </div>
            </div>
        </div>
    )
}