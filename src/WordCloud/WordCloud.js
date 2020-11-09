import React from "react";
import ReactWordcloud from "react-wordcloud";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const words = [
  {
    text: "told",
    value: 64,
  },
  {
    text: "mistake",
    value: 11,
  },
  {
    text: "thought",
    value: 16,
  },
  {
    text: "bad",
    value: 17,
  },
  {
    text: "told",
    value: 164,
  },
  {
    text: "mistake",
    value: 211,
  },
  {
    text: "thought",
    value: 16,
  },
  {
    text: "bad",
    value: 17,
  },
  {
    text: "told",
    value: 234,
  },
  {
    text: "mistake",
    value: 111,
  },
  {
    text: "thought",
    value: 1226,
  },
  {
    text: "bad",
    value: 1137,
  },
  {
    text: "told",
    value: 643,
  },
  {
    text: "mistake",
    value: 211,
  },
  {
    text: "thought",
    value: 116,
  },
  {
    text: "bad",
    value: 17,
  },
  {
    text: "told",
    value: 64,
  },
  {
    text: "mistake",
    value: 11,
  },
  {
    text: "thought",
    value: 16,
  },
  {
    text: "bad",
    value: 17,
  },
  {
    text: "told",
    value: 64,
  },
  {
    text: "mistake",
    value: 11,
  },
  {
    text: "thought",
    value: 16,
  },
  {
    text: "bad",
    value: 17,
  },
];

function SimpleWordcloud(props) {
  console.log(props)
  return <ReactWordcloud words={words} />;
}

let mapStateToProps = (gState) => {
  return {
    allPosts: gState.postsInfo.posts,
    allBooks: gState.bookInfo.books
  };
};

export default connect(mapStateToProps)(withRouter(SimpleWordcloud));

