import React from 'react'
import { Link } from "react-router-dom";

function ProfileReadingBookObj(props) {
    // console.log(props.reviewObj)
    return (
        <React.Fragment>
            <div className="card">
              <div className="ui fluid image">
                  <Link to={`/books/${props.reviewObj.book.id}`}>
                    <div className="image">
                    <img className="test-card" src={props.reviewObj.book.imageLink} />
                    </div>
                  </Link>
              </div>
            </div>
        </React.Fragment>
    )
}

export default ProfileReadingBookObj
