import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function BookObj(props) {
  // console.log(typeof(props.ownProps.book.book_author))
  return (
    <React.Fragment>
      <Link to={`/books/${props.ownProps.book.id}`} className="custom-link">
        <div className="ui divided items">
          <div className="item">
            <div className="ui small image">
              {!!props.ownProps.book.imageLink ? (
                <img src={props.ownProps.book.imageLink} />
              ) : null}
            </div>
            <div className="content">
              <div className="header">{props.ownProps.book.title}</div>
              <div className="extra">{props.ownProps.book.category}</div>
              <div className="meta">
                <span>{props.ownProps.book.book_author}</span>
              </div>
              <div className="description">
                <p>{props.ownProps.book.book_textsnippet}</p>
              </div>
              
              {/* <div className="extra">
                <div className="ui label">Write Review</div>
                <div className="ui label">
                  <i className="globe icon"></i> Additional Languages
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </Link>
      <hr />
    </React.Fragment>
  );
}

const mapStateToProps = (gState, ownProps) => {
  return {
    booksInfo: gState.booksInfo,
    ownProps: ownProps,
    userInfo: gState.userInfo,
  };
};

export default connect(mapStateToProps)(BookObj);
