import * as React from "react";
import { connect, ConnectedProps } from 'react-redux'

import { RootState } from "../store";
import { RouteComponentProps, withRouter } from "react-router";
import { headStoreToList, shuffleArray } from "../components/utils";
import { NoteHead } from "../store/generated_messages";

import NoteLinkList from "../components/NoteLinkList";
import {Link} from "@material-ui/core";


const mapStoreStateToProps = (store: RootState) => ({
    isLoading: store.structure.isLoading,
    error: store.structure.error,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
    }
};
const connector = connect(mapStoreStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export interface ProfilePageState {}

type PathParamsType = {}

export type ProfilePageProps = PropsFromRedux & RouteComponentProps<PathParamsType> & {}


class ProfilePage extends React.Component<ProfilePageProps, ProfilePageState> {

    constructor(props: ProfilePageProps) {
        super(props);
        this.state = {};
    }


    render(): React.ReactNode {

        return (
            <div style={{margin: "20px", display: "flex", flexDirection: "row" }}>
                <div style={{ width: "50%", marginRight: "10px"}}>
                    Welcome Guest!
                </div>
                <div style={{ width: "50%", marginLeft: "10px"}}>
                    *we are working on authorisation...*
                </div>
            </div>
        );
    }
}

export default withRouter(connector(ProfilePage));