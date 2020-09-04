import * as React from "react";
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../store";
import { renderError } from "./ErrorPlate";
import { tagStoreToList } from "./utils";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import { CloseNewTagCreatorSystemAction, OpenNewTagCreatorSystemAction } from "../store/system/system_actions";
import {Note, NoteTag} from "../store/messages";
import { Link } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { createTag } from "../store/note/note_actions";


const mapStoreStateToProps = (store: RootState) => ({
    tagList: tagStoreToList(store.note.tagStore),
    isOpen: store.systemState.isNewTagCreatorOpen,

    isLoading: store.note.isLoading,
    error: store.note.error,
});
const mapDispatchToProps = (dispatch: any) => {
    return {
        close: () => dispatch(CloseNewTagCreatorSystemAction()),
        open: () => dispatch(OpenNewTagCreatorSystemAction()),
        create: (tagObj: NoteTag, addToNote?: Note) => dispatch(createTag(tagObj, addToNote)),
    }
};
const connector = connect(mapStoreStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>


interface TagCreatorState {
    inputName: string
    inputDescription: string
    inputColor: string
}

export type TagCreatorProps = PropsFromRedux & {
    noteToAddNewTag?: Note,
}


class TagCreator extends React.Component<TagCreatorProps, TagCreatorState>{

    constructor(props: TagCreatorProps) {
        super(props);
        this.state = {
            inputName: "",
            inputDescription: "",
            inputColor: "",
        };

        this.onCreatePress = this.onCreatePress.bind(this);
    }

    onCreatePress() {
        if (this.props.tagList === undefined) {
            alert("cant create Tag, no tagList");
            return;
        }
        if (this.state.inputName.length === 0) {
            alert("Name length must be positive");
            return;
        }
        if (this.props.tagList.filter((tagObj: NoteTag) => tagObj.name === this.state.inputName).length !== 0) {
            alert("You can't create two identical tags");
            return;
        }
        this.props.create(
            {
                name: this.state.inputName,
                description: this.state.inputDescription,
                color: this.state.inputColor,
            } as NoteTag,
            this.props.noteToAddNewTag,
        );

        this.props.close()
    }

    renderSimilarTags(): React.ReactNode {
        if (this.props.tagList === undefined) {
            return null
        }

        let similarTagList = this.props.tagList
            .filter((tagObj: NoteTag) => tagObj.name.includes(this.state.inputName));

        if (similarTagList.length === 0) {
            return <span>No similar Tags</span>
        }
        const showDots = similarTagList.length > 6;

        if (showDots) {
            similarTagList = similarTagList.slice(0, 6)
        }

        return (
            <div>
                { similarTagList.map((tagObj: NoteTag) => (
                        <div style={{ marginBottom: "10px" }}>
                            <div>
                            <Link to={`/tag/${tagObj.name}`}>#{tagObj.name}</Link>
                            { tagObj.description !== null && tagObj.description.length > 0 ?
                                <span>{tagObj.description}</span>
                                :
                                null
                            }
                            </div>
                        </div>
                    ))
                }
                { showDots ? "..." : null }
            </div>
        )
    }

    render(): React.ReactNode {

        if (!this.props.isOpen) {
            return null
        }

        if (this.props.isLoading) {
            return <span>Loading...</span>
        }

        if (this.props.error !== undefined) {
            return renderError(this.props.error)
        }
        return (
            <Dialog
                open={this.props.isOpen}
                onEscapeKeyDown={this.props.close}
            >
                <DialogContent>
                    <DialogContentText>
                        Enter name for new Tag, it must be unique. Also you can add description and color.
                        List of similar tags will appear in right section.
                        Press 'Enter' or 'Create' button to create new tag.
                    </DialogContentText>

                    <div style={{ display : "flex" }}>
                        <div style={{ width: "50%" }}>
                            <TextField
                                placeholder="Type name here..."
                                value={ this.state.inputName }
                                onChange={e => this.setState({inputName: e.target.value})}
                                onKeyDown={e => {
                                    // Enter
                                    if (e.keyCode === 13) {
                                        this.onCreatePress()
                                    }
                                }}
                            />
                            <TextField
                                placeholder="* Optional. Type description here..."
                                value={ this.state.inputDescription }
                                onChange={e => this.setState({inputDescription: e.target.value})}
                                onKeyDown={e => {
                                    // Enter
                                    if (e.keyCode === 13) {
                                        this.onCreatePress()
                                    }
                                }}
                            />
                        </div>
                        <div style={{ width: "50%" }}>
                            { this.renderSimilarTags() }
                        </div>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onCreatePress} color="primary">
                        Create
                    </Button>
                    <Button onClick={this.props.close} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default connector(TagCreator);