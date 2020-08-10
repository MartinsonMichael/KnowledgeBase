import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/ControlPoint';

import ListIcon from '@material-ui/icons/List';
import TextField from '@material-ui/core/TextField';


import NoteHeadViewer from './components/NoteListViewer'
import { loadHeadList } from "./store/system/system_actions";
import { RootState } from "./store";
import { connect, ConnectedProps } from "react-redux";

import {Route, Switch, Redirect, withRouter, Router, Link} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { RouteComponentProps } from "react-router";
import NoteViewer from "./components/NoteViewer";
import {NoteID} from "./store/messages";
import {stringify} from "querystring";


const mapStoreStateToProps = (store: RootState) => ({
    // noteHeadList: store.systemState.noteHeadList,
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    onUpdateHeadList: () => dispatch(loadHeadList())
  }
};

const connector = connect(mapStoreStateToProps, mapDispatchToProps);
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
    this.props.onUpdateHeadList()
  }

  generateRandomNoteId(): string {
    const curDate = new Date();
    return curDate.toISOString();
  }

  renderNewNotePart(): React.ReactNode {
    return (
      <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={() => {
          if (this.state.showNoteCreatePost) {

          } else {
            this.setState({showNoteCreatePost: true})
          }
        }}
      >
        <AddIcon/>
        <span>{ this.state.showNoteCreatePost ? "confirm noteID" : "add new note" }</span>
      </IconButton>

        { this.state.showNoteCreatePost ?
            (
            <TextField
              defaultValue={ this.generateRandomNoteId() }
              onChange={event => this.setState({newNoteID: event.target.value})}
            />
            ) : null
        }

        </div>
    )
  }

  renderAppBar(): React.ReactNode {

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
            { this.renderNewNotePart() }
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
        {this.renderAppBar()}
        <Switch>
          <Route path={'/home'} render={() => <NoteHeadViewer/>} />
          <Route path={'/fullList'} render={() => <NoteHeadViewer/>} />
          <Route path={'/note/:pathNoteID'} render={() => <NoteViewer/>} />

          <Redirect from="/" to="/home" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connector(App));
