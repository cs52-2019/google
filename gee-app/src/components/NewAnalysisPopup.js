import React from 'react';

import Map               from './Map.js'
import InlineDatePicker  from './Inputs/InlineDatePicker.js'
import LocationSearchBar from './Inputs/LocationSearchBar.js'
import FilterRadios      from './Inputs/FilterRadios.js'
import InlineDropdown    from './Inputs/InlineDropdown.js'

import Container    from 'react-bootstrap/Container';
import Row          from 'react-bootstrap/Row';
import Col          from 'react-bootstrap/Col';
import Form         from 'react-bootstrap/Form';
import Button       from 'react-bootstrap/Button';

import firebase     from '../firebase.js';

const FREQUENCIES = [
  'Every day',
  'Every week',
  'Every month'
]

class NewAnalysisPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mapLocation: {
        lat: 48.611639, // Ukraine
        lng: 29.178028  // Ukraine
      },
      mapFilter: 'Satellite',
      mapStartDate: new Date(),
      mapEndDate: new Date(),
      mapFrequency: 'Every day',
    }
  }

  handleLocationChange(location) {
    this.setState({
      mapLocation: location
    });
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

  handleEndDateChange(date) {
    console.log(`end date = ${date}`);
    this.setState({
      mapEndDate: date
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
    console.log(this.state.mapStartDate);
    console.log(this.state.mapEndDate);

    const currCase = firebase.database().ref('cases').child("-LeUAC_DGuK-2ZoRiQHM").child("analyses"); // TODO: unhardcode
    const analysis = {
      mapLocation: this.state.mapLocation,
      mapFilter: this.state.mapFilter,
      mapStartDate: this.state.mapStartDate,
      mapEndDate: this.state.mapEndDate,
      mapFrequency: this.state.mapFrequency,
    };
    console.log(analysis);
    currCase.push(analysis);
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

                <Form.Group>
                  <InlineDatePicker
                    leftCol={4}
                    rightCol={8}
                    initialDate={this.state.mapStartDate}
                    label="Start date"
                    onChange={this.handleStartDateChange.bind(this)}
                  />
                  <InlineDatePicker
                    leftCol={4}
                    rightCol={8}
                    initialDate={this.state.mapEndDate}
                    label="End date"
                    onChange={this.handleEndDateChange.bind(this)}
                  />
                  <InlineDropdown
                    leftCol={4}
                    rightCol={8}
                    label="Frequency"
                    initialOption={this.state.mapFrequency}
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
                location={this.state.mapLocation}
                filter={this.state.mapFilter}
              />
            </Col>
          </Row>



        </Container>
      </div>
    );
  }
}

export default NewAnalysisPopup;
