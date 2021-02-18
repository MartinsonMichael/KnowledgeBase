import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/ControlPoint';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import ListIcon from '@material-ui/icons/List';

import { getStructure } from "./store/structureService/structureService_actions";
import { connect, ConnectedProps } from "react-redux";

import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
// import TagPage from "./pages/TagPage";
// import NoteListPage from "./pages/NoteListPage";
// import NotePage from "./pages/NotePage";
import { Button } from "@material-ui/core";
import { RootState } from "./store";
import IconButton from "@material-ui/core/IconButton";
// import TagListPage from "./pages/TagListPage";
// import NewNoteCreator from "./components/NewNoteCreator";
import HomePage from "./pages/HomePage";


const mapStoreStateToProps = (store: RootState) => ({
    tagStore: store.structure.tagStore,
    noteHeadStore: store.structure.noteHeadStore,

    isLoading: store.structure.isLoading,
    error: store.structure.error,
});
const mapDispatchToProps = (dispatch: any) => {
    return {
        load: () => dispatch(getStructure()),
    }
};

const connector = connect(mapStoreStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

type PathParamsType = {}

export type AppProps = PropsFromRedux & RouteComponentProps<PathParamsType> & {}

interface AppState {
    newstring: string
    showNoteCreatePost: boolean

    isNewNoteCreatorOpen: boolean
}


class App extends React.Component<AppProps, AppState>{

    constructor(props: AppProps) {
        super(props);
        this.state = {
            newstring: "",
            showNoteCreatePost: false,
            isNewNoteCreatorOpen: false,
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
                        <HomeIcon color="action"/>
                        Home
                    </Button>
                    <Button onClick={() => this.props.history.push("/fullList")}>
                        <ListIcon/>
                        Note List
                    </Button>
                    <Button onClick={() => this.setState({ isNewNoteCreatorOpen: true })}>
                        <AddIcon/>
                        Add Note
                    </Button>
                    <SearchIcon/>
                    <InputBase
                        placeholder="Search…"
                        inputProps={{'aria-label': 'search'}}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        style={{ flexGrow: 1 }}
                    >
                        Knowledge Base App
                    </Typography>
                    <Button onClick={() => this.props.history.push("/tag_list")}>
                        <ListIcon/>
                        Tag List
                    </Button>
                    <IconButton onClick={() => this.props.history.push("/profile")}>
                        <AccountCircleIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        )
    }

    render(): React.ReactNode {
        return (
            <div>
                { this.renderAppBar() }
                {/*<NewNoteCreator*/}
                {/*    isOpen={ this.state.isNewNoteCreatorOpen }*/}
                {/*    close={() => this.setState({ isNewNoteCreatorOpen: false })}*/}
                {/*/>*/}
                <Switch>
                    <Route path='/home' render={() => <HomePage/>}/>
                    {/*<Route path='/fullList' render={() => <NoteListPage/>} />*/}
                    {/*<Route path='/note/:pathstring' render={() => <NotePage/>} />*/}
                    {/*<Route path='/tag/:pathTagName' render={() => <TagPage/>} />*/}
                    {/*<Route path='/tag_list' render={() => <TagListPage/>} />*/}

                    <Redirect from="/" to="/home" />
                </Switch>
            </div>
        );
    }
}

export default withRouter(connector(App));
