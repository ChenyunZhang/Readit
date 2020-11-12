import React from 'react'
import { Link } from "react-router-dom";

function TrendingObj(props) {
    // console.log(props.bookInfo)
    return (
        <>
            {/* <div className="test-card card">
              <div className="ui fluid image"> */}
                  <Link to={`/books/${props.bookInfo.id}`}>
                    <div className="image">
                    <img className="test-card" src={props.bookInfo.imageLink} />
                    </div>
                  </Link>
              {/* </div>
            </div> */}
        </>
    )
}

export default TrendingObj
