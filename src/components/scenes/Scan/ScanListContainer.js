import React, { Component } from "react";
import { connect } from "react-redux";

import { createUserData } from "../../../services/store/data";
import {
  getScanList,
  updateScanList
} from "../../../services/store/actions/ScanAction";
import { getUserList } from "../../../services/store/actions/UserAction";
import ScanRepository from "../../../services/repositories/ScanRepository";
import ScanList from "./ScanList";

class ScanListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSearching: false,
      searchResult: []
    };
    this.handleSorting = this.handleSorting.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    const { dispatch, scans, users } = this.props;
    const userData = createUserData();

    if (scans.list.data.length === 0)
      dispatch(getScanList(ScanRepository.getScanWithUserData()));

    if (users.list.data.length === 0) dispatch(getUserList(userData));
  }

  componentDidUpdate(prevProps) {
    // console.log('prev_props', prevProps);
    // console.log('current_props', this.props);
  }

  handleSorting(ev) {
    const { isSearching, searchResult } = this.state;
    const {
      dispatch,
      scans: {
        list: { data }
      }
    } = this.props;
    let scanData = data;
    let target = ev.currentTarget,
      isSortable = target.classList.contains("sortable"),
      key = target.dataset.key,
      sortedAscClass = "sorted-asc",
      sortedDescClass = "sorted-desc",
      isAscending = true;

    if (target.classList.contains(sortedAscClass)) {
      isAscending = false;
      target.classList.add(sortedDescClass);
      target.classList.remove(sortedAscClass);
    } else if (target.classList.contains(sortedDescClass)) {
      target.classList.remove(sortedDescClass);
      target.classList.add(sortedAscClass);
    }

    if (
      !target.classList.contains(sortedAscClass) &&
      !target.classList.contains(sortedDescClass)
    ) {
      target.classList.add(sortedAscClass);
    }

    if (isSortable) {
      if (isSearching) {
        scanData = searchResult;
      }

      scanData.sort((a, b) => {
        let keyA = a[key],
          keyB = b[key],
          comparison = 0;

        if (keyA < keyB) comparison = -1;
        else if (keyA > keyB) comparison = 1;

        return isAscending ? comparison : comparison * -1;
      });
    }

    dispatch(updateScanList(scanData));
  }

  handleSearch(ev) {
    const { scans } = this.props;
    const { list } = scans;
    let target = ev.currentTarget,
      value = target.value,
      scansData = list.data,
      searchResult = [],
      searchValue = value.trim();

    if (searchValue.length === 0) {
      this.setState({
        isSearching: false,
        searchResult: []
      });
      return false;
    }

    searchResult = scansData.filter(scan => {
      return (
        scan.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        scan.username.toLowerCase().includes(searchValue.toLowerCase())
      );
    });

    this.setState({ isSearching: true, searchResult });
  }

  render() {
    const { scans } = this.props;
    const { isSearching, searchResult } = this.state;
    let scansList = scans.list.data;

    return (
      <section className="ScanListContainer">
        <ScanList
          scans={isSearching && searchResult ? searchResult : scansList}
          handleSorting={this.handleSorting}
          onSearch={this.handleSearch}
        />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  scans: state.scans,
  users: state.users
});

export default connect(mapStateToProps)(ScanListContainer);
