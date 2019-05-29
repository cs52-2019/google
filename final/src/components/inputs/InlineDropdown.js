import React from 'react';

import Form           from 'react-bootstrap/Form';
import Row            from 'react-bootstrap/Row';
import Col            from 'react-bootstrap/Col';

class InlineDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: props.initialOption
    };
  }

  handleDropdownChange(e) {
    var option = e.target.value;

    this.setState({
      option: option
    });

    this.props.onChange(option);
  }

  render() {
    return (
      <div className="inline-dropdown">
        <Row>
          <Form.Label column sm={this.props.leftCol}>
            {this.props.label}:
          </Form.Label>
          <Col sm={this.props.rightCol}>
            <Form.Control as="select" onChange={this.handleDropdownChange.bind(this)}>
            {
              this.props.options.map(option =>
                <option>{option}</option>
              )
            }
            </Form.Control>
          </Col>
        </Row>
      </div>
    )
  }
}

export default InlineDropdown;
