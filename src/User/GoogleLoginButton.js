import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const clientId =
  

// const CLIENT_ID = process.env.GOOGLE_ClIENTID
console.log(process.env)

function GoogleLoginButton(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("")
  const [gtoken, setGtoken] = useState("");

  function responseGoogle(res) {
    console.log(res);
    setEmail(res.profileObj.email);
    setUsername(res.profileObj.name);
    setPassword("abc123");
    // setImageUrl(res.profileObj.imageUrl)
    // if (!!res) {
      // createUserfromGoogle();
    // }
  }

  // console.log(username);

  const formData = new FormData();
  formData.append("email", email);
  formData.append("username", username);
  formData.append("password", password);
  // formData.append("avatar", imageUrl);
  // function createUserfromGoogle() {
    fetch("http://localhost:3000/usersgoogle", {
      method: "POST",
      body: formData,
    })
      .then((r) => r.json())
      .then((resp) => {
        // console.log(resp);
        if (!!resp.user) {
          props.setUserInfo(resp);
          localStorage.token = resp.token;
          props.history.push("/");
        }
      });
  // }

  const onFailure = (res) => {
    console.log("[Login failed] res:", res);
  };

  return (
    <>
      <GoogleLogin
        clientId={clientId}
        buttonText="login"
        scope="email profile"
        onSuccess={responseGoogle}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={false}
      />
    </>
  );
}

let setUserInfo = (userInfo) => {
  return {
    type: "SET_USER_INFO",
    payload: userInfo,
  };
};

let mapDispatch = {
  setUserInfo: setUserInfo,
};

export default connect(null, mapDispatch)(withRouter(GoogleLoginButton));
