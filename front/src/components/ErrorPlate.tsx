import * as React from "react";

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