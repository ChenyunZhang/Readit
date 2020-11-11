import React from "react";
import { connect } from "react-redux";
import BookObj from "./BookObj";
import RankingContainer from "../Ranking/RankingContainer";
// import Temp from "../Trending/Temp"

function BookContainer(props) {
  const bookArray = props.bookInfo.map((book) => {
    return <BookObj key={book.id} book={book} />;
  });

  const sortedBook = props.bookInfo ? props.bookInfo.sort((a,b) => b.posts.length - a.posts.length) : null
  const topTenBook = sortedBook.slice(0,10)

  const rankingArray = topTenBook.map((book) => {
    return <RankingContainer key={book.id} book={book} />;
  });

  return (
    <React.Fragment>
      <div className="ui internally grid book-container">
        <div className="two wide column"></div>

        <div className="eight wide column">
          <div className="sub-header">Popular Books</div>
          {bookArray}
        </div>

        <div className="four wide column rankking-Array">
          <div className="sticky-bar">
          <div className="sub-header top-reviewed">Top reviewed books</div>
          <div className="ui segments">
            {rankingArray}
            </div>
          </div>
        </div>

        <div className="two wide column"></div>
      </div>
    </React.Fragment>
  );
}

let mapStateToProps = (globalState) => {
  return {
    bookInfo: globalState.bookInfo.books,
  };
};

export default connect(mapStateToProps)(BookContainer);
