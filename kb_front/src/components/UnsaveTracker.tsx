import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {Chip, CircularProgress} from "@material-ui/core";
import * as React from "react";
import {ChangeLinkDialogState} from "../store/system/system_actions";
import LinkSearch from "./LinkDialogSearch";

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