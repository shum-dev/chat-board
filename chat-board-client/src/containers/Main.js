import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";

const Main = () => {
  return(
    <div className="container">
      <Switch>
        <Route exact path="/" render={props => <Homepage {...props} />} />
        <Route exact path="/signin" render={props => {
          return(
            <AuthForm {...props} buttonText="Log in" heading="Wellcome Back." />
          )
        }} />
        <Route exact path="/signup" render={props => {
          return(
            <AuthForm {...props} buttonText="Sign me up!" heading="Join Chat-board today" signUp shum />
          )
        }} />
      </Switch>
    </div>
  );
};

function mapStateToProps(reduxState) {
  return {
    currentUser: reduxState.currentUser,
  };
}

export default withRouter(connect(mapStateToProps, null)(Main));