import * as React from "react";
import { connect, ConnectedProps } from 'react-redux'

import {Button, Card, Link} from "@material-ui/core";

import { RootState } from "../store";
import axios from "axios";
import { RouteComponentProps, withRouter } from "react-router";
import { headStoreToList, shuffleArray } from "../components/utils";
import { NoteHead } from "../store/generated_messages";

import NoteLinkList from "../components/NoteLinkList";
import {getNotesWithoutLinks, getStructure} from "../store/structureService/structureService_actions";



const mapStoreStateToProps = (store: RootState) => ({
    tagStore: store.structure.tagStore,
    noteHeadStore: store.structure.noteHeadStore,

    notesWithoutLinks: store.structure.notesWithoutLinks,

    isLoading: store.structure.isLoading,
    error: store.structure.error,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        load: () => dispatch(getStructure()),
        getNotesWithoutLinks: () => dispatch(getNotesWithoutLinks()),
        // applyBackup: (zip_body: string, merge_policy: string) => dispatch(applyBackup(zip_body, merge_policy)),
    }
};
const connector = connect(mapStoreStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export interface HomePageState {
    showAllNotesWithoutLinks: boolean
    showAllNotesWithoutTags: boolean

    showDebug: boolean
}

type PathParamsType = {}

export type HomePageProps = PropsFromRedux & RouteComponentProps<PathParamsType> & {}


class HomePage extends React.Component<HomePageProps, HomePageState> {

    constructor(props: HomePageProps) {
        super(props);
        this.state = {
            showAllNotesWithoutLinks: false,
            showAllNotesWithoutTags: false,

            showDebug: false
        };
    }

    componentDidMount(): void {
        this.props.load();
        this.props.getNotesWithoutLinks();
    }

    renderRecentNotes(): React.ReactNode {
        const recentList = (
            headStoreToList(this.props.noteHeadStore)
                .sort((a: NoteHead, b: NoteHead) => a.last_update < b.last_update ? 1 : -1)
                .slice(0, 5)
        );
        return HomePage.renderList(recentList, "Recently edited");
    }

    static renderList(list: NoteHead[], title: string): React.ReactNode {
        return (
            <Card variant="outlined" style={{ marginBottom: "1.5em" }}>
                <div style={{ margin: "1em" }}>
                    <div style={{ alignItems: "center", fontWeight: "bold", marginBottom: "1em"}} >
                        { title }
                    </div>
                    <NoteLinkList noteList={ list } />
                </div>
            </Card>
        )
    }

    renderRandomNotes(): React.ReactNode {
        const randomList = shuffleArray(headStoreToList(this.props.noteHeadStore)).slice(0, 8);
        return HomePage.renderList(randomList, "Random selection");
    }

    renderNoTags(): React.ReactNode {
        const noTagList = (
            headStoreToList(this.props.noteHeadStore)
                .filter((noteHead: NoteHead) => noteHead.tags.length === 0)
        ).slice(0, 8);
        if (noTagList.length === 0) {
            return null;
        }
        return (
            <Card variant="outlined" style={{ marginBottom: "1.5em" }}>
                <div style={{ margin: "1em" }}>
                    <div style={{ alignItems: "center", fontWeight: "bold", marginBottom: "1em", display: "flex", flexDirection: "row"}} >
                        { "Notes without tags" }
                        <div style={{ flexGrow: 1 }}/>
                        { noTagList.length > 5 ?
                            <Button
                                onClick={
                                    () => this.setState({showAllNotesWithoutTags: !this.state.showAllNotesWithoutTags})
                                }
                            >
                                    { this.state.showAllNotesWithoutTags ? "Hide" : "Show all" }
                            </Button>
                            :
                            null
                        }
                    </div>
                    <NoteLinkList noteList={noTagList.slice(0, (this.state.showAllNotesWithoutTags ? undefined : 5)) } />
                </div>
            </Card>
        );
    }

    renderNoLinks(): React.ReactNode {
        if (this.props.notesWithoutLinks.length === 0) {
            return null;
        }
        return (
            <Card variant="outlined" style={{ marginBottom: "1.5em" }}>
                <div style={{ margin: "1em" }}>
                    <div style={{ alignItems: "center", fontWeight: "bold", marginBottom: "1em", display: "flex", flexDirection: "row"}} >
                        { "Notes without links" }
                        <div style={{ flexGrow: 1 }}/>
                        { this.props.notesWithoutLinks.length > 5 ?
                            <Button
                                onClick={
                                    () => this.setState({showAllNotesWithoutLinks: !this.state.showAllNotesWithoutLinks})
                                }
                            >
                                    { this.state.showAllNotesWithoutLinks ? "Hide" : "Show all" }
                            </Button>
                            :
                            null
                        }
                    </div>
                    <NoteLinkList noteList={ this.props.notesWithoutLinks.slice(0, (this.state.showAllNotesWithoutLinks ? undefined : 5)) } />
                </div>
            </Card>
        )
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
            <Card variant="outlined" style={{ marginBottom: "1.5em" }}>
                <div style={{ margin: "1em" }}>
                    <div style={{ alignItems: "center", fontWeight: "bold", marginBottom: "1em", display: "flex", flexDirection: "row"}} >
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
                                    // baseURL: "http://localhost:8000/backup/",
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
            <div style={{margin: "1.5em", display: "flex", flexDirection: "row" }}>
                <div style={{ width: "50%", marginRight: "1.5em", marginLeft: "3em"}}>
                    { this.renderRecentNotes() }
                    { this.renderNoTags() }
                    { this.renderNoLinks() }
                </div>
                <div style={{ width: "50%", marginLeft: "1.5em", marginRight: "8em"}}>
                    { this.renderRandomNotes() }
                    { this.renderDEBUG() }
                </div>
            </div>
        );
    }
}

export default withRouter(connector(HomePage));