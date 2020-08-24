import * as React from "react";
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../store";
import {NoteHead, NoteID, NoteTag} from "../store/messages";
import { RouteComponentProps, withRouter } from "react-router";
import { renderNoteList } from "../components/NoteList";
import {TextField} from "@material-ui/core";
import {renderError} from "../components/ErrorPlate";
import {updateTagDescription} from "../store/note/note_actions";


const mapStoreStateToProps = (store: RootState) => ({
    noteHeadStore: store.systemState.noteHeadStore,
    tagList: store.systemState.tagList,

    isLoading: store.note.isLoading,
    error: store.note.error,
});
const mapDispatchToProps = (dispatch: any) => {
    return {
        updateTagDescription: (tagName: string, newDescr: string) => dispatch(updateTagDescription(tagName, newDescr)),
    }
};
const connector = connect(mapStoreStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export interface TagPageState {
    updatedDescription?: string
    updateCount: number
}


type PathParamsType = {
  pathTagName: string
}

export type TagPageProps = PropsFromRedux & RouteComponentProps<PathParamsType> & {
    tagName?: string,
}


class TagPage extends React.Component<TagPageProps, TagPageState>{
    constructor(props: TagPageProps) {
        super(props);
        this.state = {
            updateCount: 0,
        };

        this.lightUpdateTagDescription = this.lightUpdateTagDescription.bind(this);
    }

    lightUpdateTagDescription(tagName: string | undefined, newDescription: string) {
        if (tagName === undefined) {
            return;
        }
        if (this.state.updateCount > 20) {
            this.setState({
                updateCount: 0,
                updatedDescription: newDescription,
            });
            this.props.updateTagDescription(tagName, newDescription);
            return
        }
        this.setState({
            updateCount: this.state.updateCount + 1,
            updatedDescription: newDescription,
        })
    }

    render(): React.ReactNode {

        if (this.props.isLoading) {
            return <span>Loading...</span>
        }

        if (this.props.error !== undefined) {
            return renderError(this.props.error);
        }

        let needTagName: string | undefined = undefined;
        if (this.props.tagName !== undefined) {
            needTagName = this.props.tagName
        } else if (this.props.match.params.pathTagName !== undefined) {
            needTagName = this.props.match.params.pathTagName
        }

        if (needTagName === undefined) {
            return <span>Something went wrong, to tag name...</span>
        }

        let tag = undefined;
        if (this.props.tagList !== undefined) {
            tag = this.props.tagList.filter((tag: NoteTag) => tag.name === needTagName)[0]
        }

        if (tag === undefined) {
            return <span>No such tag, khm, try to reload page.</span>
        }

        if (this.state.updatedDescription === undefined) {
            this.setState({updatedDescription: tag.description})
        }

        let noteList = [] as NoteHead[];
        if (this.props.noteHeadStore !== undefined) {
            noteList = Object.entries(this.props.noteHeadStore)
                .filter((value) => needTagName !== undefined && value[1].tags.includes(needTagName))
                .map(value => value[1])
        }

        const { color, name, description } = tag;
        return (
            <div style={{margin: "20px"}}>
                <div style={{display: "flex"}}>
                    Tag { name }
                </div>
                <div style={{display: "flex"}}>
                    Description:
                    <TextField
                        id="standard"
                        placeholder="Add description"
                        value={ this.state.updatedDescription }
                        onChange={e => this.lightUpdateTagDescription(needTagName, e.target.value)}
                        onKeyDown={e => {
                            // cntr + S
                            if (e.ctrlKey && (e.keyCode === 83)) {
                                e.preventDefault();
                                if (needTagName !== undefined && this.state.updatedDescription !== undefined) {
                                    this.props.updateTagDescription(needTagName, this.state.updatedDescription);
                                }
                            }
                        }}
                    />
                </div>
                Notes containing { name } tag:
                { renderNoteList(noteList, true) }
            </div>
        );
    }
}

export default withRouter(connector(TagPage));
