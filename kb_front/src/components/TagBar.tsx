import * as React from "react";

export function renderTagBar(tags: string[]): React.ReactNode {
    return (
        <div style={{display: "flex"}}>
            Tags:
            { tags.map((tag: string) => (
                <div style={{marginLeft: "5px"}} key={tag}>
                    <span key={tag}>{ tag }</span>
                </div>
            )) }
        </div>
    )
}