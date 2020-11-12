import React, { useState } from "react";
import { connect } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
// import EditReview from "./EditReview";
import { Dropdown, Header, Modal } from "semantic-ui-react";

function ReviewObj(props) {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = useState(props.review.content);
  const [error, setError] = useState("");

  // console.log(props.voteups);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    // if (imageUrl !== props.review.image) {
    //   formData.append("image", imageUrl);
    // }

    fetch(`http://localhost:3000/posts/edit/${props.review.id}`, {
      method: "PATCH",
      body: formData,
    })
      .then((r) => r.json())
      .then((resp) => {
        if (resp.error) {
          console.log(resp.error);
        } else {
          props.updatePost(resp);
          setOpen(false);
          // props.history.push("/userhome");
        }
      });
  };

  const handleDeleteReview = () => {
    confirmAlert({
      title: "Confirm to delete post",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch(`http://localhost:3000/posts/${props.review.id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((deletedObj) => {
                props.deletePost(deletedObj);
                // props.history.push("/userhome");
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleVoteup = () => {
    if (!!localStorage.length <= 0) {
      alert("Please login to vote");
    } else if (!props.voteups.filter(vote => vote.post_id === props.review.id)[0]) {
      fetch("http://localhost:3000/voteups", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          post_id: props.review.id,
          user_id: props.currentUser.id,
        }),
      })
        .then((r) => r.json())
        .then((resp) => {
          if(resp.error){
            setError(resp.error)
          }else{
            props.createVoteup(resp);
          }
        });
    } else if (
      !props.voteups.filter(
        (voteup) =>
          voteup.user.id === props.currentUser.id &&
          voteup.post.id === props.review.id
      )[0]
    ) {
      fetch("http://localhost:3000/voteups", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          post_id: props.review.id,
          user_id: props.currentUser.id,
        }),
      })
        .then((r) => r.json())
        .then((resp) => {
          if(resp.error){
            setError(resp.error)
          }else{
            props.createVoteup(resp);
          }
        });
    } else {
      const voteObj =props.voteups.filter(vote => vote.post_id === props.review.id && vote.user.id === props.currentUser.id)[0]
        fetch(`http://localhost:3000/voteups/${voteObj.id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then((deletedObj) => {
          props.deleteVoteup(deletedObj)
        })
    }
  };

  const handleVotedown = () => {
    if (!!localStorage.length <= 0) {
      alert("Please login to vote");
    } else if (!props.votedowns.filter(vote => vote.post_id === props.review.id)[0]) {
      fetch("http://localhost:3000/votedowns", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          post_id: props.review.id,
          user_id: props.currentUser.id,
        }),
      })
        .then((r) => r.json())
        .then((resp) => {
          if(resp.error){
            setError(resp.error)
          }else{
            props.createVotedown(resp);
          }
        });
    } else if (
      !props.votedowns.filter(
        (votedown) =>
          votedown.user.id === props.currentUser.id &&
          votedown.post.id === props.review.id
      )[0]
    ) {
      fetch("http://localhost:3000/votedowns", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          post_id: props.review.id,
          user_id: props.currentUser.id,
        }),
      })
        .then((r) => r.json())
        .then((resp) => {
          if(resp.error){
            setError(resp.error)
          }else{
            props.createVotedown(resp);
          }
        });
    } else {
      const voteObj =props.votedowns.filter(vote => vote.post_id === props.review.id && vote.user.id === props.currentUser.id)[0]
        fetch(`http://localhost:3000/votedowns/${voteObj.id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then((deletedObj) => {
          props.deleteVotedown(deletedObj)
        })
    }
  };

  return (
    <React.Fragment>
      {error ? error : null}
      <div className="ui fluid card">
        <div className="content">
          {props.review.user.avatar ? (
            <img
              className="ui avatar image"
              src={props.review.user.avatar.url}
            />
          ) : (
            <i className="user outline icon"></i>
          )}
          <span>{props.review.user.username}</span>
          <span className="right floated">
            {props.review.user.id === props.currentUser.id ? (
              <Dropdown>
                <Dropdown.Menu>
                  <Dropdown.Item
                    icon="edit"
                    text={
                      <Modal
                        basic
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        size="small"
                        trigger={<span>edit</span>}
                      >
                        <Header icon>Edit Review</Header>
                        <Modal.Content>
                          <form onSubmit={handleSubmit} className="ui form">
                            <label htmlFor="content">What did you think</label>
                            <textarea
                              id="content"
                              className="field"
                              type="text"
                              placeholder="Enter you review"
                              autoComplete="off"
                              required
                              row="3"
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
                            ></textarea>

                            <button
                              type="submit"
                              className="ui button fluid inverted blue"
                            >
                              Update
                            </button>
                          </form>
                        </Modal.Content>
                      </Modal>
                    }
                  />
                  <Dropdown.Item
                    icon="trash"
                    text="Delete"
                    onClick={handleDeleteReview}
                  />
                </Dropdown.Menu>
              </Dropdown>
            ) : null}
          </span>
        </div>
        <div className="content">{props.review.content}</div>
        <div className="content">

          {(props.voteups.filter(voteup => voteup.post.id === props.review.id).length) - (props.votedowns.filter(votedown => votedown.post.id === props.review.id).length)}

          {props.voteups.filter(voteup => voteup.post.id === props.review.id)[0] ?
            <>
            {props.voteups.filter(
              (voteup) =>
                voteup.user.id === props.currentUser.id &&
                voteup.post.id === props.review.id
            )[0] ? (
              <span className="vote voted" onClick={handleVoteup}>
                <i className="thumbs up red icon"></i>
                upvote
              </span>
            ) : (
              <span className="vote" onClick={handleVoteup}>
                <i className="thumbs up outline icon"></i>
                upvote
              </span>
            )}
            </>
          : 
          <span className="vote" onClick={handleVoteup}>
          <i className="thumbs up outline icon"></i>
          upvote
          </span>}

          {props.votedowns.filter(votedown => votedown.post.id === props.review.id)[0] ?
            <>
            {props.votedowns.filter(
              (votedown) =>
                votedown.user.id === props.currentUser.id &&
                votedown.post.id === props.review.id
            )[0] ? (
              <span className="vote voted" onClick={handleVotedown}>
                <i className="thumbs down red icon"></i>
                downvote
              </span>
            ) : (
              <span className="vote" onClick={handleVotedown}>
                <i className="thumbs down outline icon"></i>
                downvote
              </span>
            )}
            </>
          : 
          <span className="vote" onClick={handleVotedown}>
          <i className="thumbs down outline icon"></i>
          downvote
          </span>}

          {/* <span className="right floated">
            <i className="comment icon"></i>
            reply
          </span> */}
        </div>
      </div>
    </React.Fragment>
  );
}

let mapStateToProps = (gState) => {
  return {
    currentUser: gState.userInfo,
    allBooks: gState.bookInfo.books,
    voteups: gState.voteups.voteups,
    votedowns: gState.votedowns.votedowns,
  };
};

let deletePost = (post) => {
  return {
    type: "DELETE_POST",
    payload: post,
  };
};

const updatePost = (updateSinglePost) => {
  return {
    type: "UPDATE_POST",
    payload: updateSinglePost,
  };
};

const createVoteup = (voteObj) => {
  return {
    type: "ADD_VOTEUP",
    payload: voteObj,
  };
};

const deleteVoteup = (voteObj) => {
  return {
    type: "DELETE_VOTEUP",
    payload: voteObj,
  };
}

const createVotedown = (voteObj) => {
  return {
    type: "ADD_VOTEDOWN",
    payload: voteObj,
  };
};

const deleteVotedown = (voteObj) => {
  return {
    type: "DELETE_VOTEDOWN",
    payload: voteObj,
  };
}

let mapDispatch = {
  deletePost: deletePost,
  updatePost: updatePost,
  createVoteup: createVoteup,
  deleteVoteup: deleteVoteup,
  createVotedown: createVotedown,
  deleteVotedown: deleteVotedown
};

export default connect(mapStateToProps, mapDispatch)(ReviewObj);
