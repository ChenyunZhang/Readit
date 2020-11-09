import React from "react";
import Test from "../WordCloud/WordCloud";

function RankingContainer() {
  return (
    <>
      <div className="ui middle aligned divided list">
        <h1>Top reviewed books</h1>
        <Test />
      </div>
    </>
  );
}

export default RankingContainer;
