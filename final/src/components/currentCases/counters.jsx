import React, { Component } from "react";
import Counter from "./counter";
import firebase from "../../firebase.js";

class Counters extends Component {
  state = {
    counters: [
      {
        id: 1,
        caseTitle: null,
        imgsource: null
      },
      {
        id: 2,
        caseTitle: null,
        imgsource: null
      },
      {
        id: 3,
        caseTitle: null,
        imgsource: null
      },
      {
        id: 4,
        caseTitle: null,
        imgsource: null
      }
    ]
  };

  componentWillMount() {
    const cases = firebase.database().ref("cases");
    const counters = [...this.state.counters];
    cases.once("value", snapshot => {
      var allCases = snapshot.val();
      var num = 0;
      Object.keys(allCases).forEach(key => {
        counters[num].caseTitle = allCases[key].title;
        counters[num].imgsource = allCases[key].imageLink;
        console.log(key.title);
        num++;
      });
      this.setState({ counters });
    });
  }

  render() {
    return (
      <div
        class="card-deck"
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
