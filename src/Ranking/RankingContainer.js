import React from "react";
// import { connect } from "react-redux";
import { Link } from "react-router-dom";

function RankingContainer(props) {
  
  return (
    <div className="scrolldownmenu">
      <Link to={`/books/${props.book.id}`} className="custom-link">
        <div className="ui brown inverted segment rankingObj">
        <div className="ui items">
          <div className="ui item">
            <div className="ui image mini">
              <img src={props.book.imageLink} />
            </div>
            <div className="content">
              <p>{props.book.title}</p>
              <p>{props.book.book_author ? `by ${props.book.book_author}` : null}</p>
            </div>
          </div>
          </div>
        </div>
      </Link>
      <br />
    </div>
  );
}

export default RankingContainer;
