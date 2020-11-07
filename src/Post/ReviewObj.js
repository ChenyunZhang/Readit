import React, { useState } from "react";
import { connect } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import EditReview from './EditReview'

function ReviewObj(props) {
    const [showUpdateForm, setShowUpdateForm] = useState(false)

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
      {props.review.content}

      <div>
        {props.review.user.id === props.currentUser.id ?
        <button 
        className="ui basic red button"
        onClick={handleDeleteReview}
        >Delete</button>
        :
        null}
        {props.review.user.id === props.currentUser.id ?
        <button 
        className="ui basic blue button"
        onClick={e => setShowUpdateForm(preState => !preState)}
        >Update</button>
        :
        null}
        {showUpdateForm ?
        <EditReview 
        review={props.review}
        />
        :
        null
        }
      </div>
      {props.review.image ? 
      <img className="ui small image" src={props.review.image.url}/>
      :
      null}
      <hr />
    </>
  );
}

let mapStateToProps = (gState) => {
  return {
    currentUser: gState.userInfo,
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


export default connect(mapStateToProps,mapDispatch)(ReviewObj);
