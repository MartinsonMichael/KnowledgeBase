import { Tag } from "../store/generated_messages";
import * as React from "react";
import { InputBase } from "@material-ui/core";
import { Link } from "react-router-dom";

export function renderTagLink(tag: Tag): React.ReactNode {
    const { name, description } = tag;

    return (
        <div style={{ display: "grid", marginBottom: "5px", width: "200px" }}>
            <Link key={ name }to={`/tag/${ name }`}>#{ name }</Link>
            { description !== undefined && description !== null ?
                <InputBase
                    key={`descr-${name}-${description}`}
                    multiline
                    value={description}
                /> : null
            }
        </div>
    )
}