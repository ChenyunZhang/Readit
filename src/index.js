import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

// REDUX STUFF HERE
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

// ######################## post reducer ###########################
let initialStateOfPostReducer = {
  posts: [],
};

let postReducer = (state = initialStateOfPostReducer, action) => {
  switch (action.type) {
    case "SET_POST":
      return {
        ...state,
        posts: action.payload
      };
    case "ADD_POST":
      let copyOfPosts = [...state.posts, action.payload]
      return {
        ...state,
        posts: copyOfPosts
      }

    default:
      return state;
  }
};

// ######################## category reducer ###########################
let initialStateOfCategoryReducer = {
  categories: [],
};

let categoryReducer = (state = initialStateOfCategoryReducer, action) => {
  switch (action.type) {
    case "SET_CATEGORY":
      return {
        ...state,
        categories: action.payload
      };
    default:
      return state;
  }
};

// ######################## user reducer ###########################
let initialStateOfUserReducer = {
  email: "",
  token: "",
  username: "",
  id: ""
};

let userReducer = (state = initialStateOfUserReducer, action) => {
  switch (action.type) {
    case "SET_USER_INFO":
      return {
        ...state,
        username: action.payload.user.username,
        email: action.payload.user.email,
        token: action.payload.token,
        id: action.payload.user.id
      }
    case "LOG_OUT":
      return {
        ...state,
        email: "",
        token: "",
        username: "",
        id: ""
      }
    case "UPDATE_USER_INFO":
      return {
        ...state,
        username: action.payload.user.username,
        email: action.payload.user.email,
        token: action.payload.token,
        id: action.payload.user.id
      }
    default:
      return state;
  }
};

// ######################## combine reducer ###########################
let infoCamp = {
  postsInfo: postReducer,
  userInfo: userReducer,
  categoryInfo: categoryReducer
};

let rootReducer = combineReducers(infoCamp);

let storeObj = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={storeObj}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
