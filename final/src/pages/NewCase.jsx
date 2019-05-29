import React from 'react';

import Map               from '../components/Map.js'
import InlineDatePicker  from '../components/inputs/InlineDatePicker.js'
import LocationSearchBar from '../components/inputs/LocationSearchBar.js'
import FilterRadios      from '../components/inputs/FilterRadios.js'
import InlineDropdown    from '../components/inputs/InlineDropdown.js'

import Container    from 'react-bootstrap/Container';
import Row          from 'react-bootstrap/Row';
import Col          from 'react-bootstrap/Col';
import Form         from 'react-bootstrap/Form';
import Button       from 'react-bootstrap/Button';
import InputGroup   from 'react-bootstrap/InputGroup';
import firebase     from '../firebase.js';
import ReactDOM     from "react-dom";

const FREQUENCIES = [
  'Every day',
  'Every week',
  'Every month'
]

class NewCase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapLocation: {
        lat: 48.611639, // Ukraine
        lng: 29.178028  // Ukraine
      },
      mapFilter: 'Satellite',
      mapStartDate: new Date(),
      caseDescription: 'None',
      mapFrequency: 'Every day',
    }

    // Analysis info that doesn't require map refresh
    this.analysisInfo = {
      // TODO: mapCenter and mapZoom should come from database
      mapCenter: {
        lat: 48.611639, // Ukraine
        lng: 29.178028  // Ukraine
      },
      mapZoom: 8
    }
  }

  handleLocationChange(location) {
    this.setState({
      mapLocation: location
    });
  }

  handleBoundsChange(center, zoom) {
    this.analysisInfo.mapZoom = zoom;
    this.analysisInfo.mapCenter = {
      lat: center.lat(),
      lng: center.lng()
    }
  }

  handleFilterChange(filter) {
    console.log(`filter = ${filter}`);
    this.setState({
      mapFilter: filter
    });
  }

  handleStartDateChange(date) {
    console.log(`start date = ${date}`);
    this.setState({
      mapStartDate: date
    });
  }

  handleCaseDescriptionChange(description) {
    console.log(`case description= ${description}`);
    this.setState({
      caseDescription: description
    });
  }

  handleFrequencyChange(freq) {
    console.log(`freq = ${freq}`);
    this.setState({
      mapFrequency: freq
    })
  }

  handleSave(e) {
    e.preventDefault();
    console.log("SAVING");
    console.log(ReactDOM.findDOMNode(this.refs.caseTitle).value);

    const analysisDB = firebase.database().ref('cases');
    const caseName = ReactDOM.findDOMNode(this.refs.caseTitle).value
    firebase.database().ref('cases/' + caseName).set({
      caseDescription: ReactDOM.findDOMNode(this.refs.caseDescription).value,
      mapCenter: this.analysisInfo.mapCenter,
      mapZoom: this.analysisInfo.mapZoom,
      mapFilter: this.state.mapFilter,
      mapStartDate: this.state.mapStartDate,
      mapFrequency: this.state.mapFrequency,
    });

  }

  render() {
    return(
      <div id="new-case">
        <Container>
          <Row>
            <h1>Enter New Case</h1>
          </Row>
          <Row>
            <Col sm={4}>
            <Form>
            <Form.Row>
              <Col>
                <Form.Label>Case Title:</Form.Label>
              </Col>
              <Col>
                <Form.Control ref="caseTitle" placeholder="Case Title" />
              </Col>
            </Form.Row>
              </Form>
              <Form onSubmit={this.handleSave.bind(this)}>

              <InlineDatePicker
                  leftCol={4}
                  rightCol={8}
                  initialDate={this.state.mapStartDate}
                  label="Start Date"
                  onChange={this.handleStartDateChange.bind(this)}
                />

                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Case Description</Form.Label>
                  <Form.Control ref="caseDescription" as="textarea" rows="3" />
                </Form.Group>



                <Form.Group>
                  <LocationSearchBar
                    location={this.state.mapLocation}
                    onChange={this.handleLocationChange.bind(this)}
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
                location={this.state.mapLocation}
                filter={this.state.mapFilter}
                onBoundsChange={this.handleBoundsChange.bind(this)}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default NewCase;
