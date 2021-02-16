import { RootState } from "../store";
import { connect, ConnectedProps } from "react-redux";
import { NoteHead, NoteHeadStore, NoteID } from "../store/messages";
import * as React from "react";
import NoteNameSelect from "./NoteNameSelect";
import { renderNoteLink } from "./NoteLink";
import { Button } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

const mapStoreStateToProps = (store: RootState) => ({
    noteHeadStore: store.structure.noteHeadStore.heads,
});
const connector = connect(mapStoreStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export type NoteLinkListProps = PropsFromRedux & {
    noteIDList: NoteID[],
    noteHeadStore: NoteHeadStore | undefined,
    showTags: boolean
    showDelButtons: boolean
    onDelete?: (id: NoteID) => void | undefined,
    showAddButton: boolean,
    onAdd?: (id: NoteID) => void | undefined
}

type NoteLinkListState = {
    isAddTextLineVisible: boolean
}

class NoteLinkList extends React.Component<NoteLinkListProps, NoteLinkListState> {
    constructor(props: NoteLinkListProps) {
        super(props);
        this.state = {
            isAddTextLineVisible: false,
        };
    }

    renderAddButton(): React.ReactNode {
        if (!this.props.showAddButton) {
            return null
        }
        if (this.state.isAddTextLineVisible) {
            return (
                <NoteNameSelect
                    onSelect={(noteHead: NoteHead) => {
                        this.setState({isAddTextLineVisible: false});
                        if (this.props.onAdd !== undefined) {
                            this.props.onAdd(noteHead.id);
                        }
                    }}
                />
            )
        }
        return (
            <Button
                onClick={() => this.setState({isAddTextLineVisible: true})}
                size="small"
            >
                <AddIcon/>
                Add Link
            </Button>
        )
    }

    render(): React.ReactNode {
        if (this.props.noteHeadStore === undefined) {
            return <span style={{color: "red"}}>No head store</span>
        }
        return (
            <div>
                { this.props.noteIDList.length === 0 ? <span style={{color: "grey"}}>No links</span> : null }

                { this.props.noteIDList.map((noteID: NoteID) =>
                    // @ts-ignore
                    <div key={ noteID }>
                        { renderNoteLink(
                            // @ts-ignore
                            this.props.noteHeadStore[noteID],
                            this.props.showTags,
                            (this.props.showDelButtons ? this.props.onDelete : undefined),
                        )}
                    </div>
                )}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    { this.renderAddButton() }
                </div>
            </div>
        )
    }
}

export default connector(NoteLinkList);
