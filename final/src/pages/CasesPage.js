import React from "react";
import Counters from "../components/currentCases/counters";
import NavBar from "../navbar";

class CasesPage extends React.Component {
  constructor(props) {
    super(props);
  }

  /*
  | For Sofia:
  | Go to http://localhost:3000/cases and open the Chrome inspector to get
  | the Javascript console. It should print out all the cases from the database.
  | You can use this list to loop over your counter component (just like you do
  | in counters.jsx) to get dynamically loaded content.
  |
  | You and Sasa need to agree on what the database fields will be called so that
  | when she saves a case, you are able to reference the proper fields to render the info.
  |
  | For reference, CasePage does something very similar, except it loads all
  | analyses for a given case.
  */

  render() {
    return (
      <div>
        <NavBar />
        <main className="container">
          <Counters />
        </main>
      </div>
    );
  }
}

export default CasesPage;
