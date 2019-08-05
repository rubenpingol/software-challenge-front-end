import React, { Component } from "react";
import PropTypes from "prop-types";
import RenderIf from "render-if";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import LoadingButton from "../../common/LoadingButton";
import UserRepository from "../../../services/repositories/UserRepository";

class ScanForm extends Component {
  render() {
    const {
      id,
      actionTitle,
      scan,
      user,
      users,
      isSaving,
      onChange,
      onSelectChange,
      onSubmit
    } = this.props;

    return (
      <div className="scan-form-page">
        <Card>
          <Card.Header>
            <Row className="justify-content-between mx-0">
              <Nav as="h5">
                <Nav.Item>
                  <Nav.Link as={Link} to="/">
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link disabled>{`${actionTitle} Scan`}</Nav.Link>
                </Nav.Item>
              </Nav>
              {RenderIf(id)(
                <Link to="/scan/create" className="btn btn-primary">
                  <FontAwesomeIcon icon={faPlusCircle} /> Add Scan
                </Link>
              )}
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <Form onSubmit={onSubmit}>
                  <Form.Group as={Row} controlId="formHorizontalScanName">
                    <Form.Label column sm={5}>
                      Scan Name
                    </Form.Label>
                    <Col sm={7}>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Scan Name"
                        value={scan && scan.name ? scan.name : ""}
                        disabled={isSaving}
                        onChange={onChange}
                        required
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formHorizontalMinElevation">
                    <Form.Label column={5}>Min. Elevation</Form.Label>
                    <Col sm={7}>
                      <Form.Control
                        type="number"
                        name="elevationMin"
                        step="any"
                        placeholder="0.00"
                        value={
                          scan && scan.elevationMin ? scan.elevationMin : ""
                        }
                        disabled={isSaving}
                        onChange={onChange}
                        required
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formHorizontalMaxElevation">
                    <Form.Label column={5}>Max. Elevation</Form.Label>
                    <Col sm={7}>
                      <Form.Control
                        type="number"
                        name="elevationMax"
                        step="any"
                        placeholder="0.00"
                        value={
                          scan && scan.elevationMax ? scan.elevationMax : ""
                        }
                        disabled={isSaving}
                        onChange={onChange}
                        required
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formHorizontalUsername">
                    <Form.Label column={5}>User</Form.Label>
                    <Col sm={7}>
                      <Select
                        name="username"
                        placeholder="Select User"
                        value={
                          user === undefined ||
                          user === null ||
                          Object.keys(user).length === 0
                            ? ""
                            : UserRepository.createSelectOption(
                                user.name,
                                user.id,
                                user
                              )
                        }
                        isDisabled={isSaving}
                        options={
                          users && users.length > 0
                            ? users.map(u =>
                                UserRepository.createSelectOption(
                                  u.name,
                                  u.id,
                                  { ...u, field: "scannedByUserId" }
                                )
                              )
                            : []
                        }
                        onChange={onSelectChange}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Col sm={{ span: 7, offset: 5 }}>
                      <LoadingButton
                        type="submit"
                        text="Saving . . ."
                        loading={isSaving}
                        disabled={isSaving}>
                        Save
                      </LoadingButton>
                    </Col>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

ScanForm.defaultProps = {
  id: null,
  actionTitle: "Create",
  onSelectChange: () => {}
};

ScanForm.propTypes = {
  scan: PropTypes.shape({
    id: PropTypes.number
  }),
  user: PropTypes.shape({
    id: PropTypes.number
  }),
  users: PropTypes.array.isRequired,
  isSaving: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default ScanForm;
