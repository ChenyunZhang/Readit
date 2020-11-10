import React, { useState } from "react";
import Nav from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import NewReview from "../Post/NewReviewForm";
import ReviewObj from "../Post/ReviewObj";

function ShowBook(props) {
  console.log(props);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const temp = props.allPosts.filter(
    (post) => post.book.id === props.currentBook.id
  );

  const currentBookReviewArray = temp.map((review) => (
    <ReviewObj key={review.id} review={review} />
  ));

  const thisBook = props.allPosts.filter(
    (post) => post.book.id === props.currentBook.id
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("book_id", props.currentBook.id);
    formData.append("content", content);
    formData.append("user_id", props.userInfo.id);
    // if (!!imageUrl) {
    //   formData.append("image", imageUrl);
    // }

    if (props.userInfo.token) {
      fetch("http://localhost:3000/posts", {
        method: "POST",
        body: formData,
      })
        .then((r) => r.json())
        .then((resp) => {
          if (resp.error) {
            setError(resp.error);
          } else {
            props.addPost(resp);
            setContent("")
            setShowReviewForm((preState) => !preState)
          }
        });
    } else {
      setError("You need to login to review");
    }
  };

  return (
    <>
      <Nav />
      <div className="ui internally grid">
        <div className="three wide column"></div>
        <div className="ten wide column">
          <div className="ui items">
            <div className="item">
              <div className="image">
                <img src={props.currentBook.imageLink} />
              </div>
              <div className="content">
                <div className="bookshow-title">{props.currentBook.title}</div>
                <div className="bookshow-author">
                  <div>by {props.currentBook.book_author}</div>
                </div>
                <div className="extra">
                  <div className="ui left pointing violet basic label">
                    {thisBook.length === 0 ? (
                      <>{`No one reviewed this book, be the first one`}</>
                    ) : (
                      <>{`${thisBook.length} reviews`}</>
                    )}
                  </div>
                </div>
                <div className="bookshow-description">
                  <p>{props.currentBook.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="ui internally grid">
            <div className="three wide column"></div>
            <div className="thirteen wide column">
              <h3>COMMUNITY REVIEWS</h3>
              <hr />
              <div
                className="ui basic inverted green label"
                onClick={(e) => setShowReviewForm((preState) => !preState)}
              >
                review this book
              </div>
              {showReviewForm ? (
                <form onSubmit={handleSubmit} className="ui form">
                  {error ? <h3>{error}</h3> : null}
                  <label htmlFor="content">What did you think</label>
                  <textarea
                    id="content"
                    className="field"
                    type="text"
                    placeholder="enter your review"
                    autoComplete="off"
                    required
                    rows="3"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              ) : null}
              {currentBookReviewArray}
            </div>
            <div className="two wide column"></div>
          </div>
        </div>
      </div>
    </>
  );
}

let mapStateToProps = (gState) => {
  return {
    allPosts: gState.postsInfo.posts,
    userInfo: gState.userInfo,
    allBooks: gState.bookInfo.books,
  };
};

const addPost = (singlePost) => {
  return {
    type: "ADD_POST",
    payload: singlePost,
  };
};

let mapDispatch = {
  addPost: addPost,
};

export default connect(mapStateToProps, mapDispatch)(ShowBook);
