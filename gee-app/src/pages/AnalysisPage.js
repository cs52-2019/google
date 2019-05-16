import React from 'react';

import Container                  from 'react-bootstrap/Container';
import Row                        from 'react-bootstrap/Row';
import Col                        from 'react-bootstrap/Col';

import firebase                   from '../firebase.js';

class AnalysisPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ""
    }
  }

  componentWillMount() {
    const params = this.props.match.params;

    const analysisDb = firebase.database().ref(`cases/${params.caseId}/analyses/${params.analysisId}`);
    analysisDb.on('value', (snapshot) => {
      var analysis = snapshot.val();
      if (analysis == null) return;

      this.setState({
        title: analysis.name,
      })
    })
  }

	render() {
    return(
      <div>
        <Container>
          <Col>
            <h2>{this.state.title}</h2>
          </Col>
        </Container>
      </div>
    )
  }
}

export default AnalysisPage;
