import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

function Profile() {

  const [email, setEmail] = useState("");
  const [username, setUsename] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    // fetch("http://localhost:3000/patch",{
    //   method: "POST",
    //   headers: {
    //       "Content-type": "Application/json"
    //   },
    //   body: JSON.stringify({
    //       email,
    //       password
    //   })
    // })
    // .then(r => r.json())
    // .then(resp => {
    //   if(resp.error){
    //     setError(resp.error)
    //   }else{
    //     props.setUserInfo(resp)
    //     localStorage.token = resp.token;
    //     props.history.push("/userhome")
    //   }
    // })
  };

  return (
    <>
      <Link className="ui button" to="/userhome">
        Back
      </Link>
      <div className="ui internally grid">
        <div className="five wide column"></div>
        <div className="six wide column">
          <form onSubmit={handleSubmit} className="ui form">
            <h1>Profile Update Form</h1>

            <label htmlFor="username">username</label>
            <input
              id="username"
              type="text"
              name="username"
              className="form-control"
              placeholder="username"
              autoComplete="off"
              required
              value={username}
              onChange={e => setUsename(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
            id="email"
            type="email"
            name="email"
            className="form-control"
            placeholder="email"
            autoComplete="off"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
            <input
            id="password"
            type="password"
            name="password"
            className="form-control"
            placeholder="password"
            autoComplete="off"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="ui button" type="submit">
          update
        </button>
          </form>
        </div>
        <div className="five wide column"></div>
      </div>
    </>
  );
}

export default Profile;
