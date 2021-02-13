import * as React from "react";
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../store";
import { NoteHead, NoteTag } from "../store/messages";
import { RouteComponentProps, withRouter } from "react-router";
import { renderNoteList } from "../components/NoteList";
import {Button, CircularProgress, TextField} from "@material-ui/core";
import { renderError } from "../components/ErrorPlate";
import { updateTag } from "../store/structure/structure_actions";
import { headStoreToList } from "../components/utils";
import EditIcon from "@material-ui/core/SvgIcon/SvgIcon";
import SaveIcon from '@material-ui/icons/Save';
import {renderUnsavedChangedMarker} from "../components/UnsaveTracker";


const mapStoreStateToProps = (store: RootState) => ({
    noteHeadStore: headStoreToList(store.structure.noteHeadStore),
    tagStore: store.structure.tagStore,

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

export interface TagPageState {
    currentTag?: NoteTag
    updateCount: number

    isEditMode: boolean
}


type PathParamsType = {
  pathTagName: string
}

export type TagPageProps = PropsFromRedux & RouteComponentProps<PathParamsType> & {}


class TagPage extends React.Component<TagPageProps, TagPageState>{
    constructor(props: TagPageProps) {
        super(props);
        this.state = {
            updateCount: 0,
            currentTag: undefined,
            isEditMode: false,
        };

        console.log(this.props.match.params.pathTagName);

        this.lightUpdateTagDescription = this.lightUpdateTagDescription.bind(this);
    }

    updateCurrentTag() {
        if (this.props.tagStore === undefined) {
            return
        }
        if (this.state.currentTag !== undefined && this.state.currentTag.name === this.props.match.params.pathTagName) {
            return
        }
        this.setState({
            currentTag: this.props.tagStore[this.props.match.params.pathTagName],
        })
    }

    componentDidMount(): void {
        if (this.props.tagStore === undefined) {
            this.setState({currentTag: undefined})
            return
        }
        this.setState({
            currentTag: this.props.tagStore[this.props.match.params.pathTagName],
        })
    }

    lightUpdateTagDescription(newDescription: string) {
        if (this.state.currentTag === undefined) {
            return;
        }
        if (this.state.updateCount > 20) {
            this.setState({
                updateCount: 0,
                currentTag: {
                    ...this.state.currentTag,
                    description: newDescription,
                },
            });
            this.props.updateTag(
                this.state.currentTag, this.state.currentTag.description, this.state.currentTag.color,
            );
            return
        }
        this.setState({
            updateCount: this.state.updateCount + 1,
            currentTag: {
                ...this.state.currentTag,
                description: newDescription,
            }
        })
    }

    render(): React.ReactNode {

        if (this.props.error !== undefined) {
            return renderError(this.props.error);
        }

        this.updateCurrentTag();

        if (this.state.currentTag === undefined || this.props.tagStore === undefined) {
            return <span>No such tag, khm, try to reload page.</span>
        }

        const { name, description } = this.state.currentTag;

        let noteList = [] as NoteHead[];
        if (this.props.noteHeadStore !== undefined) {
            noteList = Object.entries(this.props.noteHeadStore)
                .filter((value) => name !== undefined && value[1].tags.includes(name))
                .map(value => value[1])
        }

        if (this.state.currentTag === undefined) {
            return <span>Loading... (undefined)</span>
        }

        return (
            <div style={{margin: "20px"}}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Button onClick={() => this.setState({ isEditMode: !this.state.isEditMode })}>
                        { this.state.isEditMode ? <SaveIcon/> : <EditIcon/> }
                        { this.state.isEditMode ? "Save" : "Edit" }
                    </Button>
                    { renderUnsavedChangedMarker(this.state.updateCount) }
                    { this.props.isLoading ? <CircularProgress/> : null }
                </div>
                <div style={{ display: "flex" }}>
                    <span style={{ marginRight: "10px" }}>Tag</span>
                    <span style={{ fontWeight: "bold" }}>{ name }</span>
                </div>
                <div style={{display: "flex"}}>
                    Description:
                    {this.state.isEditMode ?
                        <TextField
                            id="standard"
                            placeholder="Add description"
                            value={ description }
                            onChange={e => this.lightUpdateTagDescription(e.target.value)}
                            onKeyDown={e => {
                                // cntr + S
                                if (e.ctrlKey && (e.keyCode === 83)) {
                                    e.preventDefault();
                                    if (this.state.currentTag !== undefined) {
                                        this.props.updateTag(
                                            this.state.currentTag,
                                            this.state.currentTag.description,
                                            this.state.currentTag.color,
                                        );
                                    }
                                }
                            }}
                        />
                        :
                        <span>{ description }</span>
                    }
                </div>
                Notes containing this tag:
                { renderNoteList(noteList, true) }
            </div>
        );
    }
}

export default withRouter(connector(TagPage));
