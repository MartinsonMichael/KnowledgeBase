import * as React from "react";
import {Link} from "react-router-dom";
import TagSelect from "./TagSelect";
import {NoteTag} from "../store/messages";
import {Button, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import QueueIcon from '@material-ui/icons/Queue';
import { RouteComponentProps, withRouter } from "react-router";

export type TagBarProps = RouteComponentProps<{}> & {
    tags: string[]
    size?: number
    showTagsLabel?: boolean
    showAddButtons?: boolean
    onTagAdd?: (tagName: string) => void,
    showDeleteButtons?: boolean
    onTagDelete?: (tagName: string) => void,
}

interface TagBarState {
    tagAddPress: boolean
}



class TagBar extends React.Component<TagBarProps, TagBarState> {
    static defaultProps = {
        size: 10,
        showTagsLabel: false,
        showAddButtons: false,
        showDeleteButtons: false,
    };

    constructor(props: TagBarProps) {
        super(props);
        this.state = {
            tagAddPress: false,
        }
    }

    renderTagAdd(): React.ReactNode {
        if (this.props.onTagAdd === undefined || !this.props.showAddButtons) {
            return null
        }
        if (!this.state.tagAddPress) {
            return (
                <IconButton
                    onClick={() => this.setState({tagAddPress: true})}
                    size="small"
                >
                    <AddIcon/>
                </IconButton>
            )
        }


        return (
            <div style={{ display: "flex", marginRight: "5px" }}>
                <TagSelect
                    onSelect={(tagObj: NoteTag) => {
                        if (this.props.onTagAdd !== undefined) {
                            this.props.onTagAdd(tagObj.name)
                        }
                    }}
                />
                <button onClick={() => this.setState({tagAddPress: false})}>
                    x
                </button>
            </div>
        )
    }

    render(): React.ReactNode {
        const { tags, size, showTagsLabel } = this.props;
        return (
            <div style={{ display: "flex", fontSize: size }}>
                {showTagsLabel ? <span style={{ marginRight: "5px" }}>Tags:</span> : null}
                {
                    tags
                        .filter((tag: string) => tag !== null && tag !== undefined && tag.length != 0)
                        .map((tag: string) => (
                    <div style={{ marginRight: "5px" }} key={ tag }>
                        <Button
                            onClick={() => this.props.history.push(`/tag/${tag}`)}
                            size="small"
                            style={{ marginRight: "0px" }}
                        >
                            #{ tag }
                        </Button>
                        { this.props.showDeleteButtons && this.props.onTagDelete !== undefined ? (
                            <IconButton
                                onClick={() => {
                                    if (this.props.onTagDelete !== undefined) {
                                        this.props.onTagDelete(tag)
                                    }
                                }}
                                size="small"
                            >
                                <CloseIcon fontSize="small"/>
                            </IconButton>
                        ) : null }

                    </div>
                ))}
                { this.renderTagAdd() }
            </div>
        )
    }
}

export default withRouter(TagBar);
