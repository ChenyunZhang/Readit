import React from "react";
import { connect } from "react-redux";
import Nav from "../NavBar/NavBar";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";

function ShowPost(props) {
  const handleDeletePost = () => {
    confirmAlert({
      title: "Confirm to delete post",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch(`http://localhost:3000/posts/${props.currentPost.id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((deletedObj) => {
                // console.log(deletedObj);
                props.deletePost(deletedObj);
                props.history.push("/userhome");
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <>
      <Nav />
      <div className="ui internally grid">
        <div className="five wide column"></div>
        <div className="six wide column">
          <div className="ui card fluid">
            <div className="content">
              <div className="header">{props.currentPost.title}</div>
              <div className="meta">
                <div>{props.currentPost.category.title}</div>
              </div>
              <p>{props.currentPost.content}</p>
              {!!props.currentPost.image ? (
                <img
                  className="ui fluid image"
                  src={props.currentPost.image.url}
                />
              ) : null}

              {props.userInfo.id === props.currentPost.user.id ? (
                <Link
                  to={`/posts/edit/${props.currentPost.id}`}
                  className="ui basic teal button"
                >
                  edit
                </Link>
              ) : null}

              {props.userInfo.id === props.currentPost.user.id ? (
                <button
                  className="ui basic red button"
                  onClick={handleDeletePost}
                >
                  delete
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <div className="five wide column"></div>
      </div>
    </>
  );
}

let mapStateToProps = (gState) => {
  return {
    userInfo: gState.userInfo,
  };
};

let deletePost = (post) => {
  return {
    type: "DELETE_POST",
    payload: post,
  };
};

let mapDispatch = {
  deletePost: deletePost,
};

export default connect(mapStateToProps, mapDispatch)(ShowPost);
