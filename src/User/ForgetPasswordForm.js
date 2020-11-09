import React, { useState } from "react";

function ForgetPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/password_resets", {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((r) => r.json())
      .then((resp) => {
        if (resp.message) {
          setMessage(resp.message);
        }
      })
      .catch(console.log);
  };

  return (
    <>
      <div className="ui internally grid">
        <div className="five wide column"></div>
        <div className="six wide column">
          <div className="ui cotainer login-in-container">
            <form className="ui form" onSubmit={handleReset}>
              <div className="login-form-title">Forget Password</div>
              {message ? <div className="error-message">{message}</div> : null}
              <br/>
              <label htmlFor="email" className="confirmlabel">
                Email
              </label>
              <div className="ui fluid big input left icon forget-email">
                <input
                  id="email"
                  placeholder="email"
                  autoComplete="off"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i className="envelope icon" />
              </div>

              <button type="submit" className="ui teal big fluid button">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="five wide column"></div>
      </div>
    </>
  );
}

export default ForgetPasswordForm;
