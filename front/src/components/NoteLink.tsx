import { NoteHead } from "../store/generated_messages";
import * as React from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import TagBar from "./TagBar";
import {connect, ConnectedProps} from "react-redux";
import {addBrowserHistoryNote, setNeedReload} from "../store/system/system_actions";

const mapDispatchToProps = (dispatch: any) => {
    return {
        setNeedReload: () => dispatch(setNeedReload()),
        addBrowserHistoryNote: (note_id: string) => dispatch(addBrowserHistoryNote(note_id)),
    }
};
const connector = connect(undefined, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export type NoteLinkProps = PropsFromRedux & {
    noteHead: NoteHead,
    onDelete?: (id: string) => void,
}

class NoteLink extends React.Component<NoteLinkProps, {}> {
    constructor(props: NoteLinkProps) {
        super(props);
        this.state = {};
    }

    delButton = (note_id: string, onDelete: (id: string) => void): React.ReactNode => (
        <IconButton
            onClick={() => onDelete(note_id)}
            size="small"
        >
            <DeleteIcon fontSize="small"/>
        </IconButton>
    );

    render(): React.ReactNode {
        const { note_id, name, tags } = this.props.noteHead;
        return (
            <div key={note_id} style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex" }}>
                    { this.props.onDelete === undefined ?
                        <div style={{ marginRight: "10px", marginLeft: "10px" }}/> :
                        this.delButton(note_id, this.props.onDelete)
                    }
                    <Link
                        to={`/note/${ note_id }`}
                        onClick={ () => {
                            console.log("hm?");
                            this.props.addBrowserHistoryNote(note_id);
                            this.props.setNeedReload();
                        } }
                    >
                        { name }
                    </Link>
                </div>
                <TagBar
                    parentstring={ `link-of-${note_id}` }
                    tags={ tags }
                    size={ 10 }
                />
            </div>
        )
    }
}

export default connector(NoteLink);
