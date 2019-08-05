import React, { Component } from "react";
import PropTypes from "prop-types";
import RenderIf from "render-if";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faEdit, faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class ScanList extends Component {
  render() {
    const { scans, handleSorting, onSearch } = this.props;

    return (
      <div className="ScanList">
        <Card bg="light">
          <Card.Header as="h5">
            <Nav>
              <Nav.Item>
                <Nav.Link disabled>Scans</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Header>
            <Row className="justify-content-between">
              <Col sm={4} md={6}>
                <Link
                  to="/scan/create"
                  className="btn btn-primary create-scan-btn">
                  <FontAwesomeIcon icon={faPlusCircle} /> Add Scan
                </Link>
              </Col>
              <Col sm={8} md={6}>
                <Form.Control
                  type="text"
                  placeholder="Search scans . . ."
                  onChange={onSearch}
                />
              </Col>
            </Row>
          </Card.Header>
          <Card.Body style={{ padding: 0 }}>
            <Table className="scans-tabular-list mb-0" hover striped responsive>
              <thead className="bg-primary text-white">
                <tr>
                  <th className="text-right">#</th>
                  <th
                    className="sortable justify-content-between"
                    data-key="name"
                    onClick={handleSorting}>
                    Scan
                    <span className="asc">
                      <FontAwesomeIcon icon={faCaretUp} fixedWidth />
                    </span>
                    <span className="desc">
                      <FontAwesomeIcon icon={faCaretDown} fixedWidth />
                    </span>
                  </th>
                  <th
                    className="sortable"
                    data-key="username"
                    onClick={handleSorting}>
                    Scanned by
                    <span className="asc">
                      <FontAwesomeIcon icon={faCaretUp} fixedWidth />
                    </span>
                    <span className="desc">
                      <FontAwesomeIcon icon={faCaretDown} fixedWidth />
                    </span>
                  </th>
                  <th
                    className="sortable"
                    data-key="elevationMin"
                    onClick={handleSorting}>
                    Min. Elevation
                    <span className="asc">
                      <FontAwesomeIcon icon={faCaretUp} fixedWidth />
                    </span>
                    <span className="desc">
                      <FontAwesomeIcon icon={faCaretDown} fixedWidth />
                    </span>
                  </th>
                  <th
                    className="sortable"
                    data-key="elevationMax"
                    onClick={handleSorting}>
                    Max. Elevation
                    <span className="asc">
                      <FontAwesomeIcon icon={faCaretUp} fixedWidth />
                    </span>
                    <span className="desc">
                      <FontAwesomeIcon icon={faCaretDown} fixedWidth />
                    </span>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {scans.map((scan, i) => {
                  return (
                    <tr key={i}>
                      <td className="text-right">{i + 1}</td>
                      <td>{scan.name}</td>
                      <td>{scan.username}</td>
                      <td className="text-right">
                        {parseFloat(scan.elevationMin).toFixed(2)}
                      </td>
                      <td className="text-right">
                        {parseFloat(scan.elevationMax).toFixed(2)}
                      </td>
                      <td>
                        <Link
                          to={`/scan/update/${scan.id}`}
                          className="btn btn-primary btn-sm">
                          <FontAwesomeIcon icon={faEdit} /> Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              {RenderIf(scans.length === 0)(
                <tfoot>
                  <tr>
                    <td colSpan={6}>No result(s) found.</td>
                  </tr>
                </tfoot>
              )}
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

ScanList.defaultProps = {
  scans: [],
  handleSorting: () => {},
  onSearch: () => {}
};

ScanList.propTypes = {
  scans: PropTypes.array.isRequired,
  handleSorting: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
};

export default ScanList;
