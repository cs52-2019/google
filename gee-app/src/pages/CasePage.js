import React from 'react';

import NewAnalysisPopup           from '../components/NewAnalysisPopup.js'
import VerticallyCenteredModal    from '../components/VerticallyCenteredModal'
import AnalysisCard               from '../components/AnalysisCard'

import { GoPlus }                 from 'react-icons/go'
import Button                     from 'react-bootstrap/Button';
import Container                  from 'react-bootstrap/Container';
import Row                        from 'react-bootstrap/Row';
import Col                        from 'react-bootstrap/Col';

import firebase                   from '../firebase.js';

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
    // Load case data from database and store in state
    const cases = firebase.database().ref(`cases/${this.props.match.params.caseId}`);
    cases.on('value', (snapshot) => {
      var currCase = snapshot.val();
      if (currCase == null) return;

      this.setState({
        title: currCase.title,
        description: currCase.description,
        analyses: currCase.analyses || {},
      })
    });
  }

  // Modal handlers
  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleShowModal() {
    this.setState({ showModal: true });
  }

  render() {
    console.log(`CasePage:`);
    console.log(this.props);
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <h2>{this.state.title}</h2>
            </Col>
          </Row>

          <Row>
            <Col>
              <h3>Case description</h3>
              <p>{this.state.description}</p>
            </Col>
          </Row>

          <Row>
            <Col>
              <h3>Current analyses</h3>
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
                  <AnalysisCard
                    analysis={this.state.analyses[id]}
                    url={`${this.props.match.url}/${id}`}
                  />
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
          <NewAnalysisPopup
            caseId={this.props.caseId}
            onSave={this.handleCloseModal.bind(this)}
          />
        </VerticallyCenteredModal>
      </div>
    );
  }
}

export default CasePage;
