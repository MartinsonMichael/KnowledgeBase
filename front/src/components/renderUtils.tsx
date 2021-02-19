import {Tag, TagHead} from "../store/generated_messages";
import * as React from "react";
import { Link } from "react-router-dom";


export function renderError(errorMsg: string): React.ReactNode {
    return (
        <div>
            <div style={{backgroundColor: "red"}}>
                Handled Error occurred!
            </div>
            Message from server : { errorMsg }
        </div>
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