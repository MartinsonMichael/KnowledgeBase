import * as React from "react";
import {Link} from "react-router-dom";
import TagSelect from "./TagSelect";
import CloseIcon from '@material-ui/icons/Close';
import {Button} from "@material-ui/core";

export interface TagBarProps {
    tags: string[]
    size?: number
    showTagsLabel?: boolean
    onTagAdd?: (tagName: string) => void,
    onDelete?: (tagName: string) => void,
}

interface TagBarState {
    tagAddPress: boolean
}

export class TagBar extends React.Component<TagBarProps, TagBarState> {
    static defaultProps = {
        size: 10,
        showTagsLabel: false,
    };

    constructor(props: TagBarProps) {
        super(props);
        this.state = {
            tagAddPress: false,
        }
    }

    renderTagAdd(): React.ReactNode {
        if (this.props.onTagAdd === undefined) {
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
                    onSelect={this.props.onTagAdd}
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
                        <Link to={`/tag/${tag}`} color={"yellow"}>#{tag}</Link>
                        { this.props.onDelete !== undefined ? (
                            <button onClick={() => {
                                if (this.props.onDelete !== undefined) {
                                    this.props.onDelete(tag)
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
