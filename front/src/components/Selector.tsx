import * as React from "react";
// @ts-ignore
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Button} from "@material-ui/core";


export type SelectProps<T> = {
    list: T[],
    onSelect: (tagObj: T) => void,
    textGetter: (obj: T) => string,
    onNew?: (value: string) => void,
    focusOnOpen?: boolean,
}

interface SelectState {
    inputText: string
}

class Selector<T> extends React.Component<SelectProps<T>, SelectState> {
    static defaultProps = {
        focusOnOpen: true,
    };

    constructor(props: SelectProps<T>) {
        super(props);

        this.state = {
            inputText: "",
        }
    }

    render(): React.ReactNode {
        if (this.props.list.length === 0) {
            return null
        }
        return (
            <Autocomplete
                onChange={(event: any, value: any) => {
                    if (value !== undefined && value !== null) {
                      this.props.onSelect(value)
                    }
                    console.log("pressed auto on change")
                }}
                noOptionsText={
                    <Button onClick={() => console.log("new tag")}>
                        add new tag `{ this.state.inputText }`
                    </Button>
                }
                options={ this.props.list }
                getOptionLabel={ this.props.textGetter }
                renderInput={(params: any) => (
                    <div ref={params.InputProps.ref}>
                        <input
                            style={{ width: 200 }}
                            type="text"
                            {...params.inputProps}
                            autoFocus={ this.props.focusOnOpen }
                        />
                    </div>
                )}
            />
        )
    }
}

export default Selector;