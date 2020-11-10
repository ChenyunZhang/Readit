import React from "react";
// import { connect } from "react-redux";
import { Link } from "react-router-dom";

function RankingContainer(props) {
  return (
    <>
      <Link to={`/books/${props.book.id}`} className="custom-link">
        <div className="ui brown inverted segment rankingObj">
        <div className="ui items">
          <div className="ui item">
            <div className="ui image mini">
              <img src={props.book.imageLink} />
            </div>
            <div className="content">
              <p>{props.book.title}</p>
              <p>by {props.book.book_author}</p>
            </div>
          </div>
          </div>
        </div>
      </Link>
      <br />
    </>
  );
}

export default RankingContainer;
