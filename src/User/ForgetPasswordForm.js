import React, { useState } from "react";

function ForgetPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("")

  const handleReset = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/password_resets", {
        method: "POST",
        headers: {
            "Content-type": "Application/json"
        },
        body: JSON.stringify({
            email
        })
    })
    .then(r => r.json())
    .then(resp => {
        if (resp.message){
            setMessage(resp.message)
        }
    })
    .catch(console.log)
  };

  return (
    <>
      <div className="ui internally grid">
        <div className="five wide column"></div>
        <div className="six wide column">
          <h1>Forgot Password</h1>
          {message ? <h2>{message}</h2> : null}
          <form className="ui form" onSubmit={handleReset}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="email"
              autoComplete="off"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" className="ui blue basic button">
              Submit
            </button>
          </form>
        </div>
        <div className="five wide column"></div>
      </div>
    </>
  );
}

export default ForgetPasswordForm;
