import * as React from "react";
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../store";
import {renderNoteList} from "../components/NoteList";
import {filterNoteList, headStoreToList} from "../components/utils";
import { Paper } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from "@material-ui/core/InputBase/InputBase";
import {NoteHead} from "../store/messages";


const mapStoreStateToProps = (store: RootState) => ({
    noteHeadList: headStoreToList(store.note.noteHeadStore),

    isLoading: store.note.isLoading,
    error: store.note.error,
});
const connector = connect(mapStoreStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export interface NoteListPageState {
    searchInput: string
}

export type NoteListPageProps = PropsFromRedux & {}


class NoteHeadViewer extends React.Component<NoteListPageProps, NoteListPageState>{
    constructor(props: NoteListPageProps) {
        super(props);
        this.state = {
            searchInput: "",
        };
    }

    render(): React.ReactNode {
        return (
            <div style={{ margin: "20px" }}>
                { this.props.isLoading ? ("Loading NoteHead from server...") : null }

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Paper
                        component="form"
                        style={{padding: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}
                    >
                        <SearchIcon/>
                        <InputBase
                            autoFocus
                            style={{ flex: "1" }}
                            value={ this.state.searchInput }
                            onChange={e => this.setState({searchInput: e.target.value})}
                            placeholder="Search notes by name or tags..."
                        />
                    </Paper>
                </div>

                { this.props.noteHeadList !== undefined ? (
                    <div>
                        {
                            renderNoteList(
                                filterNoteList(this.props.noteHeadList, this.state.searchInput),
                                true,
                            )
                        }
                    </div>
                ) : (
                    "No Notes on server"
                )}
            </div>
        );
    }
}

export default connector(NoteHeadViewer);