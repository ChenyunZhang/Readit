import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function PostObj(props) {
  return (
    <React.Fragment>
      <Link to={`/posts/${props.ownProps.post.id}`} className="custom-link">
        <div className="ui tall stacked segment">
          <div className="content">
            {!!props.ownProps.post.user.avatar ? (
                <img
                  className="right floated avatar mini ui image"
                  src={props.ownProps.post.user.avatar.url}
                />
              )
             : null}
            <div className="header">{props.ownProps.post.title}</div>
            <div className="meta">{props.ownProps.post.category.title}</div>
            <div className="ui segment">
              {props.post.content}
              {/* </div>
            <div className="content"> */}
              {!!props.ownProps.post.image ? (
                <img className="ui image" src={props.ownProps.post.image.url} />
              ) : null}
            </div>
          </div>
        </div>
      </Link>
    </React.Fragment>
  );
}

const mapStateToProps = (gState, ownProps) => {
  return {
    postsInfo: gState.postsInfo,
    ownProps: ownProps,
    userInfo: gState.userInfo,
  };
};

export default connect(mapStateToProps)(PostObj);
