import { connect } from "react-redux";
import React, { useState } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import Nav from "../NavBar/NavBar";

export const EditPost = (props) => {
//   console.log(props.currentPost.category.title);
  const [category, setCategory] = useState(props.currentPost.category.id);
  const [title, setTitle] = useState(props.currentPost.title);
  const [content, setContent] = useState(props.currentPost.content);
  const [imageUrl, setImageUrl] = useState(props.currentPost.image);
  const [error, setError] = useState("");

  const categoryArray = props.categoryInfo.categories;

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category_id", category);
    formData.append("user_id", props.userInfo.id);
    if (imageUrl !== props.currentPost.image) {
      formData.append("image", imageUrl);
    }

    fetch(`http://localhost:3000/posts/edit/${props.currentPost.id}`, {
      method: "PATCH",
      body: formData,
    })
      .then((r) => r.json())
      .then((resp) => {
        if (resp.error) {
          setError(resp.error);
        } else {
          props.updatePost(resp);
          props.history.push("/userhome");
        }
      });
  };

  return (
    <>
      <Nav />
      <div className="ui internally grid">
        <div className="five wide column"></div>
        <div className="six wide column">
          <form onSubmit={handleSubmit} className="ui form">
            <h1>Update Post </h1>
            {error ? <h3>{error}</h3> : null}
            <label htmlFor="category">Category</label>
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
            </select>

            <br />

            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="title"
              autoComplete="off"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              className="field"
              type="text"
              placeholder="content"
              autoComplete="off"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            {imageUrl ? <img className="ui image" src={imageUrl.url} /> : null}
            <input
              type="file"
              accept="image/*"
              multiple={false}
              id="upload-photo"
              onChange={(e) => setImageUrl(e.target.files[0])}
            />

            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
        <div className="five wide column"></div>
      </div>
    </>
  );
};

const updatePost = (updateSinglePost) => {
  return {
    type: "UPDATE_POST",
    payload: updateSinglePost,
  };
};

let mapStateToProps = (globalState) => {
  return {
    categoryInfo: globalState.categoryInfo,
    userInfo: globalState.userInfo,
  };
};

let mapDispatch = {
    updatePost: updatePost
};

export default connect(mapStateToProps, mapDispatch)(withRouter(EditPost));
