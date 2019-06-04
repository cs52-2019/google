import React from "react";

import DateSlider from "../components/analysis/DateSlider.js";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";
import NavBar from "../navbar";
import firebase from "../firebase.js";

var moment = require('moment');

class AnalysisPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      title: "",
      startDate: "",
      endDate: "",
      frequency: "",
      imageURL: "",
      imageReady: false
    }

    this.caseId = this.props.match.params.caseId;
    this.analysisId = this.props.match.params.analysisId;
  }

  componentWillMount() {
    const db = firebase
      .database()
      .ref(`cases/${this.caseId}/analyses/${this.analysisId}`);
    db.on("value", snapshot => {
      var analysis = snapshot.val();
      if (analysis == null) return;
      this.setState({
        ready: true,
        title: analysis.name,
        startDate: analysis.startDate,
        endDate: analysis.endDate,
        frequency: analysis.frequency,
        filter: analysis.filter,
      });

      // Get image URL from storage
      this.getImageURL(analysis.startDate);
    });
  }

  getImageURL(date) {
    const dateStr = moment(date).format("YYYY-MM-DD");
    const storage = firebase.storage().ref();
    console.log(`${this.caseId}_${this.analysisId}_${dateStr}.tif`);
    var imgRef = storage.child(`${this.caseId}_${this.analysisId}_${dateStr}.tif`);
    imgRef.getDownloadURL().then((url) => {
      console.log("GOT URL");
      this.setState({
        imageReady: true,
        imageURL: url
      });
    }).catch((error) => {
      console.log("Firebase storage error: " + error);
    })
  }

  handleSlider(date) {
    this.setState({
      imageReady: false
    });

    this.getImageURL(date);
  }

  render() {
    if (this.state.ready) {
      const startDate = moment(this.state.startDate, moment.ISO_8601).format('M/D/YY');
      const endDate = moment(this.state.endDate, moment.ISO_8601).format('M/D/YY');

      return (
        <div>
          <NavBar />
          <Container>
            <Row>
              <h2>{this.state.title}</h2>
            </Row>

            <Row>
              <h3>Parameters</h3>
              <p style={{'width': '100%'}}>
                Time range: {startDate} - {endDate} <br/>
                Frequency: {this.state.frequency} <br/>
                Selected filter: {this.state.filter}
              </p>
            </Row>

            <Row>
              <h3>Results</h3>
              <DateSlider
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                frequency={this.state.frequency}
                handleSlider={this.handleSlider.bind(this)}
              />
              <div id="analysis-img">
              <img src={this.state.imageURL}/>
              </div>
            </Row>
          </Container>
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
  }
}

export default AnalysisPage;
