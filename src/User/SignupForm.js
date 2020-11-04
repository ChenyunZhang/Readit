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
          <h1>Signup form</h1>
          {error ? error : null}
          <form onSubmit={handleSignup}>
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

            <input
              type="file"
              accept="image/*"
              multiple={false}
              id="upload-photo"
              onChange={(e) => setImageUrl(e.target.files[0])}
            />

            <br />

            <button className="ui button" type="submit">
              submit
            </button>
          </form>
          <div className="five wide column"></div>
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
