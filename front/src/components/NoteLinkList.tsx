import { RootState } from "../store";
import { connect, ConnectedProps } from "react-redux";
import { NoteHead } from "../store/generated_messages";
import * as React from "react";
import Selector from "./Selector";
import NoteLink from "./NoteLink";
import { Button } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

const mapStoreStateToProps = (store: RootState) => ({
    noteHeadStore: store.structure.noteHeadStore,
});
const connector = connect(mapStoreStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export type NoteLinkListProps = PropsFromRedux & {
    noteList: NoteHead[],
    showDelButtons?: boolean
    onDelete?: (id: string) => void | undefined,
    showAddButton?: boolean,
    onAdd?: (id: string) => void | undefined
}

type NoteLinkListState = {
    isAddTextLineVisible: boolean
}

class NoteLinkList extends React.Component<NoteLinkListProps, NoteLinkListState> {
    static defaultProps = {
        showAddButton: false,
        showDelButtons: false,
    };

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
            let selectList = [] as NoteHead[];
            if (this.props.noteHeadStore !== undefined) {
                selectList = [
                    ...Object.keys(this.props.noteHeadStore.heads)
                        .filter((note_id: string) =>
                            this.props.noteList.filter(
                                (noteHead: NoteHead) => noteHead.note_id === note_id
                            ).length === 0
                        )
                        .map(
                        // @ts-ignore
                        (note_id: string) => this.props.noteHeadStore.heads[note_id]
                    )
                ]
            }
            return (
                <Selector
                    list={ selectList }
                    textGetter={ (noteHead: NoteHead) => noteHead.name }
                    onSelect={(noteHead: NoteHead) => {
                        this.setState({isAddTextLineVisible: false});
                        if (this.props.onAdd !== undefined) {
                            this.props.onAdd(noteHead.note_id);
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
            </Button>
        )
    }

    render(): React.ReactNode {
        return (
            <div>
                { this.props.noteList.map((noteHead: NoteHead) =>
                    <NoteLink
                        noteHead={ noteHead }
                        onDelete={
                            (this.props.showDelButtons ? this.props.onDelete : undefined)
                        }
                        key={ `link-list-${noteHead.note_id}` }
                    />
                )}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    { this.renderAddButton() }
                </div>
            </div>
        )
    }
}

export default connector(NoteLinkList);
