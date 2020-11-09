import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SearchObj from "./SearchObj";
import shortid from 'shortid';
import SearchObjNoResult from './SearchObjNoResult'

function SearchContainter(props) {
  const dataArray = props.allSearched[0]
    ? props.allSearched.map((item) => item)
    : null;

    if(!props.allSearched[0]){
        return <SearchObjNoResult/>
    } 
    const seachArray = dataArray.map(item => {
        return <SearchObj key={shortid.generate()} item={item} />;
    })

  return (
  <React.Fragment>
      <div className="ui internally grid">
        <div className="two wide column"></div>

        <div className="twelve wide column">
          <h1>Search Result</h1>
          {seachArray}
        </div>

        <div className="four wide column">
          <div className="sticky-bar">
            {/* <RankingContainer /> */}
          </div>
        </div>

        <div className="two wide column"></div>
      </div>
    </React.Fragment>
)
}

let mapStateToProps = (gState) => {
  return {
    allSearched: gState.searchedBook.searchedBooks,
  };
};

export default connect(mapStateToProps)(withRouter(SearchContainter));
