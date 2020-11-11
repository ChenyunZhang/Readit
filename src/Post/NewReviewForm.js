import { connect } from "react-redux";
import React, { useState } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";

function NewReviewForm(props) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("book_id", props.book.id);
    formData.append("content", content);
    formData.append("user_id", props.userInfo.id);
    // if (!!imageUrl) {
    //   formData.append("image", imageUrl);
    // }

    if (props.userInfo.token) {
      fetch("http://localhost:3000/posts", {
        method: "POST",
        body: formData,
      })
        .then((r) => r.json())
        .then((resp) => {
          if (resp.error) {
            setError(resp.error);
          } else {
            props.addPost(resp);
            // props.history.push("/userhome");
          }
        });
    } else {
      setError("You need to login to review");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="ui form">
        {error ? <div className="error-message">{error}</div> : null}
        <label htmlFor="content">What did you think</label>
        <textarea
          id="content"
          className="field"
          type="text"
          placeholder="enter your review"
          autoComplete="off"
          required
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

const addPost = (singlePost) => {
  return {
    type: "ADD_POST",
    payload: singlePost,
  };
};

let mapStateToProps = (gState) => {
  return {
    userInfo: gState.userInfo,
  };
};

let mapDispatch = {
  addPost: addPost,
};

export default connect(mapStateToProps, mapDispatch)(withRouter(NewReviewForm));

        {/* <label htmlFor="category">Category</label>
            <select
            id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              {categoryArray.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select> */}