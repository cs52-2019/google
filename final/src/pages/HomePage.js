import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@material-ui/core";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="container text-center">
        <div class="row pb-2">
          <a
            href={"/cases"}
            class="btn btn-info btn-lg w-50 mx-auto"
            role="button"
          >
            All Cases
          </a>
        </div>
        <div class="row pb-2">
          <a
            href={"/newcase/"}
            class="btn btn-info btn-lg w-50 mx-auto"
            role="button"
          >
            New Case
          </a>
        </div>
      </div>
    );
  }
}

export default HomePage;
