import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Chip } from "@material-ui/core";
import * as React from "react";

export function renderUnsavedChangedMarker(numberOfUnSaved: number): React.ReactNode {
    if (numberOfUnSaved === 0) {
        return (
            <Chip
                icon={<CheckCircleOutlineIcon/>}
                label="all saved"
            />
        )
    } else {
        return (
            <Chip
                icon={<WarningIcon/>}
                label={`${ numberOfUnSaved } unsaved`}

            />
        )
    }
}