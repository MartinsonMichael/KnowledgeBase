import * as React from "react";
import Autocomplete from "react-autocomplete";
import {Button, Popover} from "@material-ui/core";
// import {Button} from "@material-ui/core";


export type SelectProps<T> = {
    list: T[],
    onSelect: (tagObj: T) => void,
    textGetter: (obj: T) => string,
    onNew?: (value: string) => void,
    onNewText?: (input: string) => string,
    focusOnOpen?: boolean,
}

interface ListItem<T> {
    item: T
    type: "item" | "new"
}

interface SelectState<T> {
    inputText: string
    filteredList: ListItem<T>[]
}


class Selector<T> extends React.Component<SelectProps<T>, SelectState<T>> {
    static defaultProps = {
        focusOnOpen: true,
        onNewText: (v: string) => v,
    };

    constructor(props: SelectProps<T>) {
        super(props);
        this.state = {
            inputText: "",
            filteredList: this.filterList(""),
        };

        this.valueGetter = this.valueGetter.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    filterList(str: string): ListItem<T>[] {
        const nl = this.props.list
            .filter(
                (item: T) => this.props.textGetter(item).includes(str)
            )
            .map((item: T) => {
                return {item: item, type: "item"} as ListItem<T>;
            });
        if (nl.length !== 0 || this.props.onNew === undefined) {
            return nl;
        }
        return [
            {item: {} as T, type: "new"} as ListItem<T>,
        ]
    }

    valueGetter(item: ListItem<T>): string {
        if (item.type === "item") {
            return this.props.textGetter(item.item)
        }
        return "new"
    }

    renderItem(item: ListItem<T>, isHighlighted: boolean): React.ReactNode {
        if (item.type === "item") {
            return (
                <div style={{background: isHighlighted ? 'lightgray' : 'white', margin: "3px"}}>
                    { this.props.textGetter(item.item) }
                </div>
            )
        }
        return (
            <Button onClick={() => console.log("new click")}>
                { this.props.onNewText !== undefined ? this.props.onNewText(this.state.inputText) : "Create new" }
            </Button>
        )
    }

    render(): React.ReactNode {
        if (this.props.list.length === 0) {
            return null
        }
        return (
            <div style={{ zIndex: 30 }}>
                <Autocomplete
                    getItemValue={ this.valueGetter }
                    items={ this.state.filteredList }
                    renderItem={ this.renderItem }
                    value={ this.state.inputText }
                    onChange={ e => this.setState({
                            inputText: e.target.value,
                            filteredList: this.filterList(e.target.value),
                        })
                    }
                    onSelect={ (val: string, item: ListItem<T>) => {
                        if (item.type === "item") {
                            this.props.onSelect(item.item);
                        }
                        if (this.props.onNew !== undefined) {
                            this.props.onNew(this.state.inputText);
                        }
                    }}
                />
            </div>
        )
        // return (
        //     <Autocomplete
        //         onChange={(event: any, value: any) => {
        //             if (value !== undefined && value !== null) {
        //               this.props.onSelect(value)
        //             }
        //             console.log("pressed auto on change")
        //         }}
        //         noOptionsText={
        //             <Button onClick={() => console.log("new tag")}>
        //                 add new tag `{ this.state.inputText }`
        //             </Button>
        //         }
        //         options={ this.props.list }
        //         getOptionLabel={ this.props.textGetter }
        //         renderInput={(params: any) => (
        //             <div ref={params.InputProps.ref}>
        //                 <input
        //                     style={{ width: 200 }}
        //                     type="text"
        //                     {...params.inputProps}
        //                     autoFocus={ this.props.focusOnOpen }
        //                 />
        //             </div>
        //         )}
        //     />
        // )
    }
}

export default Selector;