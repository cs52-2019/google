import React from "react";
import { Switch, Route } from "react-router-dom";
import { Grid, Typography, Paper } from "@material-ui/core";

import HomePage from "./pages/HomePage.js";
import CasesPage from "./pages/CasesPage.js";
import CasePage from "./pages/CasePage.js";
import AnalysisPage from "./pages/AnalysisPage.js";
import NewPage from "./pages/NewCase.jsx";
import TopBar from "./topBar.js";
import NavBar from "./navbar.jsx";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main>
        <div>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <NavBar />
            </Grid>
            <Grid item sm={12}>
              <Switch>
                {/* Example: localhost:3000/ */}
                <Route exact path="/" component={HomePage} />

                {/* Example: localhost:3000/cases, localhost:3000/pastcases */}
                <Route exact path="/cases/" component={CasesPage} />
                <Route exact path="/pastcases/" component={CasesPage} />
                <Route exact path="/newcase/" component={NewPage} />

                {/* Example: localhost:3000/cases/ukraine/1234 */}
                <Route
                  path="/cases/:caseId/:analysisId"
                  component={AnalysisPage}
                />

                {/* Example: localhost:3000/cases/ukraine */}
                <Route path="/cases/:caseId" component={CasePage} />
              </Switch>
            </Grid>
          </Grid>
        </div>
      </main>
    );
  }
}

export default Main;
