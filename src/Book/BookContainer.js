import React from "react";
import { connect } from "react-redux";
import BookObj from "./BookObj";
import RankingContainer from "../Ranking/RankingContainer";

function BookContainer(props) {
  const bookArray = props.bookInfo.map((book) => {
    return <BookObj key={book.id} book={book} />;
  });

  return (
    <React.Fragment>
      <div className="ui internally grid">
        <div className="two wide column"></div>

        <div className="eight wide column">
          <h1>Popular Books</h1>
          {bookArray}
        </div>

        <div className="four wide column">
          <div className="sticky-bar">
            <RankingContainer />
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
