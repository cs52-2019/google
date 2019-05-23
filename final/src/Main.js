import React from 'react';
import {Switch, Route}    from 'react-router-dom'

import HomePage           from './pages/HomePage.js'
import CasesPage          from './pages/CasesPage.js'
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
          {/* Example: localhost:3000/ */}
          <Route exact path='/' component={HomePage}/>

          {/* Example: localhost:3000/cases, localhost:3000/pastcases */}
          <Route exact path='/cases/' component={CasesPage}/>
          <Route exact path='/pastcases/' component={CasesPage}/>

          {/* Example: localhost:3000/cases/ukraine/1234 */}
          <Route path='/cases/:caseId/:analysisId' component={AnalysisPage}/>

          {/* Example: localhost:3000/cases/ukraine */}
          <Route path='/cases/:caseId' component={CasePage}/>
        </Switch>
      </main>
    );
  }
}

export default Main;
