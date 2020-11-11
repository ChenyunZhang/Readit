import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";
// import FacebookLoginButton from "./FacebookLoginButton"

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => r.json())
      .then((resp) => {
        if (resp.error) {
          setError(resp.error);
        } else {
          props.setUserInfo(resp);
          localStorage.token = resp.token;
          props.history.push("/userhome");
        }
      });
  };

  // console.log(error)

  return (
    <React.Fragment>
      <div className="ui internally grid">
        <div className="five wide column"></div>
        <div className="six wide column">
          <div className="ui cotainer login-in-container">
            <form onSubmit={handleSubmit} className="ui form">
              <div className="login-form-title">Read it</div>
              {error ? <div className="error-message">{error}</div> : null}
              <br />
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
              <Link to="/resetpassword" className="forget-password">
                Forget password?
              </Link>
              <br />
              <button
                className="ui fluid big teal button login-form-submit"
                type="submit"
              >
                Login
              </button>
              <div className="line">OR</div>
              <GoogleLoginButton />
            </form>
          </div>
          {/* <OAuthSignInButton /> */}

          <div className="five wide column"></div>
        </div>
      </div>
    </React.Fragment>
  );
}

let setUserInfo = (user) => {
  return {
    type: "SET_USER_INFO",
    payload: user,
  };
};

let mapDispatch = {
  setUserInfo: setUserInfo,
};

export default connect(null, mapDispatch)(withRouter(LoginForm));
