import React from 'react';
import {Link} from 'react-router-dom';

import Card                     from 'react-bootstrap/Card';
var moment = require('moment');

class AnalysisCard extends React.Component {
  render() {
    const analysis = this.props.analysis;
    const startDate = moment(analysis.startDate, moment.ISO_8601).format('M/D/YY');
    const endDate = moment(analysis.endDate, moment.ISO_8601).format('M/D/YY');

    return(
      <Card>
        <Card.Body>
          <Card.Title>{analysis.name}</Card.Title>
          <Card.Text>
            {analysis.filter} <br/>
            {startDate} - {endDate}, {analysis.frequency}
          </Card.Text>
          <Link to={`${this.props.url}`}>View</Link>
        </Card.Body>
      </Card>
    );
  }
}

export default AnalysisCard;
