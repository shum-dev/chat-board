import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Navbar extends Component {
  render() {
    return(
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src="" alt="chat-board Home"></img>
          </Link>
        </div>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
          <li>
            <Link to="/signin">Log in</Link>
          </li>
        </ul>
      </nav>
    )
  }
}

function mapStateToProps(reduxState) {
  return {
    currentUser: reduxState.currentUser,
  };
}

export default connect(mapStateToProps, null)(Navbar);