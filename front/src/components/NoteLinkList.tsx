import { RootState } from "../store";
import { connect, ConnectedProps } from "react-redux";
import { Note, NoteHead, NoteHeadStore } from "../store/generated_messages";
import * as React from "react";
import Selector from "./Selector";
import { renderNoteLink } from "./NoteLink";
import { Button } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

const mapStoreStateToProps = (store: RootState) => ({
});
const connector = connect(mapStoreStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export type NoteLinkListProps = PropsFromRedux & {
    noteList: NoteHead[],
    showDelButtons: boolean
    onDelete?: (id: string) => void | undefined,
    showAddButton: boolean,
    onAdd?: (id: string) => void | undefined
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
                <Selector
                    list={ this.props.noteList }
                    textGetter={ (noteHead: NoteHead | Note) => noteHead.name }
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
                {/*{ this.props.noteIDList.length === 0 ? <span style={{color: "grey"}}>No links</span> : null }*/}

                {/*{ this.props.noteIDList.map((noteID: string) =>*/}
                {/*    // @ts-ignore*/}
                {/*    <div key={ noteID }>*/}
                {/*        { renderNoteLink(*/}
                {/*            // @ts-ignore*/}
                {/*            this.props.noteHeadStore.heads[noteID],*/}
                {/*            (this.props.showDelButtons ? this.props.onDelete : undefined),*/}
                {/*        )}*/}
                {/*    </div>*/}
                {/*)}*/}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    { this.renderAddButton() }
                </div>
            </div>
        )
    }
}

export default connector(NoteLinkList);
