import * as React from "react";
// @ts-ignore
import Autocomplete from '@material-ui/lab/Autocomplete';
import { RootState } from "../store";
import { connect, ConnectedProps } from "react-redux";
import { NoteTag } from "../store/messages";
import { tagStoreToList } from "./utils";


const mapStoreStateToProps = (store: RootState) => ({
    tagList: tagStoreToList(store.structure.tagStore),
});
const mapDispatchToProps = (dispatch: any) => {
    return {}
};
const connector = connect(mapStoreStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export type TagSelectProps = PropsFromRedux & {
    onSelect: (tagObj: NoteTag) => void,
    focusOnOpen?: boolean,
}

interface TagSelectState {
    input: string
}

class TagSelect extends React.Component<TagSelectProps, TagSelectState> {
    static defaultProps = {
        focusOnOpen: true,
    };

    constructor(props: TagSelectProps) {
        super(props);

        this.state = {
            input: "",
        }
    }

    render(): React.ReactNode {
        if (this.props.tagList === undefined) {
            return <span> no tag list </span>
        }
        return (
            <Autocomplete
                onChange={(event: any, value: any) => {
                    if (value !== undefined && value !== null) {
                      this.props.onSelect(value)
                    }
                }}
                options={this.props.tagList}
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

export default connector(TagSelect);