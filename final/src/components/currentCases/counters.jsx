import React, { Component } from "react";
import Counter from "./counter";
import firebase from "../../firebase.js";

class Counters extends Component {
  state = {
    counters: []
  };


  componentWillMount() {
    const cases = firebase.database().ref("cases");
    const counters = [];
    cases.once("value", snapshot => {
      var allCases = snapshot.val();
      console.log(allCases);

      let counter = [];
      Object.keys(allCases).forEach(key => {
        let newCase = {};
        newCase["caseTitle"] = allCases[key].title;
        newCase["imgsource"] = allCases[key].imageLink;
        newCase["id"] = key;
        console.log(key);
        counter.push(newCase);
      });
      this.setState({ counters: counter });

      });

  }

  render() {
    return (
      <div
        className="card-deck"
        style={{ position: "absolute", left: "70px", top: "180px" }}
      >
        {this.state.counters.map(counter => (
          <Counter
            key={counter.id}
            counter={counter}
            url={`/cases/${counter.caseId}`}
          />
        ))}
      </div>
    );
  }
}

export default Counters;
