import * as React from "react";
import { Button, Chip, IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Selector from "./Selector";
import { RouteComponentProps, withRouter } from "react-router";
import { TagHead } from "../store/generated_messages";


export type TagBarProps = RouteComponentProps<{}> & {
    parentstring: string,
    tags: TagHead[]
    size?: number
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
                <Selector
                    list={ this.props.tags }
                    textGetter={ (tag: TagHead) => tag.name }
                    onSelect={(tag: TagHead) => {
                        if (this.props.onTagAdd !== undefined) {
                            this.props.onTagAdd(tag.name)
                        }
                    }}
                    onNew={ (newTagName: string) => null }
                />
                <button onClick={() => this.setState({tagAddPress: false})}>
                    x
                </button>
            </div>
        )
    }

    render(): React.ReactNode {
        const { tags, size } = this.props;
        return (
            <div
                style={{ display: "flex", fontSize: size, alignItems: "center"  }}
                key={ this.props.parentstring + 'tagbar' }
            >
                { tags.map((tag: TagHead) => (
                    <div style={{ marginRight: "5px" }} key={ this.props.parentstring + tag.name + 'div' }>
                        <Button
                            onClick={() => this.props.history.push(`/tag/${tag.tag_id}`)}
                            size="small"
                        >
                            <Chip
                                label={ "#" + tag.name }
                                onDelete={ (this.props.showDeleteButtons ? e => {
                                        if (this.props.onTagDelete !== undefined) {
                                            this.props.onTagDelete(tag.name)
                                        }
                                    }
                                    : undefined)
                                }
                                size="small"
                                variant="outlined"
                            />
                        </Button>
                    </div>
                ))}
                { this.renderTagAdd() }
            </div>
        )
    }
}

export default withRouter(TagBar);
