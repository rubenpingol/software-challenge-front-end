import React, { Component } from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import ScanListContainer from "./ScanListContainer";

class ScanContainer extends Component {
  testToastr(ev) {
    toastr.success("SUCCESS", "Record have been saved successfully!");
  }
  render() {
    return (
      <div className="ScanContainer">
        <ScanListContainer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  scans: state.scans,
  users: state.users
});

export default connect(mapStateToProps)(ScanContainer);
