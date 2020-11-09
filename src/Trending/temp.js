import React from 'react'

function Temp(props) {
  return (
    <div>
      <div className="MagicScroll" data-options="mode: carousel">
      <img src={props.book.imageLink}/>
      </div>
      
    </div>
  )
}

export default Temp


// import React from "react";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";

// function TrendingContainer(props) {
//   let num1 = Math.floor(Math.random() * 10);
//   let num2 = Math.floor(Math.random() * 10) + 10;
//   let num3 = Math.floor(Math.random() * 10) + 20;
//   let num4 = Math.floor(Math.random() * 10) + 30;
//   //   Math.random() * (max - min) + min
//   // Math.floor(Math.random() * (max - min) + min);

//   return (
//     <>
//       <div className="ui internally grid">
//         <div className="two wide column"></div>
//         <div className="twelve wide column">
//           <h1>Editor's Pick</h1>

//         <div className="two wide column"></div>
//       </div>
//     </>
//   );
// }

// const mapStateToProps = (gState, ownProps) => {
//   return {
//     booksInfo: gState.bookInfo,
//     userInfo: gState.userInfo,
//   };
// };
// export default connect(mapStateToProps)(TrendingContainer);

