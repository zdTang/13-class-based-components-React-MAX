import classes from "./User.module.css";

import React, { Component } from "react";

export class User extends Component {
  // must have the "This"
  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

export default User;
