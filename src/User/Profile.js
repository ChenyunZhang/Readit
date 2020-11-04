import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import PostObj from "../Post/PostObj";

function Profile(props) {
  const [email, setEmail] = useState(props.userInfo.email);
  const [username, setUsename] = useState(props.userInfo.username);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState(props.userInfo.avatar);

  // console.log(props.userInfo.id);
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    if (avatar !== props.userInfo.avatar) {
      formData.append("avatar", avatar);
    }

    fetch(`http://localhost:3000/users/${props.userInfo.id}`, {
      method: "PATCH",
      body: formData,
    })
      .then((r) => r.json())
      .then((resp) => {
        if (resp.error) {
          setError(resp.error);
        } else {
          props.updateUserInfo(resp);
          // props.history.push("/userhome");
        }
      });
  };

  const handleDeleteAccount = () => {
    confirmAlert({
      title: "Confirm to delete account",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch(`http://localhost:3000/users/${props.userInfo.id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((deletedObj) => {
                props.deleteUser(deletedObj);
                localStorage.clear();
                props.history.push("/");
              });
          },
        },
        {
          label: "No",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  let userPostArray = props.postsInfo.posts
    .filter((post) => post.user.id === props.userInfo.id)
    .map((postObj) => <PostObj key={postObj.id} post={postObj} />);

  return (
    <>
      <div className="ui internally grid">
        <div className="two wide column"></div>
        <div className="six wide column">
          <form onSubmit={handleSubmit} className="ui form">
            <h1>Profile Update Form</h1>
            {error ? error : null}
            <br />

            {avatar ? (
              <img className="ui small image" src={avatar.url} />
            ) : (
              `Avatar`
            )}
            <input
              type="file"
              accept="image/*"
              multiple={false}
              id="upload-photo"
              onChange={(e) => setAvatar(e.target.files[0])}
            />

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
              onChange={(e) => setUsename(e.target.value)}
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

            <label htmlFor="password">password</label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-control"
              placeholder="new password must be at least 6 characters long"
              autoComplete="off"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="ui button" type="submit">
              update
            </button>
          </form>
          <br />
          <button
            className="ui red button"
            type="delete account"
            onClick={handleDeleteAccount}
          >
            delete account
          </button>
        </div>
        <div className="six wide column">{userPostArray}</div>
        <div className="two wide column"></div>
      </div>
    </>
  );
}

let updateUserInfo = (user) => {
  // console.log(user);
  return {
    type: "UPDATE_USER_INFO",
    payload: user,
  };
};

let deleteUser = (user) => {
  return {
    type: "LOG_OUT",
    payload: user,
  };
};

let mapDispatch = {
  updateUserInfo: updateUserInfo,
  deleteUser: deleteUser,
};

const mapStateToProps = (gState) => {
  return {
    userInfo: gState.userInfo,
    postsInfo: gState.postsInfo,
  };
};

export default connect(mapStateToProps, mapDispatch)(withRouter(Profile));
