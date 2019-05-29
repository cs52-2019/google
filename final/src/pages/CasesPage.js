import React from "react";
import firebase from "../firebase.js";
import Counters from "../components/currentCases/counters";

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
  componentWillMount() {
    // Get reference to "cases/" path in database
    const cases = firebase.database().ref("cases");
    // Get actual data from that reference
    cases.on("value", snapshot => {
      var allCases = snapshot.val();
      console.log(
        "These are all the cases from the Firebase database. It should look like a large object; you can open it up and look inside too."
      );
      console.log(allCases);
      console.log(
        "This is us looping through the list of all the keys (case titles)"
      );
      Object.keys(allCases).forEach(key => {
        console.log(key);
      });
    });
  }

  render() {
    return (
      <main className="container">
        <Counters />
      </main>
    );
  }
}

export default CasesPage;
