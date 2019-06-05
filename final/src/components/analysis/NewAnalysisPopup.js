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
import { FREQUENCIES, DateRange }   from '../../utils/date.js';
var moment = require('moment');



class NewAnalysisPopup extends React.Component {
  constructor(props) {
    super(props);

    // Analysis info that doesn't require map refresh
    this.analysisInfo = {
      // TODO: mapCenter and mapZoom should come from database
      mapCenter: this.props.mapCenter,
      mapSouthwest: {},
      mapNortheast: {},
      mapZoom: this.props.mapZoom,
      startDate: new Date(),
      endDate: new Date(),
      frequency: 'Every week',
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

  handleBoundsChange(center, zoom, northeast, southwest) {
    this.analysisInfo.mapNortheast = {
      lat: northeast.lat(),
      lng: northeast.lng(),
    }
    this.analysisInfo.mapSouthwest = {
      lat: southwest.lat(),
      lng: southwest.lng(),
    }
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
      mapNortheast: this.analysisInfo.mapNortheast,
      mapSouthwest: this.analysisInfo.mapSouthwest,
      mapZoom: this.analysisInfo.mapZoom,
      filter: this.state.filter,
      startDate: moment(this.analysisInfo.startDate).toISOString(),
      endDate: moment(this.analysisInfo.endDate).toISOString(),
      frequency: this.analysisInfo.frequency,
    };
    console.log(analysis);

    analyses.push(analysis).then((snapshot) => {
      const analysisId = snapshot.key;
      this.sendEERequests(analysisId);
    });

    this.props.onSave();
  }

  // Calls local Flask app, which is running EE download script
  sendEERequests(analysisId) {
    var dateHelper = new DateRange(
      this.analysisInfo.startDate,
      this.analysisInfo.endDate,
      this.analysisInfo.frequency
    );

    var dateRanges = dateHelper.getFormattedDateRanges("MM-DD-YYYY");

    dateRanges.forEach(dateRange => {
      var request = new XMLHttpRequest();
      request.open("POST", `http://localhost:5000/download_one`, true);
      request.send(JSON.stringify({
        'filter': this.state.filter,
        'caseId': this.props.caseId,
        'analysisId': analysisId,
        'northeast': this.analysisInfo.mapNortheast,
        'southwest': this.analysisInfo.mapSouthwest,
        'startDate': dateRange[0],
        'endDate': dateRange[1]
      }));
    })
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
