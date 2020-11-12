import React, { useState } from "react";
import { connect } from "react-redux";
import BookObj from "./BookObj";
import RankingContainer from "../Ranking/RankingContainer";
// import Temp from "../Trending/Temp"

function BookContainer(props) {
  const sortedBook = props.bookInfo
    ? props.bookInfo.sort((a, b) => b.posts.length - a.posts.length)
    : null;
  const topTenBook = sortedBook.slice(0, 10);

  const rankingArray = topTenBook.map((book) => {
    return <RankingContainer key={book.id} book={book} />;
  });

  const [homeFilter, setHomeFilter] = useState("Sort by");
  let filterBook = ["Sort by"];

  props.bookInfo.filter((book) => {
    if (filterBook.length === 0) {
      filterBook.push(book.category);
    } else if (!filterBook.includes(book.category) && book.category !== null) {
      filterBook.push(book.category);
    }
  });

  let sortArray = props.bookInfo.sort(function (a, b) {
    return a.category > b.category ? 1 : -1;
  });

  if (homeFilter !== "Sort by") {
    sortArray = sortArray.filter((book) => book.category === homeFilter);
  }

  const bookArray = sortArray.map((book) => {
    return <BookObj key={book.id} book={book} />;
  });

  return (
    <React.Fragment>
      <div className="ui internally grid book-container">
        <div className="two wide column"></div>

        <div className="eight wide column">
          <div className="header-dropdown-container">
            <div className="sub-header">Popular Books</div>
            <select
              className="ui search dropdown home-page-dropdown"
              onChange={(e) => setHomeFilter(e.target.value)}
            >
              {filterBook.map((book) => {
                return (
                  <option key={book.id} value={book}>
                    {book}
                  </option>
                );
              })}
            </select>
            <div className="bookarray">{bookArray}</div>
          </div>
        </div>

        <div className="four wide column ranking-Array">
          <div className="sticky-bar">
            <div className="sub-header top-reviewed">Top reviewed books</div>
            <div className="ui segments">{rankingArray}</div>
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
