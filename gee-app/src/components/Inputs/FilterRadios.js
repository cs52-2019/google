import React from 'react';

import Form           from 'react-bootstrap/Form';

const MAP_FILTERS = {
  'General': ['Satellite'],
  'Pollutants': ['Nitrogen dioxide', 'Carbon monoxide'],
};

class FilterRadios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: props.initialFilter
    };
  }

  handleFilterChange(e) {
    // Extract filter name from element ID
    var filter = e.target.id.substring('map-filter-'.length);

    this.setState({
      mapFilter: filter
    });

    this.props.onChange(filter);
  }

  render() {
    return (
      <div>
        {Object.keys(MAP_FILTERS).map(type => (
          <div style={{marginBottom: '.5rem'}}>
            <h6 className="text-uppercase">{`${type}`}</h6>
            {
              MAP_FILTERS[type].map(filter =>
                <Form.Check
                  custom
                  defaultChecked={filter === this.props.initialFilter}
                  type="radio"
                  name="filterOptions"
                  id={`map-filter-${filter}`}
                  label={`${filter}`}
                  onChange={this.handleFilterChange.bind(this)}
                />
              )
            }
          </div>
        ))}
      </div>
    )
  }
}

export default FilterRadios;
