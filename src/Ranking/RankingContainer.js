import React from "react";

function RankingContainer() {
  return (
    <>
      <div className="ui middle aligned divided list">
        <div className="item">
          <div className="right floated content">
            {/* <div className="ui button">Add</div> */}
          </div>
          <img
            className="ui avatar image"
            src="https://images.unsplash.com/photo-1603947214027-2c4c36cc4dfd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
          <div className="content">Lena</div>
        </div>
        <div className="item">
          <div className="right floated content">
            {/* <div className="ui button">Add</div> */}
          </div>
          <img
            className="ui avatar image"
            src="https://images.unsplash.com/photo-1603947214027-2c4c36cc4dfd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
          <div className="content">Lena</div>
        </div>
        <div className="item">
          <div className="right floated content">
            {/* <div className="ui button">Add</div> */}
          </div>
          <img
            className="ui avatar image"
            src="https://images.unsplash.com/photo-1603947214027-2c4c36cc4dfd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
          <div className="content">Lena</div>
        </div>
      </div>
      <div className="ui small circular rotate reveal image">
        <img
          src="https://images.unsplash.com/photo-1603904658695-5c3940f7e266?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          className="visible content"
        />
        <img
          src="https://images.unsplash.com/photo-1601929254597-5f3f80fae1d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          className="hidden content"
        />
      </div>
    </>
  );
}

export default RankingContainer;
