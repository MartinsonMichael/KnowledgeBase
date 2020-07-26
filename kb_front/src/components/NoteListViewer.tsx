import * as React from "react";
import { loadNote } from "../store/note/note_actions";
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../store";
import { loadHeadList } from "../store/system/system_actions";
import { NoteHead, NoteID } from "../store/messages";


const mapStoreStateToProps = (store: RootState) => ({
    noteHeadList: store.systemState.noteHeadList,
    isLoading: store.systemState.isLoading,
});
const mapDispatchToProps = (dispatch: any) => {
    return {
        loadNote: (note_id: NoteID) => dispatch(loadNote(note_id)),
    }
};
const connector = connect(mapStoreStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export interface NoteListViewerState {}

export type NoteListViewerProps = PropsFromRedux & {}


class NoteHeadViewer extends React.Component<NoteListViewerProps, NoteListViewerState>{
    constructor(props: NoteListViewerProps) {
        super(props);
        this.state = {};
    }

    static renderNoteHead(noteHead: NoteHead): React.ReactNode {
        return (
            <div style={{"display": "flex"}}>
                { noteHead.name }
            </div>
        )
    }

    render(): React.ReactNode {
        return (
            <div>
                { this.props.isLoading ? ("Loading NoteHead from server...") : null }

                { this.props.noteHeadList !== undefined ? (
                    this.props.noteHeadList.list.map((noteHead: NoteHead) => NoteHeadViewer.renderNoteHead(noteHead))
                ) : (
                    "No Notes on server"
                )}


            </div>
        );
    }
}

export default connector(NoteHeadViewer);