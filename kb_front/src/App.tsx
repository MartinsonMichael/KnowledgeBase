import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/ControlPoint';

import ListIcon from '@material-ui/icons/List';

import { loadStructure } from "./store/note/note_actions";
import { connect, ConnectedProps } from "react-redux";

import {Route, Switch, Redirect, withRouter, Link} from "react-router-dom";
import { RouteComponentProps } from "react-router";
import {NoteID} from "./store/messages";
import TagPage from "./pages/TagPage";
import NoteListPage from "./pages/NoteListPage";
import NotePage from "./pages/NotePage";
import NewNotePage from "./pages/NewNotePage";


const mapDispatchToProps = (dispatch: any) => {
  return {
    load: () => dispatch(loadStructure())
  }
};

const connector = connect(undefined, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>


type PathParamsType = {
  pathNoteID: NoteID
}

export type AppProps = PropsFromRedux & RouteComponentProps<PathParamsType> & {}

interface AppState {
  newNoteID: string
  showNoteCreatePost: boolean
}


class App extends React.Component<AppProps, AppState>{

  constructor(props: AppProps) {
    super(props);
    this.state = {
      newNoteID: "",
      showNoteCreatePost: false,
    }
  }

  componentDidMount(): void {
    this.props.load()
  }

  static renderAppBar(): React.ReactNode {

    return (
        <AppBar position="static">
          <Toolbar>
            <div style={{marginRight: "10px"}}>
              <Link to="/fullList">
                <div style={{display: "flex"}}>
                  <ListIcon/>
                  <span>show all notes</span>
                </div>
              </Link>
            </div>
            <div>
              <Link to="/new_note">
                <div style={{display: "flex"}}>
                <AddIcon/>
                <span>add new note</span>
                </div>
              </Link>
            </div>
            <div>
              <SearchIcon/>
              <InputBase
                placeholder="Search…"
                inputProps={{'aria-label': 'search'}}
              />
            </div>

            <Typography variant="h6" noWrap>Knowledge Base App</Typography>
          </Toolbar>
        </AppBar>
    )
  }

  render(): React.ReactNode {
    return (
      <div>
        { App.renderAppBar() }
        <Switch>
          <Route path={'/home'} render={() => <NoteListPage/>} />
          <Route path={'/fullList'} render={() => <NoteListPage/>} />
          <Route path={'/note/:pathNoteID'} render={() => <NotePage/>} />
          <Route path={'/tag/:pathTagName'} render={() => <TagPage/>} />
          <Route path={'/new_note'} render={() => <NewNotePage/>} />

          <Redirect from="/" to="/home" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connector(App));
