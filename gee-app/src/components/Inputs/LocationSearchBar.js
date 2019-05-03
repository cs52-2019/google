import React from 'react';
import ReactDOM  from "react-dom";

import InputGroup     from 'react-bootstrap/InputGroup';
import FormControl    from 'react-bootstrap/FormControl';
import Button         from 'react-bootstrap/Button';


class LocationSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location
    };
  }

  handleLocationChange() {
    var locationInput = ReactDOM.findDOMNode(this.refs.inputLocation).value;
    var latLon = locationInput.split(',')

    // TODO: add more error checking
    if (latLon.length !== 2) return;

    var location = {
      lat: parseFloat(latLon[0]),
      lng: parseFloat(latLon[1])
    };

    this.setState({
      location: location
    });

    this.props.onChange(location);
  }

  render() {
    return (
      <div className="location-search">
        <InputGroup>
          <FormControl ref="inputLocation" placeholder="Enter latitude, longitude"/>
          <InputGroup.Append>
            <Button onClick={this.handleLocationChange.bind(this)}>Search</Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    )
  }
}

export default LocationSearchBar;
