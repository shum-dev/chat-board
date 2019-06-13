import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../images/Chat-board-logo.png";
import { logOut } from "../store/actions/auth";
import { withRouter } from "react-router-dom";

class Navbar extends Component {
  logOut = e => {
    e.preventDefault();
    this.props.logOut();
    this.props.history.push("/");
  }
  render() {
    const { currentUser } = this.props
    return(
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <div className="navbar-header">
          <Link to="/" className="navbar-brand">
            <img src={Logo} alt="chat-board Home"></img>
          </Link>
          </div>
          {currentUser.isAuthenticated ? (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to={`/users/${currentUser.user.id}/messages/new`}>New Message</Link>
              </li>
              <li>
                <button onClick={this.logOut}>Log out</button>
              </li>
            </ul>
          )
          : (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
              <li>
                <Link to="/signin">Log in</Link>
              </li>
            </ul>
            )}
        </div>
      </nav>
    )
  }
}

function mapStateToProps(reduxState) {
  return {
    currentUser: reduxState.currentUser,
  };
}

export default withRouter(connect(mapStateToProps, { logOut })(Navbar));