import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

function ResetPassword(props) {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [error, setError] = useState("");

  console.log(props);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/reset_password", {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        email,
        token,
        password,
        password_confirmation,
      }),
    })
      .then((r) => r.json())
      .then((resp) => {
        setError(resp.message);
        if (resp.message === "Your password has been successfuly reset!") {
          setTimeout(function () {
            props.history.push("/login");
          }, 3000);
          setToken("");
          setEmail("");
          setPassword("");
        }
      });
  };

  return (
    <>
      <div className="ui internally grid">
        <div className="five wide column"></div>
        <div className="six wide column">
          <div className="ui cotainer login-in-container">
            <form onSubmit={handleSubmit} className="ui form">
              <div className="login-form-title">Reset Password</div>
              {error ? <div className="error-message">{error}</div> : null}

              <label htmlFor="token" className="confirmlabel">
                The code that was emailed to you. This is case-sensitive.
              </label>
              <div className="ui fluid big input left icon username">
                <input
                  required
                  id="token"
                  onChange={(e) => setToken(e.target.value)}
                  name="token"
                  autoComplete="off"
                  placeholder="code"
                  type="token"
                  value={token}
                />
                <i className="shield alternate icon" />
              </div>

              <label htmlFor="email" className="confirmlabel">Email:</label>
              <div className="ui fluid big input left icon username">
                <input
                  required
                  id="email"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  placeholder="email"
                  type="email"
                  value={email}
                />
                <i className="envelope icon" />
              </div>

              <label htmlFor="password" className="confirmlabel">New password:</label>
              <div className="ui fluid big input left icon username">
                <input
                  required
                  id="password"
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  placeholder="Set your new password here."
                  type="password"
                  value={password}
                />
                <i className="key icon" />
              </div>

              <label htmlFor="password_confirmation" className="confirmlabel">
                Confirm new password:
              </label>
              <div className="ui fluid big input left icon password-confirmation">
                <input
                  required
                  autoComplete="off"
                  id="password_confirmation"
                  onChange={(e) => setPassword_confirmation(e.target.value)}
                  name="password_confirmation"
                  placeholder="password confirmation"
                  type="password"
                  value={password_confirmation}
                />
                <i className="key icon" />
              </div>

              <button type="submit" className="ui fluid teal button reset-password">
                Reset Password
              </button>
            </form>
          </div>
        </div>
        <div className="five wide column"></div>
      </div>
    </>
  );
}

export default withRouter(ResetPassword);
