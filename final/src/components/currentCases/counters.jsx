import React, { Component } from "react";
import Counter from "./counter";
import firebase from "../../firebase.js";

class Counters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counters: []
    };
  }

  componentWillMount() {
    const cases = firebase.database().ref("cases");
    const counters = [];
    cases.once("value", snapshot => {
      var allCases = snapshot.val();
      var num = 0;

      Object.keys(allCases).forEach(key => {
        var currCase = allCases[key];

        counters[num] = {
          id: num,
          caseId: key,
          caseTitle: currCase.title,
          imgsource: currCase.imageLink
        }

        num++;
      });

      this.setState({ counters: counters });
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
