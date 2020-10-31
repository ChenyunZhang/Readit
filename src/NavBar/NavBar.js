import React from "react";
import { Link } from "react-router-dom";
import Searchbar from "./SearchBar";
import { connect } from "react-redux";

function NavBar(props) {

  const handleLogout = () => {
    props.setUserLogout();
    localStorage.clear();
  };


  return (
    <>
      <div className="ui internally grid">
        <div className="two wide column"></div>

        <div className="twelve wide column">
          {/* secondary */}
          <div className="ui secondary menu">
            <Link className="item" to="/">
              Home
            </Link>
            {/* <Link className="item">Contact</Link>
            <Link className="item">About</Link> */}
            <div className="item">
              <div className="ui icon input">
                <Searchbar />
                <i className="search icon"></i>
              </div>
            </div>
            {props.userInfo.token ? (
              <div className="right menu">
                <Link className="item" to="/newpost">Post</Link>
                <Link className="item" to="/profile">
                  Profile
                </Link>
                <Link className="item" to="/" onClick={handleLogout}>
                  Logout
                </Link>

                <div className="item">
                  <div
                    type="button"
                    className="btn dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="user outline icon"></i> {props.userInfo.username}
                    <div className="dropdown-menu dropdown-menu-right">
                      <button className="dropdown-item" type="button">
                        Another action
                      </button>
                      <button className="dropdown-item" type="button">
                        Something else here
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="right menu">
                <div className="item">
                  <Link className="ui item" to="/signup">
                    Signup
                  </Link>
                  <Link className="ui item" to="/login">
                    Login
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="two wide column"></div>
      </div>
    </>
  );
}

let mapStateToProps = (globalState) => {
  return {
    userInfo: globalState.userInfo,
  };
};

let setUserLogout = () => {
  return {
    type: "LOG_OUT",
  };
};

let mapDispatch = {
  setUserLogout: setUserLogout,
};

export default connect(mapStateToProps, mapDispatch)(NavBar);
