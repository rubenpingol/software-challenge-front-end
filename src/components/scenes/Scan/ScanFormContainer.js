import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getScanList,
  scanEditUnmount,
  scanCreate,
  onScanEdit,
  scanEdit,
  scanUpdate,
  onSaveScan
} from "../../../services/store/actions/ScanAction";
import { getUserList } from "../../../services/store/actions/UserAction";
import { createUserData, createScanData } from "../../../services/store/data";
import ScanRepository from "../../../services/repositories/ScanRepository";
import ScanForm from "./ScanForm";

class ScanFormContainer extends Component {
  constructor(props) {
    super(props);

    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleFormSelectChange = this.handleFormSelectChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    const { scans, users, match, dispatch } = this.props;
    const { params } = match;
    const { id } = params;

    this.handleFormDataInitialization(id);

    if (scans.list.data.length === 0)
      dispatch(
        getScanList(ScanRepository.getScanWithUserData(createScanData()))
      );

    if (users.list.data.length === 0) dispatch(getUserList(createUserData()));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id)
      this.handleFormDataInitialization(this.props.match.params.id);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(scanEditUnmount());
  }

  setCreateScanData() {
    const { dispatch } = this.props;
    dispatch(scanCreate());
  }

  setEditScanData(id) {
    const { dispatch, scans } = this.props;
    const { list } = scans;
    let _data = list.data,
      scanData = {};

    if (_data.length === 0) {
      dispatch(onScanEdit(id));
    } else {
      scanData = _data.find(scan => scan.id === parseInt(id));
      dispatch(scanEdit({ id: id, data: scanData }));
    }
  }

  getActionLabel() {
    const { match } = this.props;
    const { params } = match;
    let actionLabel = params.id ? "Update" : "Create";

    if (!actionLabel || actionLabel === undefined) return null;

    return (
      actionLabel
        .toString()
        .charAt(0)
        .toUpperCase() + actionLabel.toString().slice(1)
    );
  }

  handleFormDataInitialization(id) {
    if (id === undefined) this.setCreateScanData();
    else this.setEditScanData(id);
  }

  handleFormInputChange(ev) {
    const { dispatch, scans } = this.props;
    const { selected } = scans;
    let target = ev.currentTarget,
      name = target.name,
      value = target.value,
      scan = selected;

    if (Object.keys(scan).includes(name)) scan[name] = value;

    dispatch(scanUpdate(scan));
  }

  handleFormSelectChange(data) {
    const { dispatch, scans, users } = this.props;
    const { selected } = scans;
    const { value, field } = data;
    let scan = selected;

    if (Object.keys(scan).includes(field)) scan[field] = value;

    scan = ScanRepository.scanData(scan, users.list.data);
    dispatch(scanUpdate(scan));
  }

  handleFormSubmit(ev) {
    ev.preventDefault();

    const { dispatch, match, scans } = this.props;
    const { params } = match;
    const { id } = params;
    const { selected, list } = scans;
    let scansData = list.data,
      selectedScan = selected,
      scanCount = scansData.length,
      newId = null;

    if (id !== undefined) {
      scansData = scansData.map(scan => {
        if (scan.id === parseInt(id)) {
          return selectedScan;
        }

        return scan;
      });
    } else {
      newId = scanCount + 1;
      selectedScan = {
        ...selectedScan,
        id: newId
      };

      scansData.push(selectedScan);
    }

    dispatch(onSaveScan(scansData));

    if (id === undefined) {
      dispatch(scanEdit({ id: newId, data: selectedScan }));
      this.props.history.push(`/scan/update/${newId}`);
    }
  }

  render() {
    const { scans, users, match } = this.props;
    const {
      params: { id }
    } = match;
    const { selected, is_saving } = scans;
    let scan = selected,
      user = users.list.data.find(
        u =>
          scan && scan.scannedByUserId !== null && u.id === scan.scannedByUserId
      );

    return (
      <section className="ScanFormContainer">
        <ScanForm
          actionTitle={this.getActionLabel()}
          id={id}
          scan={scan}
          user={user}
          users={users.list.data}
          isSaving={is_saving}
          onChange={this.handleFormInputChange}
          onSelectChange={this.handleFormSelectChange}
          onSubmit={this.handleFormSubmit}
        />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  scans: state.scans,
  users: state.users
});

export default connect(mapStateToProps)(ScanFormContainer);
