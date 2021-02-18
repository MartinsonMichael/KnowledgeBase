import { Note, NoteHead } from "../store/generated_messages";
import * as React from "react";
import { Link } from "react-router-dom";
import TagBar from "./TagBar";
import {IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

export function renderNoteLink(
    note: Note | NoteHead,
    showTags: boolean = false,
    onDelete?: (id: string) => void | undefined,
): React.ReactNode {
    const { id, name, tags } = note;

    if (onDelete === undefined) {
        return (
            <div key={id} style={{ marginBottom: "10px" }}>
                <Link to={`/note/${id}`}> {name} </Link>
                { showTags ? (
                    <TagBar tags={tags} size={10} key={id} parentstring={ id }/>
                ) : null }
            </div>
        )
    }

    return (
        <div key={id} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex" }}>
                <div style={{ marginRight: "2px" }}>
                    <IconButton
                        onClick={() => onDelete(id)}
                        size="small"
                    >
                        <DeleteIcon/>
                    </IconButton>
                </div>
                <div>
                    <Link to={`/note/${ id }`}>{ name }</Link>
                    { showTags ? (
                        <TagBar tags={ tags } size={ 10 } key={ id } parentstring={ id }/>
                    ) : null }
                </div>
            </div>
        </div>
    )
}