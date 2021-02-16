import * as React from "react";
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../store";
import { RouteComponentProps, withRouter } from "react-router";


const mapStoreStateToProps = (store: RootState) => ({
    tagStore: store.structure.tagStore,
    noteHeadStore: store.structure.noteHeadStore,

    isLoading: store.structure.isLoading,
    error: store.structure.error,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
    }
};
const connector = connect(mapStoreStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export interface HomePageState {}

type PathParamsType = {}

export type HomePageProps = PropsFromRedux & RouteComponentProps<PathParamsType> & {}


class HomePage extends React.Component<HomePageProps, HomePageState> {

    constructor(props: HomePageProps) {
        super(props);
        this.state = {
        };
    }

    render(): React.ReactNode {

        return (
            <div>
                loaded { Object.keys(this.props.tagStore.tags).length } tags
                <p/>
                loaded { Object.keys(this.props.noteHeadStore.heads).length } note heads
                <p/>
            </div>
        );
    }
}

export default withRouter(connector(HomePage));