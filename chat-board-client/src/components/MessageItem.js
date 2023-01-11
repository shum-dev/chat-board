import React from "react";
import Moment from "react-moment";
import { Link, withRouter } from "react-router-dom";
import DefaultProfileImg from "../images/default-avatar.png";

const MessageItem = ({messageId, date, profileImageUrl, text, user, removeMessage, isCorrectUser, history}) => (
    <li className="list-group-item">
      <img src={profileImageUrl || DefaultProfileImg} alt={user.username} height="100" width="100" className="timeline-image" />
      <div className="message-area">
        <Link to="/">@{user.username} &nbsp;</Link>
        <span className="text-muted">
          <Moment className="text-muted" format="DD/MM/YYYY">
            {date}
          </Moment>
        </span>
        <p>
          {text}
        </p>
        {isCorrectUser && (
          <div className="text-right">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => (history.push( `/users/${user._id}/messages/${messageId}`))}>Edit</button>
            <button className="btn btn-danger btn-sm" onClick={removeMessage}>
              Delete
            </button>
          </div>
        )}
      </div>
    </li>
)

export default withRouter(MessageItem);