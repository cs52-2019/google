import React from 'react';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import {formatDate, parseDate} from 'react-day-picker/moment';
import Row            from 'react-bootstrap/Row';
import Col            from 'react-bootstrap/Col';
import Form           from 'react-bootstrap/Form';

import 'react-day-picker/lib/style.css';
import 'moment/locale/it';

class InlineDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.initialDate,
    };
  }

  handleDateChange(date) {
    console.log(date);
    this.setState({
      date: date
    });
    this.props.onChange(date);
  }

  render() {
    return (
      <div className="date-picker">
        <Row>
          <Form.Label column sm={this.props.leftCol}>
            {this.props.label}:
          </Form.Label>
          <Col sm={this.props.rightCol}>
            <DayPickerInput
              formatDate={formatDate}
              parseDate={parseDate}
              placeholder={`${formatDate(this.state.date)}`}
              onDayChange={this.handleDateChange.bind(this)}
              dayPickerProps={{todayButton: 'Today'}}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default InlineDatePicker;
