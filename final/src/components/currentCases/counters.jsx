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
        counter.push(newCase);
      });
      this.setState({ counters: counter });
    });
  }

  render() {
    return (
      <div
        className="card-deck"
        style={{
          position: "absolute",
          left: "90px",
          top: "180px",
          right: "90px"
        }}
      >
        {this.state.counters.map(counter => (
          <Counter
            key={counter.id}
            counter={counter}
            url={`/cases/${counter.id}`}
          />
        ))}
      </div>
    );
  }
}

export default Counters;
