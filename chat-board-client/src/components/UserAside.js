import React from "react";
import DefaultProfileImg from "../images/default-avatar.png";

const UserAside = ({profileImageUrl, username, email}) => (
  <aside className="col-md-3">
    <div className="panel panel-default">
      <div className="card border-light">
        <h2>{username}</h2>
        <img
          src={profileImageUrl ? profileImageUrl: DefaultProfileImg}
          alt={username}
          className="card-img-top"
        />
        <div className="card-footer text-muted text-left">
          E-mail: <a href="mailto:">{email}</a>
        </div>
      </div>
    </div>
  </aside>
);

export default UserAside;