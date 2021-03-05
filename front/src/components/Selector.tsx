import * as React from "react";

import Autocomplete from "react-autocomplete";
import {Button, TextField, Typography} from "@material-ui/core";

import { makeID } from "./utils";


export type SelectProps<T> = {
    list: T[],
    onSelect: (tagObj: T) => void,
    textGetter: (obj: T) => string,
    filterFunction?: (obj: T, str: string) => boolean,
    placeholder?: string,
    variant?: "filled" | "outlined" | "standard" | undefined
    onNew?: (value: string) => void,
    onNewText?: (input: string) => string,
    focusOnOpen?: boolean,
    selectedColor?: string,
    notselectedColor?: string,
    textColor?: string,
    onClose?: () => void,
}

interface ListItem<T> {
    item: T
    type: "item" | "new"
}

interface SelectState<T> {
    inputText: string
    filteredList: ListItem<T>[]

    selectorID: string
}


class Selector<T> extends React.Component<SelectProps<T>, SelectState<T>> {
    static defaultProps = {
        focusOnOpen: true,
        onNewText: (v: string) => v,
        selectedColor: "lightgray",
        notselectedColor: "white",
        textColor: "black",
        variant: "outlined",
    };

    constructor(props: SelectProps<T>) {
        super(props);
        this.state = {
            inputText: "",
            filteredList: this.filterList(""),

            selectorID: makeID(4),
        };

        this.valueGetter = this.valueGetter.bind(this);
        this.renderItem = this.renderItem.bind(this);

        this.escFunction = this.escFunction.bind(this);
    }

    escFunction(event: any){
        if(event.keyCode === 27) {
            if (this.props.onClose !== undefined) {
                this.props.onClose()
            }
        }
    }
    componentDidMount(){
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunction, false);
    }

    filterList(str: string): ListItem<T>[] {
        const nl = this.props.list
            .filter(
                (item: T) => {
                    if (this.props.filterFunction !== undefined) {
                        return this.props.filterFunction(item, str)
                    }
                    return this.props.textGetter(item).includes(str)
                }
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
                <div
                    key={`selector-${this.state.selectorID}-${this.props.textGetter(item.item)}`}
                    style={{
                        background: isHighlighted ? this.props.selectedColor : this.props.notselectedColor,
                        margin: "3px",
                        color: this.props.textColor,
                    }}
                >
                    <Typography>{ this.props.textGetter(item.item) }</Typography>
                </div>
            )
        }
        return (
            <Button onClick={() => null} key={`selector-${this.state.selectorID}-new-item`}>
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
                    renderInput={
                        props =>
                        <TextField
                            autoFocus={ this.props.focusOnOpen }
                            size="small"
                            inputProps={ props }
                            placeholder={ this.props.placeholder }
                            variant={ this.props.variant }
                            onBlur={e => {
                                if (this.props.onClose !== undefined) {
                                    this.props.onClose();
                                }
                            }}
                            // onChange={event => this.setState({inputText: event.target.value})}
                        />
                    }
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
                        if (item.type === "new") {
                            if (this.props.onNew !== undefined) {
                                this.props.onNew(this.state.inputText);
                            }
                        }
                        this.setState({inputText: ""});
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