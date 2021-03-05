import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import { Button, Toolbar, IconButton, AppBar } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/ControlPoint';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListIcon from '@material-ui/icons/List';

import { RootState } from "./store";
import { NoteHead, TagHead } from "./store/generated_messages";

import { headStoreToList } from "./components/utils";
import {needOpenNextNewNote, openedNextNewNote, setNeedReload } from "./store/system/system_actions";
import { getStructure } from "./store/structureService/structureService_actions";
import { createNewNote } from "./store/structureService/createNewNote_action";

import HomePage from "./pages/HomePage";
import NotePage from "./pages/NotePage";
import TagPage from "./pages/TagPage";
import TagListPage from "./pages/TagListPage";
import NoteListPage from "./pages/NoteListPage";
import Selector from "./components/Selector";
import ProfilePage from "./pages/ProfilePage";


const mapStoreStateToProps = (store: RootState) => ({
    tagStore: store.structure.tagStore,
    noteHeadStore: store.structure.noteHeadStore,

    isLoading: store.structure.isLoading,
    error: store.structure.error,

    needOpenNewNote: store.system.needOpenNewNote,
    newNote: store.system.newNote,
});
const mapDispatchToProps = (dispatch: any) => {
    return {
        load: () => dispatch(getStructure()),
        setNeedReload: () => dispatch(setNeedReload()),
        createNewNote: (noteName: string) => dispatch(createNewNote(noteName, undefined)),
        needOpenNextNewNote: () => dispatch(needOpenNextNewNote()),
        openedNextNewNote: () => dispatch(openedNextNewNote()),
    }
};

const connector = connect(mapStoreStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

type PathParamsType = {}

export type AppProps = PropsFromRedux & RouteComponentProps<PathParamsType> & {}

interface AppState {
    showNoteCreatePost: boolean

    isNewNoteCreatorOpen: boolean
    isSearchOpen: boolean
}


class App extends React.Component<AppProps, AppState>{

    constructor(props: AppProps) {
        super(props);
        this.state = {
            showNoteCreatePost: false,

            isNewNoteCreatorOpen: false,
            isSearchOpen: false,
        }
    }

    componentDidMount(): void {
        this.props.load()
    }

    renderAppBar(): React.ReactNode {
        return (
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Button onClick={() => this.props.history.push(`/home`)}>
                        <div style={{ alignItems: "center", flexDirection: "row", display: "flex" }}>
                            <HomeIcon color="action" style={{ fill: "white" }}/>
                            <div className="topbartext">Home</div>
                        </div>
                    </Button>
                    <Button onClick={() => this.props.history.push("/fullList")}>
                        <ListIcon style={{ fill: "white" }}/>
                        <div className="topbartext">Note List</div>
                    </Button>
                    <Button onClick={() => this.setState({ isNewNoteCreatorOpen: true })}>
                        <AddIcon style={{ fill: "white" }}/>
                        <div className="topbartext">Add Note</div>
                    </Button>
                    { this.state.isNewNoteCreatorOpen ?
                        <Selector
                            list={ [""] }
                            textGetter={ (str: string) => str }
                            onSelect={(newNoteName: string) => null}
                            onNewText={(input: string) => `Create new note ${input}`}
                            onNew={(noteName: string) => {
                                this.props.openedNextNewNote();
                                this.setState({isSearchOpen: false, isNewNoteCreatorOpen: false});
                                this.props.createNewNote(noteName);
                                this.props.needOpenNextNewNote();
                            }}
                        /> : null
                    }
                    <div style={{ flexGrow: 1 }}/>
                    {/*<div style={{  display: 'flex', alignItems: 'center', justifyContent: 'center', }}>*/}
                    {/*    <Typography*/}
                    {/*        variant="h6"*/}
                    {/*        noWrap*/}
                    {/*        style={{ flexGrow: 1, alignItems: "center" }}*/}
                    {/*    >*/}
                    {/*        Knowledge Base App*/}
                    {/*    </Typography>*/}
                    {/*</div>*/}

                    <IconButton onClick={() => this.setState({isSearchOpen: !this.state.isSearchOpen})}>
                        <SearchIcon style={{ fill: "white" }}/>
                    </IconButton>
                    <div style={{ color: "white" }}>
                        <Selector
                            list={ headStoreToList(this.props.noteHeadStore) }
                            textGetter={ (noteHead: NoteHead) => noteHead.name }
                            filterFunction={ (noteHead: NoteHead, str: string) => {
                                return (
                                    noteHead.name.toLowerCase().includes(str)
                                    || noteHead.tags.filter((tag: TagHead) => tag.name.toLowerCase().includes(str)).length !== 0
                                )
                            }}
                            onSelect={(noteHead: NoteHead) => {
                                this.props.history.push(`/note/${noteHead.note_id}`);
                                this.props.setNeedReload();
                                this.setState({isSearchOpen: false, isNewNoteCreatorOpen: false});
                            }}
                            onNewText={(input: string) => `Create new note ${input}`}
                            onNew={(noteName: string) => {
                                this.props.openedNextNewNote();
                                this.setState({isSearchOpen: false, isNewNoteCreatorOpen: false});
                                this.props.createNewNote(noteName);
                                this.props.needOpenNextNewNote();
                            }}
                            placeholder="Search notes..."
                            variant={ undefined }
                            focusOnOpen={ false }
                        />
                    </div>


                    <Button onClick={() => this.props.history.push("/tag_list")}>
                        <ListIcon style={{ fill: "white" }}/>
                        <div className="topbartext">Tag List</div>
                    </Button>
                    <IconButton onClick={() => this.props.history.push("/profile")}>
                        <AccountCircleIcon style={{ fill: "white" }}/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        )
    }

    render(): React.ReactNode {

        console.log(this.props);

        if (this.props.needOpenNewNote && this.props.newNote !== undefined) {
            this.props.history.push(`/note/${this.props.newNote.note_id}`);
            setTimeout(() => this.props.setNeedReload(), 500);
            this.props.openedNextNewNote();
        }

        return (
            <div>
                { this.renderAppBar() }
                {/*<NewNoteCreator*/}
                {/*    isOpen={ this.state.isNewNoteCreatorOpen }*/}
                {/*    close={() => this.setState({ isNewNoteCreatorOpen: false })}*/}
                {/*/>*/}
                <Switch>
                    <Route path='/profile' render={() => <ProfilePage/>}/>
                    <Route path='/home' render={() => <HomePage/>}/>
                    <Route path='/fullList' render={() => <NoteListPage/>} />
                    <Route path='/note/:note_id' render={() => <NotePage/>} />
                    <Route path='/tag/:tag_id' render={() => <TagPage/>} />
                    <Route path='/tag_list' render={() => <TagListPage/>} />

                    <Redirect from="/" to="/home" />
                </Switch>
            </div>
        );
    }
}

export default withRouter(connector(App));
