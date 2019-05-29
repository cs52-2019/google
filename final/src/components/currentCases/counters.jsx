import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  state = {
    counters: [
      {
        id: 1,
        caseTitle: "Vinnytsia Poultry Farm",
        imgsource:
          "https://www.qualikoglobal.com/wp-content/uploads/2018/11/vinnytsia-2.png"
      },
      {
        id: 2,
        caseTitle: "Mexico Corn Crisis",
        imgsource:
          "https://newfoodeconomy.org/wp-content/uploads/2018/07/Floriano-Garcia-Delfin-plants-heirloom-corn-Mexico-July-2018-1024x685.jpg"
      }
    ]
  };

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
