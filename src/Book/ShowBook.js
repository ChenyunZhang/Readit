import React, { useState } from "react";
import Nav from "../NavBar/NavBar";
import { connect } from "react-redux";
import NewReview from "../Post/NewReviewForm";
import ReviewObj from "../Post/ReviewObj"

function ShowBook(props) {

  const [showReviewForm, setShowReviewForm] = useState(false);
  const temp = props.allPosts.filter(post=> post.book.id === props.currentBook.id);
  const currentBookReviewArray = temp.map(review => <ReviewObj key={review.id} review={review}/>)

  return (
    <>
      <Nav />
      <div className="ui internally grid">
        <div className="four wide column"></div>
        <div className="eight wide column">
          <div>Title: {props.currentBook.title}</div>
          <div>Rating: {props.currentBook.rating}</div>
          <div>Rating_count: {props.currentBook.rating_count}</div>
          <div>
            {" "}
            Book_average_rating: {props.currentBook.book_average_rating}
          </div>
          <img src={props.currentBook.imageLink}></img>
          <div> Description: {props.currentBook.description}</div>
          <div>Auther: {props.currentBook.author}</div>
          <button
            className="ui basic blue button"
            onClick={(e) => setShowReviewForm((preState) => !preState)}
          >
            review this book
          </button>
          {showReviewForm ? <NewReview book={props.currentBook}/> : null}
          <div>COMMUNITY REVIEWS</div>
          <hr />
          {currentBookReviewArray}
        </div>
        <div className="four wide column"></div>
      </div>
    </>
  );
}

let mapStateToProps = (gState) => {
  return {
    allPosts: gState.postsInfo.posts,
    currentUser: gState.userInfo,
  };
};

export default connect(mapStateToProps)(ShowBook);
