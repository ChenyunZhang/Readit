import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";


const clientId = process.env.REACT_APP_GOOGLE_BOOK_CLIENTKEY;

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&orderBy=relevance&maxResults=30&key=${clientId}`
      )
        .then((r) => r.json())
        .then((data) => {
          const booksArray = data["items"] ? data["items"].filter(
            (item) => item["volumeInfo"]["imageLinks"]
          ) : null
          props.setSearchedBooks(booksArray)
          props.history.push("/searchresult");
        });
    }
  };

  return (
    <>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleSearch}
        placeholder="Search book"
        type="text"
      />
      <i className="search icon"></i>
    </>
  );
}

const setSearchedBooks = (bookArray) => {
  return {
    type: "SET_SEARCH_BOOK",
    payload: bookArray,
  };
};

let mapDispatchToProps = {
  setSearchedBooks: setSearchedBooks
};

let mapStateToProps = (gState) => {
  return {
    allPosts: gState.postsInfo.posts,
    allBooks: gState.bookInfo.books
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchBar));
