import * as React from "react";
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../store";
import { RouteComponentProps, withRouter } from "react-router";



const mapStoreStateToProps = (store: RootState) => ({

    isLoading: store.test.isLoading,
    error: store.test.error,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        // loadNote: (note_id: string) => dispatch(loadNote(note_id)),
    }
};
const connector = connect(mapStoreStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export interface TestPageState {}

type PathParamsType = {}

export type TestPageProps = PropsFromRedux & RouteComponentProps<PathParamsType> & {}


class TestPage extends React.Component<TestPageProps, TestPageState> {

    constructor(props: TestPageProps) {
        super(props);
        this.state = {
        };
    }

    render(): React.ReactNode {

        return (
            <div>

            </div>
        );
    }
}

export default withRouter(connector(TestPage));