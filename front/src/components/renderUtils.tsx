import {Tag, TagHead} from "../store/generated_messages";
import * as React from "react";
import { Link } from "react-router-dom";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";


export function renderError(msg: string): React.ReactNode {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={ true }
            message={ msg }
        >
            <Alert severity="error">{ msg }</Alert>
        </Snackbar>
    )
}


export function renderTagLink(tag: TagHead): React.ReactNode {
    const { tag_id, name } = tag;

    return (
        <div style={{ display: "grid", marginBottom: "5px", width: "200px" }}>
            <Link key={ name } to={`/tag/${ tag_id }`}>#{ name }</Link>
        </div>
    )
}

export function renderSuccessMsg(msg: string): React.ReactNode {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={ true }
            message={ msg }
        >
            <Alert severity="success">{ msg }</Alert>
        </Snackbar>
    )
}