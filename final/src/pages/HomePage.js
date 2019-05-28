import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {
  Link
} from '@material-ui/core';


class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

	render() {
    return(
      <div>
        <Link component = {RouterLink} to = {"/cases/"}> Current Cases</Link>
        <Link component = {RouterLink} to = {"/pastcases/"}> Past Cases</Link>
        <Link component = {RouterLink} to = {"/newcases/"}> New Cases</Link>    
      </div>
    );
  }
}

export default HomePage;
