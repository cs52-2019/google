import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <div class="w-25">
        <div class="card">
          <img
            src={this.props.counter.imgsource}
            class="card-img-top"
            alt="..."
            width="240"
            height="170"
          />
          <div class="btn card-body">
            <h5 class="card-title mb-0">{this.props.counter.caseTitle}</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default Counter;
