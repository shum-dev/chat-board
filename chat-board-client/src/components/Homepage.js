import React from "react";
import { Link } from "react-router-dom";
import MessageTilmeLine from "./MessageTimeLine";

const Homepage = ({ currentUser }) => {
  if(!currentUser.isAuthenticated){
    return (
      <div className="home-hero">
        <div className="home-hero-text">
          <h1>Hi there!</h1>
          <h4>New to Chat-board?</h4>
          <Link to="/signup" className="btn btn-primary">
            Sign up here
          </Link>
          <h4>Alredy have an account?</h4>
          <Link to="/signin" className="btn btn-primary">
            Log in
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <MessageTilmeLine
        profileImageUrl={currentUser.user.profileImageUrl}
        username={currentUser.user.username}
        email={currentUser.user.email}/>
    </div>
  )
};

export default Homepage;
