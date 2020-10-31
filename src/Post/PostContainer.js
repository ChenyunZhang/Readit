import React from "react";
import { connect } from "react-redux";
import PostObj from "./PostObj";
import RankingContainer from "../Ranking/RankingContainer"

function PostContainer(props) {
  const postArray = props.postInfo.map((post) => {
    return <PostObj key={post.id} post={post} />;
  });

  return (
    <React.Fragment>
      <div className="ui internally grid">
        <div className="two wide column"></div>

        <div className="eight wide column">
          <h1>Popular Posts</h1>
          {postArray}
        </div>
        
        <div className="four wide column">
          <RankingContainer />
        </div>
        
        <div className="two wide column"></div>
      </div>
    </React.Fragment>
  );
}

let mapStateToProps = (globalState) => {
  return {
    postInfo: globalState.postsInfo.posts,
  };
};

export default connect(mapStateToProps)(PostContainer);
