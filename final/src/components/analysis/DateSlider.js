import React from 'react';

import Slider                       from 'react-rangeslider'

import { DateRange }                from '../../utils/date.js';

// var moment = require('moment');

class DateSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      val: 0,
    }

    this.dateHelper = new DateRange(props.startDate, props.endDate, props.frequency);
    this.dates = this.dateHelper.getFormattedDates('M/D/YY');
    this.numDates = this.dates.length;

    const tick = Math.floor(this.numDates / Math.min(10, this.numDates));
    this.labels = {}
    for (var i = 0; i < this.numDates; i += tick) {
      this.labels[i] = this.valToDate(i);
    }

    // console.log('done with constructor')
  }

  valToDate(val) {
    // console.log('in valToDate')
    return this.dates[val];
  }

  handleSlider(val) {
    // console.log('in handleSlider')
    this.setState({
      val: val,
    });
  }

  sendValue() {
    // console.log('in sendValue')
    this.props.handleSlider(this.valToDate(this.state.val));
  }

	render() {
    return(
      <div id="date-slider">
        <Slider
          min={0}
          max={this.numDates - 1}
          value={Number(this.state.val)}
          onChange={this.handleSlider.bind(this)}
          onChangeComplete={this.sendValue.bind(this)}
          format={this.valToDate.bind(this)}
          labels={this.labels}
        />
      </div>
    )
  }
}

export default DateSlider;
