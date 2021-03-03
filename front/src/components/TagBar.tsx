import * as React from "react";
import { Button, Chip, IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Selector from "./Selector";
import { RouteComponentProps, withRouter } from "react-router";
import {NoteHead, TagHead} from "../store/generated_messages";
import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {RootState} from "../store";
import {connect, ConnectedProps} from "react-redux";

const mapStoreStateToProps = (store: RootState) => ({
    tagStore: store.structure.tagStore,
});
const connector = connect(mapStoreStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export type TagBarProps = PropsFromRedux & RouteComponentProps<{}> & {
    parentstring: string,
    tags: TagHead[]
    size?: number
    showAddButtons?: boolean
    onTagAdd?: (tag_id: string) => void,
    showDeleteButtons?: boolean
    onTagDelete?: (tag_id: string) => void,
    onNewTag?: (tagName: string) => void,
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
        let selectList = [] as TagHead[];
        if (this.props.tagStore !== undefined) {
            selectList = [
                ...Object.keys(this.props.tagStore.tags)
                    .filter((tag_id: string) =>
                        this.props.tags.filter(
                            (tagHead: TagHead) => tagHead.tag_id === tag_id
                        ).length === 0
                    )
                    .map(
                    // @ts-ignore
                    (tag_id: string) => this.props.tagStore.tags[tag_id]
                )
            ]
        }


        return (
            <div style={{ display: "flex", marginRight: "5px" }}>
                <Selector
                    list={ selectList }
                    textGetter={ (tag: TagHead) => tag.name }
                    onSelect={(tag: TagHead) => {
                        if (this.props.onTagAdd !== undefined) {
                            this.props.onTagAdd(tag.tag_id)
                        }
                    }}
                    onNew={ (newTagName: string) => {
                        if (this.props.onNewTag !== undefined) {
                            this.props.onNewTag(newTagName);
                        }
                    }}
                    onNewText={ (input: string) => `Create new tag '${input}'`}
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
                        <Chip
                            clickable
                            onClick={() => this.props.history.push(`/tag/${tag.tag_id}`)}
                            label={ "#" + tag.name }
                            onDelete={ (this.props.showDeleteButtons ? e => {
                                    if (this.props.onTagDelete !== undefined) {
                                        this.props.onTagDelete(tag.tag_id)
                                    }
                                }
                                : undefined)
                            }
                            size="small"
                            variant="outlined"
                        />
                    </div>
                ))}
                { this.renderTagAdd() }
            </div>
        )
    }
}

export default withRouter(connector(TagBar));
