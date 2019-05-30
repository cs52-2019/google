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
          <button type="button" class="btn btn-info btn-lg w-50 mx-auto">
            <Link
              component={RouterLink}
              to={"/cases/"}
              style={{ color: "white" }}
            >
              {" "}
              All Cases
            </Link>
          </button>
        </div>
        <div class="row pb-2">
          <button type="button" class="btn btn-info btn-lg w-50 mx-auto">
            <Link
              component={RouterLink}
              to={"/newcase/"}
              style={{ color: "white" }}
            >
              {" "}
              New Cases
            </Link>
          </button>
        </div>
      </div>
    );
  }
}

export default HomePage;
