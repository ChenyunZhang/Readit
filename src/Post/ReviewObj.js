import React, { useState } from "react";
import { connect } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
// import EditReview from "./EditReview";
import { Dropdown, Button, Header, Icon, Modal  } from "semantic-ui-react";

function ReviewObj(props) {
  const [open, setOpen] = React.useState(false)
  const [content, setContent] = useState(props.review.content);
  const [error, setError] = useState("");

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
          setError(resp.error);
        } else {
          props.updatePost(resp);
          setOpen(false)
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

  return (
    <>
      <div className="ui fluid card">
        <div className="content">
          {props.review.user.avatar ? (
            <img class="ui avatar image" src={props.review.user.avatar.url} />
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
                      size='small'
                      trigger={<span>edit</span>}
                    >
                      <Header icon>
                        Edit Review
                      </Header>
                      <Modal.Content>
                      <form onSubmit={handleSubmit} className="ui form">
                          {error ? <h3>{error}</h3> : null}
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

                          <button type="submit" className="btn btn-primary">
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
          <i className="caret up icon"></i>
          upvote
          <i className="caret down icon"></i>
          downvote
        </div>
      </div>
      {/* {showUpdateForm ? <EditReview review={props.review} /> : null} */}

      {props.review.image ? (
        <img className="ui small image" src={props.review.image.url} />
      ) : null}
      <hr />
    </>
  );
}

let mapStateToProps = (gState) => {
  return {
    currentUser: gState.userInfo,
    allBooks: gState.bookInfo.books,
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

let mapDispatch = {
  deletePost: deletePost,
  updatePost: updatePost
};

export default connect(mapStateToProps, mapDispatch)(ReviewObj);
