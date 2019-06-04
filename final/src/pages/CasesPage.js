import React from "react";
import Counters from "../components/currentCases/counters";
import NavBar from "../navbar";

class CasesPage extends React.Component {
  constructor(props) {
    super(props);
  }

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
