import * as React from "react";
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../store";
import { renderError } from "./ErrorPlate";
import { headStoreToList, tagStoreToList } from "./utils";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import { ChangeLinkDialogState } from "../store/system/system_actions";
import TagSelect from "./TagSelect";
import NoteNameSelect from "./NoteNameSelect";
import { NoteHead, NoteTag } from "../store/messages";


const mapStoreStateToProps = (store: RootState) => ({
    noteList: headStoreToList(store.note.noteHeadStore),
    tagList: tagStoreToList(store.note.tagStore),

    dialogState: store.systemState.linkSearchState,
    isLoading: store.note.isLoading,
    error: store.note.error,
});
const mapDispatchToProps = (dispatch: any) => {
    return {
        closeDialog: () => dispatch(ChangeLinkDialogState("close")),
        changeToTags: () => dispatch(ChangeLinkDialogState("tag")),
        changeToLinks: () => dispatch(ChangeLinkDialogState("link")),
    }
};
const connector = connect(mapStoreStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export type LinkSearchMode = "link" | "tag" | "close"
export interface LinkSearchState {}

export interface LinkDialogSearchResult {
    type: LinkSearchMode,
    payload: NoteTag | NoteHead
}
export type LinkSearchProps = PropsFromRedux & {
    onSelect: (result: LinkDialogSearchResult) => void,
}


class LinkSearch extends React.Component<LinkSearchProps, LinkSearchState>{

    constructor(props: LinkSearchProps) {
        super(props);
        this.state = {};
    }

    render(): React.ReactNode {

        if (this.props.isLoading) {
            return <span>Loading...</span>
        }

        if (this.props.error !== undefined) {
            return renderError(this.props.error)
        }
        return (
            <Dialog
                open={this.props.dialogState !== "close"}
                onEscapeKeyDown={this.props.closeDialog}
                onBackdropClick={this.props.closeDialog}
            >
                <DialogContent>
                <DialogContentText>
                    Search
                    { this.props.dialogState === "link" ? "note names" : "tags" }
                    by typing, then select or press enter.
                </DialogContentText>
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>Links</Grid>
                    <Grid item>
                    <Switch
                        color="default"
                        checked={this.props.dialogState !== "link"}
                        onChange={() => {
                            if (this.props.dialogState === "link") {
                                this.props.changeToTags()
                            } else {
                                this.props.changeToLinks()
                            }
                        }}
                    />
                    </Grid>
                    <Grid item>Tags</Grid>
                </Grid>
                { this.props.dialogState === "tag" ?
                    <TagSelect
                        onSelect={(noteTag: NoteTag) => {
                            this.props.onSelect({type: "tag", payload: noteTag});
                            this.props.closeDialog();
                        }}
                    />
                    : null
                }
                { this.props.dialogState === "link" ?
                    <NoteNameSelect
                        onSelect={(noteHead: NoteHead) => {
                            this.props.onSelect({type: "link", payload: noteHead});
                            this.props.closeDialog();
                        }}
                    />
                    : null
                }

                </DialogContent>
                <DialogActions>
                  <Button onClick={() => this.props.closeDialog()} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default connector(LinkSearch);