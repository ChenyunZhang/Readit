import React from "react";
import { connect } from "react-redux";
import TrendingObj from "./TrendingObj";

function TrendingContainer(props) {
  let num1 = Math.floor(Math.random() * 34);
  // let num2 = Math.floor(Math.random() * 10) + 10;
  // let num3 = Math.floor(Math.random() * 10) + 20;
  // let num4 = Math.floor(Math.random() * 10) + 30;
  //   Math.random() * (max - min) + min
  // Math.floor(Math.random() * (max - min) + min);
  const selectionArray = props.bookInfo.slice(num1, num1 + 15);
  const trendingArray = selectionArray.map((book) => (
    <TrendingObj key={book.id} bookInfo={book} />
  ));
  return (
    <>
      <div className="ui internally grid trending-container">
        <div className="two wide column"></div>
        <div className="twelve wide column">
          <div className="headers">Editor's Pick</div>
          <div className="scrollmenu">
            {trendingArray}
          </div>
        </div>
        <div className="two wide column"></div>
      </div>
    </>
  );
}

const mapStateToProps = (gState, ownProps) => {
  return {
    bookInfo: gState.bookInfo.books,
    userInfo: gState.userInfo,
  };
};
export default connect(mapStateToProps)(TrendingContainer);
