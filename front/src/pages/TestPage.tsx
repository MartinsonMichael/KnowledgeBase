import * as React from "react";
import Editor from "rich-markdown-editor";
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../store";
import { construct_Note, Note, NoteHead, NoteID, NoteTag } from "../store/messages";
import { loadNote, updateNote } from "../store/note/note_actions";
import { RouteComponentProps, withRouter } from "react-router";
import TagBar from "../components/TagBar";
import { renderError } from "../components/ErrorPlate";
import {Button, CircularProgress, IconButton, InputBase, TextField, Typography} from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import QueueIcon from '@material-ui/icons/Queue';
import TagCreator from "../components/NewTagCreator"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import LinkSearch from "../components/LinkDialogSearch";
import { ChangeLinkDialogState, OpenNewTagCreatorSystemAction } from "../store/system/system_actions";
import { createMDLinkToNote, createMDLinkToTag, insertStringIntoString } from "../components/utils";
import NoteLinkList from "../components/NoteLinkList";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import NewNoteCreator from "../components/NewNoteCreator";
import {renderUnsavedChangedMarker} from "../components/UnsaveTracker";
import axios from "../store/client";



const mapStoreStateToProps = (store: RootState) => ({

    isLoading: store.test.isLoading,
    error: store.test.error,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadNote: (note_id: NoteID) => dispatch(loadNote(note_id)),
    }
};
const connector = connect(mapStoreStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export interface TestPageState {}

type PathParamsType = {}

export type TestPageProps = PropsFromRedux & RouteComponentProps<PathParamsType> & {}


class TestPage extends React.Component<TestPageProps, TestPageState> {

    constructor(props: TestPageProps) {
        super(props);
        this.state = {
        };
    }

    render(): React.ReactNode {

        return (
            <div>

            </div>
        );
    }
}

export default withRouter(connector(TestPage));