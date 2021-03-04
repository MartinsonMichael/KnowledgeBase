import * as React from "react";
import { connect, ConnectedProps } from 'react-redux'

import { RootState } from "../store";
import { RouteComponentProps, withRouter } from "react-router";
import { headStoreToList, shuffleArray } from "../components/utils";
import { NoteHead } from "../store/generated_messages";

import NoteLinkList from "../components/NoteLinkList";
import {getNotesWithoutLinks} from "../store/structureService/structureService_actions";


const mapStoreStateToProps = (store: RootState) => ({
    tagStore: store.structure.tagStore,
    noteHeadStore: store.structure.noteHeadStore,

    notesWithoutLinks: store.structure.notesWithoutLinks,

    isLoading: store.structure.isLoading,
    error: store.structure.error,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        getNotesWithoutLinks: () => dispatch(getNotesWithoutLinks()),
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

    componentDidMount(): void {
        this.props.getNotesWithoutLinks();
    }

    renderRecentNotes(): React.ReactNode {
        const recentList = (
            headStoreToList(this.props.noteHeadStore)
                .sort((a: NoteHead, b: NoteHead) => a.last_update < b.last_update ? 1 : -1)
                .slice(0, 5)
        );
        return (
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.5)', padding: "5px", borderRadius: "5px", marginBottom: "20px" }} >
                <span style={{ alignItems: "center", fontWeight: "bold", marginBottom: "10px" }} >Recently edited</span>
                <NoteLinkList noteList={ recentList } />
            </div>
        )
    }

    renderRandomNotes(): React.ReactNode {
        const randomList = shuffleArray(headStoreToList(this.props.noteHeadStore)).slice(0, 8);
        return (
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.5)', padding: "5px", borderRadius: "5px", marginBottom: "20px" }} >
                <span style={{ alignItems: "center", fontWeight: "bold", marginBottom: "10px" }} >Random selection</span>
                <NoteLinkList noteList={ randomList } />
            </div>
        )
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
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.5)', padding: "5px", borderRadius: "5px", marginBottom: "20px" }} >
                <span style={{ alignItems: "center", fontWeight: "bold", marginBottom: "10px" }} >Notes without Tags</span>
                <NoteLinkList noteList={ noTagList } />
            </div>
        )
    }

    renderNoLinks(): React.ReactNode {
        if (this.props.notesWithoutLinks.length === 0) {
            return null;
        }
        return (
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.5)', padding: "5px", borderRadius: "5px", marginBottom: "20px" }} >
                <span style={{ alignItems: "center", fontWeight: "bold", marginBottom: "10px" }} >Notes without Links</span>
                <NoteLinkList noteList={ this.props.notesWithoutLinks.slice(0, 7) } />
            </div>
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
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.5)', padding: "5px", borderRadius: "5px", marginBottom: "20px" }} >
                Debug info:
                <p/>
                loaded { Object.keys(this.props.tagStore.tags).length } tags
                <p/>
                loaded { Object.keys(this.props.noteHeadStore.heads).length } note heads
                <p/>
            </div>
        )
    }

    render(): React.ReactNode {

        return (
            <div style={{margin: "20px", display: "flex", flexDirection: "row" }}>
                <div style={{ width: "50%", marginRight: "10px"}}>
                    { this.renderRecentNotes() }
                    { this.renderNoTags() }
                    { this.renderNoLinks() }
                </div>
                <div style={{ width: "50%", marginLeft: "10px"}}>
                    { this.renderDEBUG() }
                    { this.renderRandomNotes() }
                </div>
            </div>
        );
    }
}

export default withRouter(connector(HomePage));