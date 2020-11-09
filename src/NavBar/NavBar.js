import React from "react";
import { Link } from "react-router-dom";
import Searchbar from "./SearchBar";
import { Dropdown, Image } from "semantic-ui-react";
import { connect } from "react-redux";

function NavBar(props) {
  const handleLogout = () => {
    props.setUserLogout();
    localStorage.clear();
  };

  const trigger = (
    <span>
      <Image
        avatar
        src={props.userInfo.avatar ? props.userInfo.avatar.url : `https://cdn.onlinewebfonts.com/svg/img_184513.png`}
      />
    </span>
  );

  return (
    <>
      {/* <div className="ui secondary brown medium inverted menu" id="navbar"> */}
      <div className="ui fixed borderless huge menu" id="navbar">
        <div className="ui container grid">
          <div className="two wide column" id="navbar-left">
            <div className="ui item">
              {props.userInfo.token ? (
                <Link id="home" to="/userhome">
                  Read it
                </Link>
              ) : (
                <Link id="home" to="/">
                  Read it
                </Link>
              )}
            </div>
          </div>
          <div className="twelve wide column" id="navbar-middle">
            <div className="ui item">
              <div className="ui icon fluid input">
                <Searchbar />
              </div>
            </div>
          </div>
          <div className="two wide column" id="navbar-right">
            {props.userInfo.token ? (
              <div className="item">
                <Dropdown trigger={trigger} pointing="top">
                  <Dropdown.Menu>
                    <Dropdown.Item
                      disabled={true}
                      text={`Sign in as ${props.userInfo.username}`}
                    />
                    <Dropdown.Divider />
                    <Dropdown.Item
                      as={Link}
                      to="/profile"
                      text="Your profile"
                    />
                    <Dropdown.Divider />
                    <Dropdown.Item
                      as={Link}
                      to="/"
                      onClick={handleLogout}
                      text="Sign out"
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ) : (
              <>
                <div className="ui secondary huge right menu">
                  <div className="ui item">
                    <Link
                      to={localStorage.length > 0 ? "/userhome" : "/signup"}
                    >
                      Signup
                    </Link>
                  </div>
                  <div className="ui item">
                    <Link to={localStorage.length > 0 ? "/userhome" : "/login"}>
                      Login
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
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
