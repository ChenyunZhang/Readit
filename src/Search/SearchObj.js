import React from "react";

function SearchObj(props) {
  console.log(props.item);
  return (
    <React.Fragment>
      <a href={props.item.volumeInfo.infoLink} target="blank">
        <div className="ui divided segments bookobj">
          <div className="ui items bookobj-container">
            <div className="item bookitem">
              <div className="ui image bookimage">
                {!!props.item.volumeInfo.imageLinks ? (
                  <img src={props.item.volumeInfo.imageLinks.smallThumbnail} />
                ) : null}
              </div>
              <div className="content">
                <div className="header">{props.item.volumeInfo.title}</div>
                <div className="extra">
                  {!!props.item.volumeInfo.category
                    ? props.item.volumeInfo.category
                    : null}
                </div>
                <div className="meta">
                  <span>
                    {props.item.volumeInfo.authors
                      ? props.item.volumeInfo.authors[0]
                      : null}
                  </span>
                </div>
                <div className="description">
                  <p>
                    {props.item.searchInfo
                      ? props.item.searchInfo.textSnippet
                      : null}
                  </p>
                </div>
                <div className="meta">
                  <p>{props.item.volumeInfo.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </React.Fragment>
  );
}

export default SearchObj;
