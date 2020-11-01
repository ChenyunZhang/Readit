import { connect } from "react-redux";
import React, { useState } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import Nav from "../NavBar/NavBar"

function NewPostForm(props) {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const categoryArray = props.categoryInfo.categories;

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        category_id: category,
        user_id: props.userInfo.id,
        title,
        content,
      }),
    })
      .then((r) => r.json())
      .then((resp) => {
        props.addPost(resp);
        props.history.push("/userhome");
      });
  };

  return (
    <>
      <Nav />
      <div className="ui internally grid">
        <div className="five wide column"></div>
        <div className="six wide column">
          <form onSubmit={handleSubmit} className="ui form">
            <h1>Create new post form</h1>

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

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div className="five wide column"></div>
      </div>
    </>
  );
}

const addPost = (singlePost) => {
  return {
    type: "ADD_POST",
    payload: singlePost,
  };
};

let mapStateToProps = (globalState) => {
  return {
    categoryInfo: globalState.categoryInfo,
    userInfo: globalState.userInfo,
  };
};

let mapDispatch = {
  addPost: addPost,
};

export default connect(mapStateToProps, mapDispatch)(withRouter(NewPostForm));
