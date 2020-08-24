import * as React from "react";
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../store";
import { loadHeadList } from "../store/system/system_actions";
import { NoteHead, NoteID } from "../store/messages";
import {renderNoteLink} from "../components/NoteLink";
import {renderNoteList} from "../components/NoteList";
import {headStoreToList} from "../components/utils";


const mapStoreStateToProps = (store: RootState) => ({
    noteHeadStore: store.systemState.noteHeadStore,
    isLoading: store.systemState.isLoading,
});
const mapDispatchToProps = (dispatch: any) => {
    return {
        loadHeadList: () => dispatch(loadHeadList()),
    }
};
const connector = connect(mapStoreStateToProps, mapDispatchToProps);
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