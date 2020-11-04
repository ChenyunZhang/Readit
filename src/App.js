import "./App.css";
import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import { useEffect } from "react";
import LoginForm from "./User/LoginForm";
import Navbar from "./NavBar/NavBar";
import Error from "./Error";
import SignupForm from "./User/SignupForm";
import PostContainer from "./Post/PostContainer";
import TrendingContainer from "./Trending/TrendingContainer";
import NewPost from "./Post/NewPostForm";
import Profile from "./User/Profile";
import ShowPost from "./Post/ShowPost";
import EditPost from "./Post/EditPost";
import ForgetPassword from "./User/ForgetPasswordForm"
import ResetPassword from "./User/ResetPassword"

const post_url = "http://localhost:3000/posts";
const catgory_url = "http://localhost:3000/categories";
const promises = Promise.all([fetch(post_url), fetch(catgory_url)]);

function App(props) {
  useEffect(() => {
    promises
      .then((results) => Promise.all(results.map((r) => r.json())))
      .then((res) => {
        props.setPosts(res[0]);
        props.setCategories(res[1]);
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

  const showSinglePost = (routerProps) => {
    let id = routerProps.match.params.id;
    let num_id = parseInt(id);
    if (props.allPosts[0]) {
      let foundPost = props.allPosts.find((post) => post.id === num_id);
      if (foundPost) {
        return <ShowPost {...routerProps} currentPost={foundPost} />;
      } else {
        return <Error />;
      }
    }
  };

  const editSinglePost = (routerProps) => {
    let id = routerProps.match.params.id;
    let num_id = parseInt(id);
    if (props.allPosts[0]) {
      let foundPost = props.allPosts.find((post) => post.id === num_id);
      if (foundPost) {
        return <EditPost {...routerProps} currentPost={foundPost} />;
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
          <PostContainer />
        </Route>

        <Route exact path="/login">
        <Navbar />
          <LoginForm />
        </Route>

        <Route exact path="/signup">
        <Navbar />
          <SignupForm />
        </Route>

        <Route exact path="/newpost">
        <Navbar />
          <NewPost />
        </Route>

        <Route exact path="/profile">
        <Navbar />
          <Profile />
        </Route>

        <Route exact path="/userhome">
          <Navbar />
          <TrendingContainer />
          <PostContainer />
        </Route>

        <Route exact path="/resetpassword">
        <Navbar />
        <ForgetPassword />
        </Route>

        <Route exact path="/accountconfirmation">
        <Navbar />
        <ResetPassword />
        </Route>

        <Route path="/posts/:id" exact render={showSinglePost} />
        <Route path="/posts/edit/:id" exact render={editSinglePost} />

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

const setCategories = (categoryArray) => {
  return {
    type: "SET_CATEGORY",
    payload: categoryArray,
  };
};

const setUserInfo = (userInfo) => {
  return {
    type: "SET_USER_INFO",
    payload: userInfo,
  };
};

let mapDispatchToProps = {
  setPosts: setPosts,
  setCategories: setCategories,
  setUserInfo: setUserInfo,
};

let mapStateToProps = (gState) => {
  return {
    allPosts: gState.postsInfo.posts,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
