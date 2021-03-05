import * as React from "react";
import { connect, ConnectedProps } from 'react-redux'

import { RootState } from "../store";
import { RouteComponentProps, withRouter } from "react-router";
import { headStoreToList, shuffleArray } from "../components/utils";
import { NoteHead } from "../store/generated_messages";

import NoteLinkList from "../components/NoteLinkList";
import {Button, Card, Link} from "@material-ui/core";
import axios from "axios";


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

export interface ProfilePageState {
    showDebug: boolean
}

type PathParamsType = {}

export type ProfilePageProps = PropsFromRedux & RouteComponentProps<PathParamsType> & {}


class ProfilePage extends React.Component<ProfilePageProps, ProfilePageState> {

    constructor(props: ProfilePageProps) {
        super(props);
        this.state = {
            showDebug: false
        };
    }

    renderDEBUG(): React.ReactNode {
        if (this.props.tagStore === undefined || this.props.noteHeadStore === undefined) {
            return (
                <div>
                    no loaded data
                </div>
            )
        }
        return (
            <Card variant="outlined" style={{ marginBottom: "20px" }}>
                <div style={{ margin: "20px" }}>
                    <div style={{ alignItems: "center", fontWeight: "bold", marginBottom: "20px", display: "flex", flexDirection: "row"}} >
                        { "Debug info" }
                        <div style={{ flexGrow: 1 }}/>
                        <Button onClick={() => this.setState({showDebug: !this.state.showDebug})}>
                                { this.state.showDebug ? "Hide" : "Show all" }
                        </Button>
                    </div>
                    <p/>
                    loaded { Object.keys(this.props.tagStore.tags).length } tags
                    <p/>
                    loaded { Object.keys(this.props.noteHeadStore.heads).length } note heads
                    <p/>
                    {/*<Link href="http://localhost:8000/backup/makeBackup" target="_blank">Make backup</Link>*/}
                    <Link href={"/backup/makeBackup"} target="_blank">Make backup</Link>
                    <p/>
                    <input
                        type="file"
                        onChange={event => {
                            if (event !== null && event !== undefined) {
                                // @ts-ignore
                                const file = event.target.files[0];
                                // const formData = new FormData();
                                // formData.append("backup", file);
                                // this.props.applyBackup(formData, "recreate");

                                const axiosInstanse = axios.create({
                                    baseURL: "/backup/",
                                    responseType: "json",
                                });
                                const formData = new FormData();
                                formData.append("backup", file);
                                axiosInstanse.post(
                                    'restoreFromBackup',
                                    formData,
                                    {
                                        'headers': {
                                            'Access-Control-Allow-Origin': '*',
                                            'Access-Control-Allow-Headers': '*',
                                        },
                                    }
                                )
                            }
                        }}
                    />
                </div>
            </Card>
        )
    }


    render(): React.ReactNode {

        return (
            <div style={{margin: "20px", display: "flex", flexDirection: "row" }}>
                <div style={{ width: "50%", marginRight: "10px"}}>
                    Welcome Guest!
                </div>
                <div style={{ width: "50%", marginLeft: "10px"}}>
                    *we are working on authorisation...*
                    { this.renderDEBUG() }
                </div>
            </div>
        );
    }
}

export default withRouter(connector(ProfilePage));