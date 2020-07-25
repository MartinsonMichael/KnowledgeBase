import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/ControlPoint';

import ListIcon from '@material-ui/icons/List';
// import NotificationsIcon from '@material-ui/icons/Notifications';

import { CValueController } from './components/test_component'

export class App extends React.Component<{}, {}>{


  renderAppBar(): React.ReactNode {
    return (
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => null}
              >
              <ListIcon/>
              <Typography variant="body2" noWrap>show all notes</Typography>
            </IconButton>

            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => null}
            >
              <AddIcon/>
              <Typography variant="body2" noWrap>add new note</Typography>
            </IconButton>


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
        <CValueController/>
      </div>
    );
  }
}

