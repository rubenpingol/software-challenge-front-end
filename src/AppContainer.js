import React, { Component } from "react";
import { Router, Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import history from "./services/store/history";
import PageHeader from "./components/common/PageHeader";
import ScanContainer from "./components/scenes/Scan/ScanContainer";
import ScanFormContainer from "./components/scenes/Scan/ScanFormContainer";
import Page404 from "./components/scenes/PageNotFound/Page404";

export default class AppContainer extends Component {
  render() {
    return (
      <div className="AppContainer">
        <Container>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <PageHeader />
              <Router history={history}>
                <Switch>
                  <Route path="/" exact component={ScanContainer} />
                  <Route path="/scan/create" component={ScanFormContainer} />
                  <Route path="/scan/update/:id" component={ScanFormContainer} />
                  <Route component={Page404} />
                </Switch>
              </Router>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
