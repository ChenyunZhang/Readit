import React from "react";
import { connect } from "react-redux";
import Nav from "../NavBar/NavBar";

function ShowPost(props) {
  console.log(props);
  return (
    <>
      <Nav />
      <div className="ui internally grid">
        <div className="three wide column"></div>
        <div className="ten wide column">
          <div className="ui card fluid">
            <div className="content">
              <div className="header">{props.currentPost.title}</div>
              <div className="meta">
                <span>2 days ago</span>
                <div>{props.currentPost.category.title}</div>
              </div>
              <p>{props.currentPost.content}</p>
            </div>
          </div>
        </div>
        <div className="three wide column"></div>
      </div>
    </>
  );
}

let mapStateToProps = (globalState, ownProps) => {
  // console.log(ownProps)
  // ownProps is the props of the ShowFox component

  return {};

  // let id = ownProps.match.params.id
  // let num_id = parseInt(id)
  // let foundFox = globalState.foxesInformation.foxes.find(fox => fox.id === num_id)
  // return {
  //     singleFox: foundFox
  // }
};

export default connect(mapStateToProps)(ShowPost);
