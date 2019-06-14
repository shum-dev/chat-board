import React, { Component } from "react";

export default class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      profileImageUrl: null
    };
  }

  handleImgChange = e => {
    this.setState({profileImageUrl: e.target.files[0]});
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    let formData;
    let authType;
    //TODO: simplyfi in one row
    if(this.props.signUp) {
      authType = "signup";
      formData = new FormData();
      formData.append('email', this.state.email);
      formData.append("username", this.state.username);
      formData.append("password", this.state.password);
      formData.append("profileImageUrl", this.state.profileImageUrl);
    } else {
      authType = "signin";
      formData = {...this.state}
    }
    this.props.onAuth(authType, formData)
      .then(() => {
        this.props.history.push("/")
      })
      .catch(() => {
        return;
      })
    e.target.reset();
  }

  render() {
    const { heading, buttonText, signUp, errors, history, removeError } = this.props;

    history.listen(() => {
      removeError();
    });

    return (
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <h2>{heading}</h2>
              {errors.message && (<div className="alert alert-danger">{errors.message}</div>)}
              <label htmlFor="email">Email:</label>
              <input
                className="form-control"
                id="email"
                name="email"
                onChange={this.handleChange}
                type="text"
              />
              <label htmlFor="password">Password:</label>
              <input
                className="form-control"
                id="password"
                name="password"
                onChange={this.handleChange}
                type="password"
              />
              {signUp && (
                <div>
                  <label htmlFor="username">Username:</label>
                  <input
                    className="form-control"
                    id="username"
                    name="username"
                    onChange={this.handleChange}
                    type="text"
                  />
                  <label htmlFor="image-ava">Image:</label>
                  <input
                    className="form-control-file"
                    id="image-ava"
                    name="profileImageUrl"
                    onChange={this.handleImgChange}
                    type="file"
                  />
                </div>
              )}
              <button type="submit" className="btn btn-primary btn-block btn-lg">
                {buttonText}
              </button>
            </form>
         </div>
        </div>
      </div>
    )
  }
}
