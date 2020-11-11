import React, { useState } from "react";
import { connect } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
// import EditReview from "./EditReview";
import { Dropdown, Button, Header, Icon, Modal } from "semantic-ui-react";

function ReviewObj(props) {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = useState(props.review.content);

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
          props.createVoteup(resp);
          console.log(resp);
        });
    } else {
      console.log("a");
      // const voteupObj = props.voteups.filter((voteup) =>
      //   voteup.user.id === props.currentUser.id &&
      //   voteup.post.id === props.review.id)
      //   console.log(voteupObj)
      //   fetch(`http://localhost:3000/voteups/${voteupObj.id}`, {
      //       method: "DELETE"
      //   })
      //   .then(res => res.json())
      //   .then((deletedObj) => {
      //       props.deleteStoreFromState(deletedObj.id)
      //   })
    }
  };

  const handleVotedown = () => {
    console.log(props.review);
    if (!!localStorage.length > 0) {
      //     fetch("localhost:3000/voteups", {
      //       method: "POST",
      //       headers: {
      //           "Content-Type": "Application/json"
      //       },
      //       body: JSON.stringify({
      //         storeName: this.state.storeName,
      //         orders: this.state.orders
      //     })
      // })
      //     .then(r => r.json())
      //     .then()
    } else {
      alert("Please login to vote");
    }
  };
  console.log(
    props.voteups.filter(
      (voteup) =>
        voteup.user.id === props.currentUser.id &&
        voteup.post.id === props.review.id
    )
  );

  return (
    <>
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
          16
          {!!props.voteups.filter(
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
          <span className="vote" onClick={handleVotedown}>
            <i className="thumbs down icon"></i>
            downvote
          </span>
          <span className="right floated">
            <i className="comment icon"></i>
            reply
          </span>
        </div>
      </div>
    </>
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

// const createVoteup = (voteObj) => {
//   return {
//     type: "UPDATE_POST",
//     payload: updateSinglePost,
//   };
// }

let mapDispatch = {
  deletePost: deletePost,
  updatePost: updatePost,
  createVoteup: createVoteup 
};

export default connect(mapStateToProps, mapDispatch)(ReviewObj);
