import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import withAuth from "../hocs/withAuth";
import MessageForm from "../containers/MessageForm";

const Main = ({authUser, errors, removeError, currentUser}) => {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" render={props => <Homepage {...props} currentUser={currentUser}/>} />
        <Route exact path="/signin" render={props => {
          return(
            <AuthForm
              {...props}
              buttonText="Log in"
              heading="Wellcome Back!"
              onAuth={authUser}
              errors={errors}
              removeError={removeError} />
          )
        }} />
        <Route exact path="/signup" render={props => {
          return(
            <AuthForm
              {...props}
              buttonText="Sign me up!"
              heading="Join Chat-board today"
              signUp onAuth={authUser}
              errors={errors}
              removeError={removeError}
              />
          )
        }}
        />
        <Route path="/users/:id/messages/new" component={withAuth(MessageForm)} />
      </Switch>
    </div>
  );
};

function mapStateToProps(reduxState) {
  return {
    currentUser: reduxState.currentUser,
    errors: reduxState.errors
  };
}

export default withRouter(connect(mapStateToProps, { authUser, removeError })(Main));