import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function PostObj(props) {
  // console.log(props.post);
  return (
    <React.Fragment>
      <Link to={`/posts/${props.post.id}`}>
      <div className="ui tall stacked segment">
        <p>{props.post.title}</p>
        <p>{props.post.content}</p>
        <p>{props.post.category.title}</p>
      </div>
      </Link>
    </React.Fragment>
  );
}

export default PostObj
