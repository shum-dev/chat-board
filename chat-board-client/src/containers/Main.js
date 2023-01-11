import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import withAuth from "../hocs/withAuth";
import MessageForm from "../containers/MessageForm";
import EditMessageForm from "../containers/EditMessageForm";
import { editMessage } from "../store/actions/messages";

const Main = ({authUser, errors, removeError, currentUser, messages, editMessage}) => {
  const getMessage = routeProps => {
    let message = '';
    try{
      message = messages.filter(item => item._id === routeProps.match.params.message_id)[0].text
    } catch(ignore){
      message = localStorage.currentMessage;
    }
    return (
      <EditMessageForm
              {...routeProps}
              currentUser={currentUser}
              message={message}
              errors={errors}
              editMessage={editMessage}
      />
    )
  }
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
              signUp
              onAuth={authUser}
              errors={errors}
              removeError={removeError}
              />
          )
        }}
        />
        <Route path="/users/:id/messages/new" component={withAuth(MessageForm)} />
        <Route path="/users/:id/messages/:message_id" render={getMessage}/>

      </Switch>
    </div>
  );
};

function mapStateToProps(reduxState) {
  return {
    currentUser: reduxState.currentUser,
    errors: reduxState.errors,
    messages: reduxState.messages
  };
}

export default withRouter(connect(mapStateToProps, { authUser, removeError, editMessage })(Main));