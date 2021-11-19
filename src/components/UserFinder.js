import { Fragment } from "react";

import Users from "./Users";
import classes from "./UserFinder.module.css";
import React, { Component } from "react";
import UsersContext from "../store/users-context";

export default class UserFinder extends Component {
  //  get context here, this line will register context to this component
  //  we can grab data with "this.context" after

  static contextType = UsersContext;

  constructor(props) {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: "",
    };
  }

  // Only once when the component is initially mounted
  // equal to useEffect(()=>{},[]) , will run only once
  componentDidMount() {
    // sent http request
    this.setState({ filteredUsers: this.context.users }); // not "contextType"
  }

  // without the props, this lifecycle function will be an infinite loop
  // https://stackoverflow.com/questions/46686386/componentdidupdate-vs-componentdidmount
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter(
          // not "contextType"
          (user) => user.name.includes(this.state.searchTerm)
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
        {/* <UsersContext.Consumer> */}
        <div className={classes.finder}>
          <input type="search" onChange={this.searchChangeHandler} />
          {/* <input type='search' onChange={this.searchChangeHandler.bind(this)} /> */}
        </div>
        <Users users={this.state.filteredUsers} />
        {/* </UsersContext.Consumer> */}
      </Fragment>
    );
  }
}
