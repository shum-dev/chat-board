import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => (
  <div className="home-hero">
    <div className="home-hero-text">
      <h1>What's Happening?</h1>
      <h4>New to Chat-board?</h4>
      <Link to="/signup" className="btn btn-primary">
        Sign up here
      </Link>
    </div>
  </div>
);

export default Homepage;
