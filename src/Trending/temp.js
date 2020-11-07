import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function TrendingContainer(props) {
  let num1 = Math.floor(Math.random() * 10);
  let num2 = Math.floor(Math.random() * 10) + 10;
  let num3 = Math.floor(Math.random() * 10) + 20;
  let num4 = Math.floor(Math.random() * 10) + 30;
  //   Math.random() * (max - min) + min
  // Math.floor(Math.random() * (max - min) + min);

  return (
    <>
      <div className="ui internally grid">
        <div className="two wide column"></div>
        <div className="twelve wide column">
          <h1>Editor's Pick</h1>
          <div className="cards">
              <div className="ui fluid image">
                {props.booksInfo.books[0] ? (
                  <Link to="/books/9">
                    <img src={props.booksInfo.books[8].imageLink} />
                  </Link>
                ) : null}
              </div>
            </div>
            <div className="card">
              <div className="ui fluid image">
                {props.booksInfo.books[0] ? (
                  <Link to="/books/39">
                    <img src={props.booksInfo.books[38].imageLink} />
                  </Link>
                ) : null}
              </div>
            </div>
            <div className="card">
              <div className="ui fluid image">
                {props.booksInfo.books[0] ? (
                  <Link to="/books/23">
                    <img src={props.booksInfo.books[22].imageLink} />
                  </Link>
                ) : null}
              </div>
            </div>
            <div className="card">
              <div className="ui fluid image">
                {props.booksInfo.books[0] ? (
                  <Link to="/books/27">
                    <img src={props.booksInfo.books[26].imageLink} />
                  </Link>
                ) : null}
              </div>
            </div>

            <div className="card">
              <div className="ui fluid image">
                {props.booksInfo.books[0] ? (
                  <Link to="/books/5">
                    <img src={props.booksInfo.books[4].imageLink} />
                  </Link>
                ) : null}
              </div>
            </div>

            <div className="card">
              <div className="ui fluid image">
                {props.booksInfo.books[0] ? (
                  <Link to="/books/35">
                    <img src={props.booksInfo.books[34].imageLink} />
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="two wide column"></div>
    </>
  );
}

const mapStateToProps = (gState, ownProps) => {
  return {
    booksInfo: gState.bookInfo,
    userInfo: gState.userInfo,
  };
};
export default connect(mapStateToProps)(TrendingContainer);

