import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

function SignupForm(props) {
  const [email, setEmail] = useState("");
  const [username, setUsename] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const handleSignup = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    if (imageUrl) {
      formData.append("avatar", imageUrl);
    }

    fetch("http://localhost:3000/users", {
      method: "POST",
      body: formData,
    })
      .then((r) => r.json())
      .then((resp) => {
        // console.log(resp)
        if (resp.error) {
          setError(resp.error);
        } else {
          props.setUserInfo(resp);
          localStorage.token = resp.token;
          props.history.push("/userhome");
        }
      });
  };

  return (
    <React.Fragment>
      <div className="ui internally grid">
        <div className="five wide column"></div>
        <div className="six wide column">
          <div className="ui cotainer login-in-container">
            <form onSubmit={handleSignup} className="ui form">
              <div className="login-form-title">Read it</div>
              {error ? <div className="error-message">{error}</div> : null}
              <br/>
              <div className="ui fluid big input left icon username">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="username"
                  autoComplete="off"
                  required
                  value={username}
                  onChange={(e) => setUsename(e.target.value)}
                />
                <i className="user icon" />
              </div>
              <div className="ui fluid big left icon input">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="email"
                  autoComplete="off"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i className="envelope icon" />
              </div>

              <div className="ui fluid big left icon input login-form-password">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="password"
                  autoComplete="off"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i className="key icon" />
              </div>

              <label
                htmlFor="signup-avatar"
                class="ui blue big basic button fluid"
              >
                {!imageUrl ? `Upload avatar` : `Uploaded one image`}
              </label>
              <input
                type="file"
                id="signup-avatar"
                className="inputfile"
                accept="image/*"
                multiple={false}
                onChange={(e) => setImageUrl(e.target.files[0])}
              />

              <br />

              <button
                className="ui fluid big teal button login-form-submi"
                type="submit"
              >
                Sign Up
              </button>
            </form>
            <div className="five wide column"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

let setUserInfo = (userInfo) => {
  return {
    type: "SET_USER_INFO",
    payload: userInfo,
  };
};

let mapDispatch = {
  setUserInfo: setUserInfo,
};

export default connect(null, mapDispatch)(withRouter(SignupForm));
