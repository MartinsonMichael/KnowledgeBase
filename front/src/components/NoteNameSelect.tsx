import * as React from "react";
// @ts-ignore
import Autocomplete from '@material-ui/lab/Autocomplete';
import { RootState } from "../store";
import { connect, ConnectedProps } from "react-redux";
import { headStoreToList } from "./utils";
import { NoteHead } from "../store/generated_messages";


const mapStoreStateToProps = (store: RootState) => ({
    noteList: headStoreToList(store.structure.noteHeadStore),
});
const mapDispatchToProps = (dispatch: any) => {
    return {}
};
const connector = connect(mapStoreStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export type NoteNameSelectProps = PropsFromRedux & {
    onSelect: (noteHead: NoteHead) => void,
    focusOnOpen?: boolean,
}

interface NoteNameSelectState {
    input: string
}

class NoteNameSelect extends React.Component<NoteNameSelectProps, NoteNameSelectState> {
    static defaultProps = {
        focusOnOpen: true,
    };

    constructor(props: NoteNameSelectProps) {
        super(props);
        this.state = {
            input: "",
        }
    }

    render(): React.ReactNode {
        if (this.props.noteList === undefined) {
            return <span> no note list </span>
        }
        return (
            <Autocomplete
                onChange={(event, value) => {
                    if (value !== undefined && value !== null) {
                      this.props.onSelect(value)
                    }
                }}
                options={this.props.noteList}
                getOptionLabel={(option: any) => option['name']}
                renderInput={(params: any) => (
                    <div ref={params.InputProps.ref}>
                        <input
                            style={{ width: 200 }}
                            type="text"
                            {...params.inputProps}
                            autoFocus={this.props.focusOnOpen}
                        />
                    </div>
                )}
            />
        )
    }
}

export default connector(NoteNameSelect);