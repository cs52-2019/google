import React from 'react';
import {Switch, Route}    from 'react-router-dom'
import HomePage           from './pages/HomePage.js'
import CasePage           from './pages/CasePage.js'
import AnalysisPage       from './pages/AnalysisPage.js'

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

	render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/cases/:caseId/:analysisId' component={AnalysisPage}/>
          <Route path='/cases/:caseId' component={CasePage}/>
        </Switch>
      </main>
    );
  }
}

export default Main;
