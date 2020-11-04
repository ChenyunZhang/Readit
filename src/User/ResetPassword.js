import React, { useState } from "react";

function ResetPassword() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [error, setError] = useState("");

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
        if (!!resp.message) {
          setError(resp.message);
        } else {

        }
      });
  };

  return (
    <>
      <div className="ui internally grid">
        <div className="five wide column"></div>
        <div className="six wide column">
          {error ? error : null}
          <p>Reset Password:</p>
          <form onSubmit={handleSubmit} className="ui form">
            <label htmlFor="token">Code:</label>
            <input
              required
              id="token"
              onChange={(e) => setToken(e.target.value)}
              name="token"
              placeholder="code"
              type="token"
              value={token}
            />

            <p>The code that was emailed to you. This is case-sensitive.</p>
            <label htmlFor="email">Email:</label>
            <input
              required
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="email"
              type="email"
              value={email}
            />

            <label htmlFor="password">New password:</label>
            <input
              required
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="password"
              type="password"
              value={password}
            />

            <p>Set your new password here.</p>
            <label htmlFor="password_confirmation">Confirm new password:</label>
            <input
              required
              id="password_confirmation"
              onChange={(e) => setPassword_confirmation(e.target.value)}
              name="password_confirmation"
              placeholder="password confirmation"
              type="password"
              value={password_confirmation}
            />

            <button type="submit" className="ui green basic button">
              Reset Password
            </button>
          </form>
        </div>
        <div className="five wide column"></div>
      </div>
    </>
  );
}

export default ResetPassword;
