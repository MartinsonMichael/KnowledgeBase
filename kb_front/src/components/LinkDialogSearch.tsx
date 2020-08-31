
import * as React from "react";
import Editor from "rich-markdown-editor";
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../store";
import {Note, NoteID} from "../store/messages";
import {addTag, delTag, loadNote, updateBody, updateNote, updateNoteName} from "../store/note/note_actions";
import {RouteComponentProps, withRouter} from "react-router";
import { TagBar } from "../components/TagBar";
import {renderError} from "../components/ErrorPlate";
import {TextField} from "@material-ui/core";
import {headStoreToList} from "./utils";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";


const mapStoreStateToProps = (store: RootState) => ({
    noteList: headStoreToList(store.systemState.noteHeadStore),
    tagList: store.systemState.tagList,

    isLoading: store.note.isLoading,
    error: store.note.error,
});
const mapDispatchToProps = (dispatch: any) => {
    return {}
};
const connector = connect(mapStoreStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

type SearchMode = "link" | "tag"
export interface LinkSearchState {
    mode: SearchMode,
}

export type LinkSearchProps = PropsFromRedux & {
    startMode: SearchMode,
}


class LinkSearch extends React.Component<LinkSearchProps, LinkSearchState>{

    constructor(props: LinkSearchProps) {
        super(props);
        this.state = {
            mode: this.props.startMode,
        };
    }

    render(): React.ReactNode {

        if (this.props.isLoading) {
            return <span>Loading...</span>
        }

        if (this.props.error !== undefined) {
            return renderError(this.props.error)
        }
        return (
            <Dialog open={}>
                <DialogContent>
                  <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send updates
                    occasionally.
                  </DialogContentText>
                  <Grid component="label" container alignItems="center" spacing={1}>
                      <Grid item>Links</Grid>
                      <Grid item>
                        <Switch
                            checked={this.state.mode === "link"}
                            onChange={() => {
                                if (this.state.mode === "link") {
                                    this.setState({mode: "tag"})
                                } else {
                                    this.setState({mode: "link"})
                                }
                            }}
                        />
                      </Grid>
                      <Grid item>Tags</Grid>
                   </Grid>

                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withRouter(connector(LinkSearch));