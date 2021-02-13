import * as React from "react";
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../store";
import { NoteTag } from "../store/messages";
import { RouteComponentProps, withRouter } from "react-router";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { renderError } from "../components/ErrorPlate";
import { updateTag } from "../store/structure/structure_actions";
import Paper from "@material-ui/core/Paper";
import {tagStoreToList} from "../components/utils";
import {renderTagLink} from "../components/TagLink";


const mapStoreStateToProps = (store: RootState) => ({
    tagList: tagStoreToList(store.structure.tagStore),

    isLoading: store.structure.isLoading,
    error: store.structure.error,
});
const mapDispatchToProps = (dispatch: any) => {
    return {
        updateTag: (tagObj: NoteTag, description: string, color: string) => dispatch(
            updateTag(tagObj, description, color)
        ),
    }
};
const connector = connect(mapStoreStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export interface TagListPageState {
    searchInput: string
}


type PathParamsType = {}

export type TagListPageProps = PropsFromRedux & RouteComponentProps<PathParamsType> & {}


class TagListPage extends React.Component<TagListPageProps, TagListPageState>{
    constructor(props: TagListPageProps) {
        super(props);
        this.state = {
            searchInput: "",
        };

    }

    render(): React.ReactNode {

        if (this.props.isLoading) {
            return <span>Loading...</span>
        }

        if (this.props.error !== undefined) {
            return renderError(this.props.error);
        }

        return (
            <div style={{margin: "20px"}}>
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
                            placeholder="Search tegs..."
                        />
                    </Paper>
                </div>
                { this.props.tagList
                    .filter((tag: NoteTag) => (
                            tag.name.toLowerCase().includes(this.state.searchInput.toLowerCase()) ||
                            tag.description !== null && tag.description.toLowerCase().includes(this.state.searchInput.toLowerCase()
                            )
                        )
                    )
                    .map((tag: NoteTag) => (
                        <div>
                            { renderTagLink(tag) }
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default withRouter(connector(TagListPage));
