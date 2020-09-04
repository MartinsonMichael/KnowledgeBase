import * as React from "react";
import {Link} from "react-router-dom";
import TagSelect from "./TagSelect";
import {NoteTag} from "../store/messages";

export interface TagBarProps {
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

export class TagBar extends React.Component<TagBarProps, TagBarState> {
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
                <button onClick={() => this.setState({tagAddPress: true})}>
                    +
                </button>
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
        const {tags, size, showTagsLabel} = this.props;
        return (
            <div style={{display: "flex", fontSize: size}}>
                {showTagsLabel ? <span style={{ marginRight: "5px" }}>Tags:</span> : null}
                {tags.map((tag: string) => (
                    <div style={{marginRight: "5px"}} key={tag}>
                        <Link to={`/tag/${tag}`}>#{tag}</Link>
                        { this.props.showDeleteButtons && this.props.onTagDelete !== undefined ? (
                            <button onClick={() => {
                                if (this.props.onTagDelete !== undefined) {
                                    this.props.onTagDelete(tag)
                                }
                            }}>
                                x
                            </button>
                        ) : null }
                    </div>
                ))}
                { this.renderTagAdd() }
            </div>
        )
    }
}
