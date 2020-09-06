import { NoteHead } from "../store/messages";
import { renderNoteLink } from "./NoteLink";
import * as React from "react";

export function renderNoteList(noteHeadList: NoteHead[], showTags: boolean = false): React.ReactNode {
    return (
        <div>
            { noteHeadList.map((noteHead: NoteHead) => renderNoteLink(noteHead, showTags)) }
        </div>
    )
}
