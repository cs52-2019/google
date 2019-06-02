import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <div class="w-25">
        <div class="card">
          <img
            src={this.props.counter.imgsource || "https://www.accountabilitycounsel.org/wp-content/themes/acco/img/logo.svg"}
            class="card-img-top"
            alt="..."
            height="170"
            style={{"object-fit": "cover"}}
          />
          <div class="card-body">
            <h5 class="card-title mb-0">{this.props.counter.caseTitle}</h5>
            <a href={this.props.url} className="stretched-link"></a>
          </div>
        </div>
      </div>
    );
  }
}

export default Counter;
