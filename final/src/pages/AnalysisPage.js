import React from "react";

import DateSlider from "../components/analysis/DateSlider.js";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import NavBar from "../navbar";
import firebase from "../firebase.js";

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
  }

  componentWillMount() {
    const db = firebase
      .database()
      .ref(
        `cases/${this.props.match.params.caseId}/analyses/${
          this.props.match.params.analysisId
        }`
      );
    db.on("value", snapshot => {
      var analysis = snapshot.val();
      if (analysis == null) return;
      this.setState({
        ready: true,
        title: analysis.name,
        startDate: analysis.startDate,
        endDate: analysis.endDate,
        frequency: analysis.frequency,
      });

      // Get image URL from storage
      this.getImageURL("2/1/19");
    });
  }

  getImageURL(date) {
    const test = {
      '2/1/19': '2014.tif',
      '3/1/19': '2015.tif',
      '4/1/19': '2016.tif',
      '5/1/19': '2017.tif'
    }
    const storage = firebase.storage().ref();
    var imgRef = storage.child(test[date]);
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
      return (
        <div>
          <NavBar />
          <Container>
            <Row>
              <h2>{this.state.title}</h2>
            </Row>

            <Row>
              <h3>Parameters</h3>
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
              {/*
                this.state.imageReady ?
                <img src={this.state.imageURL}/> :
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              */}
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
