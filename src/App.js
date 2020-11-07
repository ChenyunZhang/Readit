
import "./App.css";
import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import { useEffect } from "react";
import LoginForm from "./User/LoginForm";
import Navbar from "./NavBar/NavBar";
import Error from "./Error";
import SignupForm from "./User/SignupForm";
import TrendingContainer from "./Trending/TrendingContainer";
import Profile from "./User/Profile";
import EditReview from "./Post/EditReview";
import ForgetPassword from "./User/ForgetPasswordForm"
import ResetPassword from "./User/ResetPassword"
import BookContainer from "./Book/BookContainer"
import Filter from "./Trending/Filter"
import ShowBook from "./Book/ShowBook"
// import Temp from './Trending/temp'

const dotenv = require('dotenv').config()
const post_url = "http://localhost:3000/posts";
// const catgory_url = "http://localhost:3000/categories";
const book_url = "http://localhost:3000/books";
const promises = Promise.all([fetch(post_url), fetch(book_url)]);

function App(props) {
  useEffect(() => {
    promises
      .then((results) => Promise.all(results.map((r) => r.json())))
      .then((res) => {
        props.setPosts(res[0]);
        // props.setCategories(res[1]);
        props.setBooks(res[1]);
      });
    if (localStorage.token) {
      fetch("http://localhost:3000/keep_logged_in", {
        method: "GET",
        headers: {
          Authorization: localStorage.token,
        },
      })
        .then((res) => res.json())
        .then((resp) => {
          if (resp.token) {
            props.setUserInfo(resp);
          }
        });
    }
  }, []);



  const showSingleBook = (routerProps) => {
    let id = routerProps.match.params.id;
    let num_id = parseInt(id);

    if (props.allBooks[0]) {
      let foundBook = props.allBooks.find((book) => book.id === num_id);
      if (foundBook) {
        return <ShowBook {...routerProps} currentBook={foundBook} />;
      } else {
        return <Error />;
      }
    }
  };
  

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Navbar />
          <TrendingContainer />
          {/* <Temp /> */}
          <Filter />
          {/* <PostContainer /> */}
          <BookContainer />
        </Route>

        <Route exact path="/login">
        <Navbar />
          <LoginForm />
        </Route>

        <Route exact path="/signup">
        <Navbar />
          <SignupForm />
        </Route>

        <Route exact path="/profile">
        <Navbar />
          <Profile />
        </Route>

        <Route exact path="/userhome">
          <Navbar />
          <TrendingContainer />
          <Filter />
          <BookContainer />
        </Route>

        <Route exact path="/resetpassword">
        <Navbar />
        <ForgetPassword />
        </Route>

        <Route exact path="/accountconfirmation">
        <Navbar />
        <ResetPassword />
        </Route>

        <Route path="/books/:id" exact render={showSingleBook} />

        <Route>
          <Error />
        </Route>
      </Switch>
    </>
  );
}

const setPosts = (postArray) => {
  return {
    type: "SET_POST",
    payload: postArray,
  };
};

const setUserInfo = (userInfo) => {
  return {
    type: "SET_USER_INFO",
    payload: userInfo,
  };
};

const setBooks = (bookArray) => {
  return {
    type: "SET_BOOK",
    payload: bookArray,
  };
};

let mapDispatchToProps = {
  setPosts: setPosts,
  setUserInfo: setUserInfo,
  setBooks: setBooks
};

let mapStateToProps = (gState) => {
  return {
    allPosts: gState.postsInfo.posts,
    allBooks: gState.bookInfo.books
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));


  // const showSinglePost = (routerProps) => {
  //   let id = routerProps.match.params.id;
  //   let num_id = parseInt(id);
  //   if (props.allPosts[0]) {
  //     let foundPost = props.allPosts.find((post) => post.id === num_id);
  //     if (foundPost) {
  //       return <ShowPost {...routerProps} currentPost={foundPost} />;
  //     } else {
  //       return <Error />;
  //     }
  //   }
  // };

  // const editSinglePost = (routerProps) => {
  //   let id = routerProps.match.params.id;
  //   let num_id = parseInt(id);
  //   if (props.allPosts[0]) {
  //     let foundPost = props.allPosts.find((post) => post.id === num_id);
  //     if (foundPost) {
  //       return <EditReview {...routerProps} currentPost={foundPost} />;
  //     } else {
  //       return <Error />;
  //     }
  //   }
  // };