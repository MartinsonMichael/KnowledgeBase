import * as React from "react";
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../store";
import { loadHeadList } from "../store/system/system_actions";
import { NoteHead, NoteID } from "../store/messages";
import {renderNoteLink} from "./NoteLink";


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

export interface NoteListViewerState {}

export type NoteListViewerProps = PropsFromRedux & {}


class NoteHeadViewer extends React.Component<NoteListViewerProps, NoteListViewerState>{
    constructor(props: NoteListViewerProps) {
        super(props);
        this.state = {};
    }

    render(): React.ReactNode {
        return (
            <div>
                { this.props.isLoading ? ("Loading NoteHead from server...") : null }

                { this.props.noteHeadStore !== undefined ? (
                    Object.keys(this.props.noteHeadStore).map((noteID: NoteID) => {
                        if (this.props.noteHeadStore !== undefined) {
                            return renderNoteLink(this.props.noteHeadStore[noteID])
                        }
                        return null
                    })
                ) : (
                    "No Notes on server"
                )}


            </div>
        );
    }
}

export default connector(NoteHeadViewer);