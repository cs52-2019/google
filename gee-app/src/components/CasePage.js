import React from 'react';

import NewAnalysisPopup           from './NewAnalysisPopup.js'
import VerticallyCenteredModal    from './VerticallyCenteredModal'

import { GoPlus }                 from 'react-icons/go'
import Button                     from 'react-bootstrap/Button';
import Container                  from 'react-bootstrap/Container';
import Row                        from 'react-bootstrap/Row';
import Col                        from 'react-bootstrap/Col';

import firebase     from '../firebase.js';

class CasePage extends React.Component {
  constructor(props) {
    super(props);

    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

    this.state = {
      showModal: false,
      title: "",
      description: "",
      analyses: {},
    };
  }

  componentWillMount() {
    const cases = firebase.database().ref('cases');
    cases.limitToFirst(1).on("value", (snapshot) => {
      var keys = Object.keys(snapshot.val());
      var obj = snapshot.val()[keys[0]]; // TODO: un-hardcode
      this.setState({
        title: obj.title,
        description: obj.description,
        analyses: obj.analyses,
      });
    })
  }

  // Modal handlers
  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleShowModal() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <h2>{this.state.title}</h2>
              <p>{this.state.description}</p>
            </Col>
          </Row>

          <Row>
            <Col>
              <h2>Current analyses</h2>
            </Col>

            <Col className="text-right">
              <Button variant="primary" onClick={this.handleShowModal}>
                <GoPlus/> Create analysis
              </Button>
            </Col>
          </Row>

          <Row>
            {
              Object.keys(this.state.analyses).map(id => (
                <Col lg="4">
                  {this.state.analyses[id].mapFilter}
                </Col>
              ))
            }
          </Row>
        </Container>


        <VerticallyCenteredModal
          id="new-analysis-modal"
          size="lg"
          show={this.state.showModal}
          onHide={this.handleCloseModal}
        >
          <NewAnalysisPopup/>
        </VerticallyCenteredModal>
      </div>
    );
  }
}

export default CasePage;
