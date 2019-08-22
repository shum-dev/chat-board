import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMessages, removeMessage } from "../store/actions/messages";
import MessageItem from "../components/MessageItem"

class MessageList extends Component {
  componentDidMount() {
    this.props.fetchMessages();
  }
  render() {
    const {messages, removeMessage, currentUser } = this.props;
    let messageList = messages.map(item => (
      <MessageItem
        key={item._id}
        messageId={item._id}
        date={item.createdAt}
        text={item.text}
        user={item.user}
        profileImageUrl={item.user.profileImageUrl}
        removeMessage={removeMessage.bind(this, item.user._id, item._id)}
        isCorrectUser={currentUser === item.user._id}
      />
    ));
    return (
      <div className="row col-md-8">
        {/* <div className="offset-1 col-sm-12"> */}
        <div className=" col-sm-12">
          <ul className="list-group" id="messages">
            {messageList}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    messages: reduxState.messages,
    currentUser: reduxState.currentUser.user.id
  }
}

export default connect(mapStateToProps, { fetchMessages, removeMessage })(MessageList);