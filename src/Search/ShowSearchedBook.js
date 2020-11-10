import React, {useState} from "react";
import Nav from "../NavBar/NavBar";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NewReview from "../Post/NewReviewForm";
import ReviewObj from "../Post/ReviewObj";

function ShowSearchedBook(props) {

  return(
      <React.Fragment>
      <Nav />
      <div className="ui internally grid">
        <div className="three wide column"></div>
        <div className="ten wide column">

        </div>
        <div className="three wide column"></div>
        </div>
      </React.Fragment>
  )
}

//   const thisBook = props.allPosts.filter(
//     (post) => post.book.id === props.currentBook.id
//   );

//   return (
//     <>
//       <Nav />
//       <div className="ui internally grid">
//         <div className="three wide column"></div>
//         <div className="ten wide column">
//           <div className="ui items">
//             <div className="item">
//               <div className="image">
//                 <img src={props.currentBook.imageLink} />
//               </div>
//               <div className="content">
//                 <div className="bookshow-title">{props.currentBook.title}</div>
//                 <div className="bookshow-author">
//                   <Link to="/">by {props.currentBook.book_author}</Link>
//                 </div>
//                 <div className="extra">
//                   <div className="ui left pointing violet basic label">
//                     {thisBook.length === 0 ? (
//                       <>{`No one reviewed this book, be the first one`}</>
//                     ) : (
//                       <>{`${thisBook.length} reviews`}</>
//                     )}
//                   </div>
//                 </div>
//                 <div className="bookshow-description">
//                   <p>{props.currentBook.description}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <h6>COMMUNITY REVIEWS</h6>
//           <hr />
//           <button
//             className="ui basic blue button"
//             onClick={(e) => setShowReviewForm((preState) => !preState)}
//           >
//             review this book
//           </button>
//           {showReviewForm ? <NewReview book={props.currentBook} /> : null}
//           {currentBookReviewArray}
//         </div>
//         <div className="three wide column"></div>
//       </div>
//     </>
//   );
// }

let mapStateToProps = (gState) => {
  return {
    allPosts: gState.postsInfo.posts,
    currentUser: gState.userInfo,
    allBooks: gState.bookInfo.books,
  };
};


export default connect(mapStateToProps)(ShowSearchedBook);
