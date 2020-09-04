import * as React from "react";
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../store";
import {renderNoteList} from "../components/NoteList";
import {headStoreToList} from "../components/utils";


const mapStoreStateToProps = (store: RootState) => ({
    noteHeadStore: store.note.noteHeadStore,

    isLoading: store.note.isLoading,
    error: store.note.error,
});
const connector = connect(mapStoreStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export interface NoteListPageState {}

export type NoteListPageProps = PropsFromRedux & {}


class NoteHeadViewer extends React.Component<NoteListPageProps, NoteListPageState>{
    constructor(props: NoteListPageProps) {
        super(props);
        this.state = {};
    }

    render(): React.ReactNode {
        return (
            <div>
                { this.props.isLoading ? ("Loading NoteHead from server...") : null }

                { this.props.noteHeadStore !== undefined ? (
                    <div>
                        { renderNoteList(headStoreToList(this.props.noteHeadStore), true) }
                    </div>
                ) : (
                    "No Notes on server"
                )}
            </div>
        );
    }
}

export default connector(NoteHeadViewer);