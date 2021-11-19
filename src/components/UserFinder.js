import { Fragment } from "react";

import Users from "./Users";
import classes from "./UserFinder.module.css";
import React, { Component } from "react";

const DUMMY_USERS = [
  { id: "u1", name: "Max" },
  { id: "u2", name: "Manuel" },
  { id: "u3", name: "Julie" },
];

export default class UserFinder extends Component {
  constructor(props) {
    super();
    this.state = {
      filteredUsers: DUMMY_USERS,
      searchTerm: "",
    };
  }
  // without the props, this lifecycle function will be an infinite loop
  // https://stackoverflow.com/questions/46686386/componentdidupdate-vs-componentdidmount
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: DUMMY_USERS.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  searchChangeHandler = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type="search" onChange={this.searchChangeHandler} />
          {/* <input type='search' onChange={this.searchChangeHandler.bind(this)} /> */}
        </div>
        <Users users={this.state.filteredUsers} />
      </Fragment>
    );
  }
}
