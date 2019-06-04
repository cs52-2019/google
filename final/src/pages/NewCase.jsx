import React from "react";
import ReactDOM from "react-dom";
import Map from "../components/Map.js";
import InlineDatePicker from "../components/inputs/InlineDatePicker.js";
import LocationSearchBar from "../components/inputs/LocationSearchBar.js";
import FilterRadios from "../components/inputs/FilterRadios.js";
import NavBar from "../navbar.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Dropzone from 'react-dropzone';
import {storage} from '../firebase';
import firebase from "../firebase.js";
import { withRouter } from 'react-router-dom';

const FREQUENCIES = ["Every day", "Every week", "Every month"];

class NewCase extends React.Component {
  constructor(props) {
    super(props);
    // Analysis info that doesn't require map refresh
    this.caseInfo = {
      // TODO: mapCenter and mapZoom should come from database
      mapCenter: {
        lat: 48.611639, // Ukraine
        lng: 29.178028 // Ukraine
      },
      mapZoom: 8,
      mapStartDate: new Date(),
      caseDescription: "None",
      mapFrequency: "Every day",
      caseImage: "",
    };

    this.state = {
      mapSearchLocation: this.caseInfo.mapCenter,
      mapFilter: "Satellite",
    };
  }

  handleSearchLocationChange(location) {
    this.setState({
      mapSearchLocation: location
    });
  }

  handleBoundsChange(center, zoom) {
    this.caseInfo.mapZoom = zoom;
    this.caseInfo.mapCenter = {
      lat: center.lat(),
      lng: center.lng()
    };
  }

  handleFilterChange(filter) {
    console.log(`filter = ${filter}`);
    this.setState({
      mapFilter: filter
    });
  }

  handleStartDateChange(date) {
    this.caseInfo.mapStartDate = date;
  }

  handleCaseDescriptionChange(description) {
    this.caseInfo.caseDescription = description;
  }

  handleImageLinkChange(imageLink) {
    this.caseInfo.caseImage = imageLink;
  }

  handleFrequencyChange(freq) {
    this.caseInfo.mapFrequency = freq;
  }

  handleSave(e) {
    e.preventDefault();
    console.log("SAVING");

    const caseTitle = ReactDOM.findDOMNode(this.refs.caseTitle).value;
    // case ID for URL: lower case and replace spaces with underscores
    const caseId = caseTitle.toLowerCase().replace(/ /g, "_");

    firebase
      .database()
      .ref("cases/" + caseId)
      .set({
        title: caseTitle,
        description: ReactDOM.findDOMNode(this.refs.caseDescription).value,
        imageLink: ReactDOM.findDOMNode(this.refs.caseImage).value,
        mapCenter: this.caseInfo.mapCenter,
        mapZoom: this.caseInfo.mapZoom,
        mapFilter: this.state.mapFilter,
        mapStartDate: this.caseInfo.mapStartDate,
        mapFrequency: this.caseInfo.mapFrequency
      });
    // Redirect to CasesPage
    this.props.history.push('/cases');
  }

  render() {
    return (
      <div id="new-case">
        <NavBar />
        <Container>
          <div className="pb-5 mx-auto pl-3">
            <Row className="text-center">
              <h1>Enter New Case</h1>
            </Row>
          </div>
          <Row>
            <Col sm={4}>
              <Form>
                <Form.Row>
                  <Col>
                    <Form.Label>Case Title:</Form.Label>
                  </Col>
                  <Col sm={8}>
                    <Form.Control ref="caseTitle" placeholder="Case Title" />
                  </Col>
                </Form.Row>
              </Form>
              <Form className="pt-2" onSubmit={this.handleSave.bind(this)}>
                <InlineDatePicker
                  leftCol={4}
                  rightCol={8}
                  initialDate={this.caseInfo.mapStartDate}
                  label="Start Date"
                  onChange={this.handleStartDateChange.bind(this)}
                />

                <Form>
                  <Form.Row>
                    <Col>
                      <Form.Label>Case Image:</Form.Label>
                    </Col>
                    <Col sm={8}>
                      <Form.Control ref="caseImage" placeholder="Image URL" />
                    </Col>
                  </Form.Row>
                </Form>

                <Form.Group
                  className="pt-2"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Case Description</Form.Label>
                  <Form.Control ref="caseDescription" as="textarea" rows="3" />
                </Form.Group>

                <Form.Group>
                  <LocationSearchBar
                    location={this.state.mapSearchLocation}
                    onChange={this.handleSearchLocationChange.bind(this)}
                  />
                </Form.Group>

                <Form.Group>
                  <FilterRadios
                    initialFilter={this.state.mapFilter}
                    onChange={this.handleFilterChange.bind(this)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Save Case
                </Button>
              </Form>
            </Col>
            <Col sm={8}>
              <Map
                location={this.state.mapSearchLocation}
                filter={this.state.mapFilter}
                zoom={this.caseInfo.mapZoom}
                onBoundsChange={this.handleBoundsChange.bind(this)}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(NewCase);
