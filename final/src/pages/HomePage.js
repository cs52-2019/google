import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@material-ui/core";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ marginTop: "100px" }}>
        <div class="container text-center">
          <img
            class="mt-5 mb-5"
            src="https://www.lawctopus.com/wp-content/uploads/2017/12/Accountability-Counsel-Logo-1024x261.jpg"
            width="240"
            height="70"
            alt=""
          />
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
      </div>
    );
  }
}

export default HomePage;
