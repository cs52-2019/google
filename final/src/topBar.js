import React from 'react';
import {
  AppBar, Toolbar, Typography
} from '@material-ui/core';
import './topBar.css';

/**
 * Define TopBar, a React componment of CS142 project #5
 */
class topBar extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar>
          <Typography variant="h5" color="inherit">
            Top Bar Place Holder
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default topBar;
