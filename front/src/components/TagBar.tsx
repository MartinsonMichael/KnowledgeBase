import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { connect, ConnectedProps } from "react-redux";

import { Chip, IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

import { RootState } from "../store";
import { TagHead } from "../store/generated_messages";

import Selector from "./Selector";


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
                    onClose={ () => this.setState({tagAddPress: false}) }
                />
            </div>
        )
    }

    render(): React.ReactNode {
        const { tags } = this.props;
        return (
            <div
                style={{ display: "flex", alignItems: "center", flexDirection: "row"  }}
                key={ this.props.parentstring + 'tagbar' }
            >
                { tags.map((tag: TagHead) => (
                    <div
                        style={{ marginRight: "5px", paddingBottom: "0.5em", paddingTop: "0.5em", display: "flex", flexDirection: "row" }}
                        key={ this.props.parentstring + tag.name + 'div' }
                    >
                        <Chip
                            clickable
                            onClick={() => this.props.history.push(`/tag/${tag.tag_id}`)}
                            label={ "#" + tag.name }
                            // onDelete={  e => {
                            //         if (this.props.showDeleteButtons && this.props.onTagDelete !== undefined) {
                            //             this.props.onTagDelete(tag.tag_id)
                            //         }
                            //     }
                            // }
                            onDelete={ (this.props.showDeleteButtons ? e => {
                                    if (this.props.onTagDelete !== undefined) {
                                        this.props.onTagDelete(tag.tag_id)
                                    }
                                }
                                : undefined)
                            }
                            size="small"
                            variant="outlined"
                            // style={{
                            //     paddingRight: (this.props.showDeleteButtons ? "0em" : "1.1em"),
                            //     paddingLeft: "1.1em",
                            // }}
                        />
                        <div style={{
                            paddingRight: (this.props.showDeleteButtons ? "0em" : "0.95em"),
                        }}/>
                    </div>
                ))}
                { this.renderTagAdd() }
            </div>
        )
    }
}

export default withRouter(connector(TagBar));
