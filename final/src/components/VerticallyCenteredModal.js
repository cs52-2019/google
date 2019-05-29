import React from 'react';

import Modal       from 'react-bootstrap/Modal';

class VerticallyCenteredModal extends React.Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          {this.props.children}
        </Modal.Body>
      </Modal>
    );
  }
}

export default VerticallyCenteredModal;
