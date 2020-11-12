import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import ProfileReadingBookObj from "./ProfileReadingBookObj";

function Profile(props) {
  const [email, setEmail] = useState(props.userInfo.email);
  const [username, setUsename] = useState(props.userInfo.username);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState(props.userInfo.avatar);
  const [sortProfileBook, setProfileBook] = useState("");

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
        // console.log(resp);
        if (resp.error) {
          setError(resp.error);
        } else {
          props.updateUserInfo(resp);
          alert("Successfully Updated");
          setPassword("");
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

  const handSubmitedImage = (e) => {
    setAvatar(e.target.files[0]);
    // previewImage = URL.createObjectURL(avatar)
  };

  const profileReview = props.postsInfo.filter(
    (review) => review.user.id === props.userInfo.id
  );

  let tempArr = [];
  profileReview.filter((r) => {
    if (tempArr.length === 0) {
      tempArr.push(r);
    } else if (!tempArr.map((temp) => temp.book.id).includes(r.book.id)) {
      tempArr.push(r);
    }
  });

  // console.log(tempArr.map((temp) => temp.book.title));
  if (sortProfileBook === "author") {
    tempArr.sort(function (a, b) {
      return a.book.book_author < b.book.book_author ? 1 : -1;
    });
  } else if (sortProfileBook === "book") {
    tempArr.sort(function (a, b) {
      return a.book.title > b.book.title ? 1 : -1;
    });
  } else if (sortProfileBook === "oldest") {
    tempArr.sort(function (a, b) {
      return a.book.created_at < b.book.created_at ? 1 : -1;
    });
  } else if (sortProfileBook === "newest") {
    tempArr = tempArr;
  }
  // console.log(tempArr.map((temp) => temp.book.title));

  const profileReviewArray = tempArr.map((reviewObj) => (
    <ProfileReadingBookObj key={reviewObj.id} reviewObj={reviewObj} />
  ));

  return (
    <>
      <div className="ui internally grid">
        <div className="one wide column"></div>
        <div className="four wide column profile">
          {/* <div className="ui internally celled grid">
            <div className="three wide column"></div>
            <div className="ten wide column"> */}
          <form onSubmit={handleSubmit} className="ui form">
            <label
              htmlFor="embedpollfileinput"
              className="image"
              id="profile-image"
            >
              {props.userInfo.avatar ? (
                <div className="profile-image-container">
                  <img src={props.userInfo.avatar.url} />
                  <i className="fa fa-edit"></i>
                </div>
              ) : (
                <div className="profile-image-container">
                  <img src="https://cdn.onlinewebfonts.com/svg/img_184513.png" />
                  <i className="fa fa-edit"></i>
                </div>
              )}
            </label>
            {error ? <div className="error-message">{error}</div> : null}
            <br />
            <input
              type="file"
              accept="image/*"
              multiple={false}
              className="inputfile"
              id="embedpollfileinput"
              onChange={handSubmitedImage}
            />

            <label htmlFor="username">Username</label>
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

            <label htmlFor="password">Password</label>
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
            <br />

            <button className="ui blue button" type="submit">
              Update profile
            </button>
          </form>

          <br />
          <button
            className="ui red button"
            type="delete account"
            onClick={handleDeleteAccount}
          >
            Delete account
          </button>
        </div>
        <div className="ten wide column profile-book-page">
          <h2>My Books</h2>
          <select
            className="ui search dropdown"
            onChange={(e) => setProfileBook(e.target.value)}
          >
            <option value="newest">Newest reviewed</option>
            <option value="oldest">Oldest reviewed</option>
            <option value="author">Author name</option>
            <option value="book">Book name</option>
          </select>

          <hr />
          <div className="ui five cards">{profileReviewArray}</div>
        </div>
        <div className="one wide column"></div>
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
    postsInfo: gState.postsInfo.posts,
  };
};

export default connect(mapStateToProps, mapDispatch)(withRouter(Profile));
