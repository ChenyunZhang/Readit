import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/login",{
      method: "POST",
      headers: {
          "Content-type": "Application/json"
      },
      body: JSON.stringify({
          email,
          password
      })
    })
    .then(r => r.json())
    .then(resp => {
      if(resp.error){
        setError(resp.error)
      }else{
        props.setUserInfo(resp)
        localStorage.token = resp.token;
        props.history.push("/userhome")
      }
    })
  };

  return (
    <React.Fragment>
      <div className="ui internally grid">
        <div className="five wide column"></div>
        <div className="six wide column">
        
          <form onSubmit={handleSubmit} className="ui form">
          <h1>Login Form</h1>
          {error ? error : null }
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
            <button className="ui button" type="submit">
              submit
            </button>
          </form>
          <Link to="/"> back </Link>

      </div>

      <div className="five wide column"></div>
      </div>
      
    </React.Fragment>
  );
}

let setUserInfo = (user) => {
  return {
      type: "SET_USER_INFO",
      payload: user
  }
}

let mapDispatch = {
  setUserInfo: setUserInfo
}


export default connect(null, mapDispatch)(withRouter(LoginForm));
