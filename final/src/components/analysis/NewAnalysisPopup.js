import React from 'react';
import ReactDOM  from "react-dom";

import Map               from '../Map.js'
import InlineDatePicker  from '../inputs/InlineDatePicker.js'
import LocationSearchBar from '../inputs/LocationSearchBar.js'
import FilterRadios      from '../inputs/FilterRadios.js'
import InlineDropdown    from '../inputs/InlineDropdown.js'

import Container         from 'react-bootstrap/Container';
import Row               from 'react-bootstrap/Row';
import Col               from 'react-bootstrap/Col';
import Form              from 'react-bootstrap/Form';
import Button            from 'react-bootstrap/Button';

import firebase          from '../../firebase.js';
import { FREQUENCIES }   from '../../utils/date.js';
var moment = require('moment');



class NewAnalysisPopup extends React.Component {
  constructor(props) {
    super(props);

    // Analysis info that doesn't require map refresh
    this.analysisInfo = {
      // TODO: mapCenter and mapZoom should come from database
      mapCenter: {
        lat: 48.611639, // Ukraine
        lng: 29.178028  // Ukraine
      },
      mapZoom: 8,
      startDate: new Date(),
      endDate: new Date(),
      frequency: 'Every day',
    }

    // Analysis info that _does_ require map refresh
    this.state = {
      filter: 'Satellite',
      mapSearchLocation: this.analysisInfo.mapCenter,
    }
  }

  handleSearchLocationChange(location) {
    this.setState({
      mapSearchLocation: location
    });
  }

  handleFilterChange(filter) {
    this.setState({
      filter: filter
    });
  }

  handleStartDateChange(date) {
    this.analysisInfo.startDate = date;
  }

  handleEndDateChange(date) {
    this.analysisInfo.endDate = date;
  }

  handleFrequencyChange(freq) {
    this.analysisInfo.frequency = freq;
  }

  handleBoundsChange(center, zoom) {
    this.analysisInfo.mapZoom = zoom;
    this.analysisInfo.mapCenter = {
      lat: center.lat(),
      lng: center.lng()
    }
  }

  handleSave(e) {
    console.log(`SAVING cases/${this.props.caseId}/analyses`);
    e.preventDefault();

    const analyses = firebase.database().ref(`cases/${this.props.caseId}/analyses`);
    const analysis = {
      name: ReactDOM.findDOMNode(this.refs.analysisName).value,
      mapCenter: this.analysisInfo.mapCenter,
      mapZoom: this.analysisInfo.mapZoom,
      filter: this.state.filter,
      startDate: moment(this.analysisInfo.startDate).toISOString(),
      endDate: moment(this.analysisInfo.endDate).toISOString(),
      frequency: this.analysisInfo.frequency,
    };
    console.log(analysis);
    analyses.push(analysis);

    this.props.onSave();
  }

  render() {
    return(
      <div id="new-analysis-content">
        <Container>
          <Row>
            <h1>Create new analysis</h1>
          </Row>

          <Row>
            <Col sm={4}>
              <Form onSubmit={this.handleSave.bind(this)}>

                <Form.Group>
                  <Form.Control ref="analysisName" placeholder="Name"/>
                </Form.Group>

                <Form.Group>
                  <LocationSearchBar
                    location={this.state.mapSearchLocation}
                    onChange={this.handleSearchLocationChange.bind(this)}
                  />
                </Form.Group>

                <Form.Group>
                  <FilterRadios
                    initialFilter={this.state.filter}
                    onChange={this.handleFilterChange.bind(this)}
                  />
                </Form.Group>

                <Form.Group>
                  <InlineDatePicker
                    leftCol={4}
                    rightCol={8}
                    initialDate={this.analysisInfo.startDate}
                    label="Start date"
                    onChange={this.handleStartDateChange.bind(this)}
                  />
                  <InlineDatePicker
                    leftCol={4}
                    rightCol={8}
                    initialDate={this.analysisInfo.endDate}
                    label="End date"
                    onChange={this.handleEndDateChange.bind(this)}
                  />
                  <InlineDropdown
                    leftCol={4}
                    rightCol={8}
                    label="Frequency"
                    initialOption={this.analysisInfo.frequency}
                    options={FREQUENCIES}
                    onChange={this.handleFrequencyChange.bind(this)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Save
                </Button>

              </Form>
            </Col>


            <Col sm={8}>
              <Map
                location={this.state.mapSearchLocation}
                filter={this.state.filter}
                zoom={this.analysisInfo.mapZoom}
                onBoundsChange={this.handleBoundsChange.bind(this)}
              />
            </Col>
          </Row>



        </Container>
      </div>
    );
  }
}

export default NewAnalysisPopup;
