import React, { Component } from "react";

class EditMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message
    };
  }
  componentDidMount(){
    if(!localStorage.getItem('currentMessage')){
      window.localStorage.setItem("currentMessage", this.props.message);
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    this.props.editMessage(this.state.message, this.props.match.params.message_id).then(() => {
      this.props.history.push("/")
    });
  }

  render(){
    this.props.history.listen(() => localStorage.removeItem('currentMessage'));
    return(
      <form onSubmit={this.handleSubmit}>
        {this.props.errors.message && (
          <div className="alert alert-danger">
            {this.props.errors}
          </div>
        )}
        <input
          type="text"
          className="form-control"
          value={this.state.message}
          onChange={e => this.setState({message: e.target.value})}
        />
        <button type="submit" className="btn btn-success">
          Edit Message
        </button>
      </form>
    )
  }
}

export default EditMessageForm;
