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
        counters[num] = {
          id: num,
          caseTitle: allCases[key].title,
          imgsource: allCases[key].imageLink
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
          <Counter key={counter.id} counter={counter} />
        ))}
      </div>
    );
  }
}

export default Counters;
