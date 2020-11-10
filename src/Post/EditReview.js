import { connect } from "react-redux";
import React, { useState } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";

export const EditReview = (props) => {
  const [content, setContent] = useState(props.review.content);
  // const [imageUrl, setImageUrl] = useState(props.review.image);
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
          // props.history.push("/userhome");
        }
      });
  };

  return (
    <>
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

          {/* {imageUrl ? <img className="ui image" src={imageUrl.url} /> : null}
          <input
            type="file"
            accept="image/*"
            multiple={false}
            id="upload-photo"
            onChange={(e) => setImageUrl(e.target.files[0])}
          /> */}

          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
    </>
  );
};

const updatePost = (updateSinglePost) => {
  return {
    type: "UPDATE_POST",
    payload: updateSinglePost,
  };
};

let mapDispatch = {
    updatePost: updatePost
};

export default connect(null, mapDispatch)(withRouter(EditReview));
