import * as React from "react";
// @ts-ignore
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import {RootState} from "../store";
import {NoteID} from "../store/messages";
import {loadNote, updateBody} from "../store/note/note_actions";
import {connect, ConnectedProps} from "react-redux";
import {withRouter} from "react-router";


const mapStoreStateToProps = (store: RootState) => ({
    tagList: store.systemState.tagList,
});
const mapDispatchToProps = (dispatch: any) => {
    return {
    }
};
const connector = connect(mapStoreStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export type TagSelectProps = PropsFromRedux & {
    onSelect: (tagName: string) => void,
}

interface TagSelectState {
    input: string
}

class TagSelect extends React.Component<TagSelectProps, TagSelectState> {
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
              onChange={(event, value) => {
                  if (value !== undefined && value !== null) {
                      this.props.onSelect(value.name)
                  }
              }}
              options={this.props.tagList}
              getOptionLabel={(option: any) => option['name']}
              renderInput={(params: any) => (
                  <div ref={params.InputProps.ref}>
                      <input style={{ width: 200 }} type="text" {...params.inputProps} />
                    </div>
              )}
            />
        )
    }
}

export default connector(TagSelect);