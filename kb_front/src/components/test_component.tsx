import * as React from "react";
import { changeTestValue } from "../store/note/note_actions";
import { connect, ConnectedProps } from 'react-redux'
import {RootState} from "../store";


const mapStoreStateToProps = (store: RootState) => ({
    value: store.note.testValue
});
const connector = connect(mapStoreStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export interface ValueControllerState {
    change: number
}

export type ValueControllerProps = PropsFromRedux & {
}



class ValueController extends React.Component<ValueControllerProps, ValueControllerState>{
    constructor(props: ValueControllerProps) {
        super(props);
        this.state = {
            change: 10,
        };

        this.submitValue = this.submitValue.bind(this)
    }

    submitValue() {
        this.props.dispatch(
            changeTestValue(this.state.change + this.props.value)
        );
    }

    render(): React.ReactNode {
        return (
            <div style={{'display': 'flex'}}>
                <button
                    onClick={() => this.setState({change: this.state.change - 1})}
                >
                    -
                </button>
                {this.props.value} + {this.state.change}
                <button
                    onClick={() => this.setState({change: this.state.change + 1})}
                >
                    +
                </button>


                <button
                    onClick={this.submitValue}
                >
                    Submit
                </button>
            </div>
        );
    }
}

export const CValueController = connector(ValueController);