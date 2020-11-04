import React from "react";
import { GoogleLogin } from "react-google-login";


const clientId =
  "689721056086-8iolean7f9v07ujlc2va33ntb6vvl18c.apps.googleusercontent.com";

function GoogleLoginButton() {
  const onSuccess = (res) => {
    //   console.log(res)
    fetch("http://localhost:3000/login_with_google", {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify({
            email: res.profileObj.email,
            username: res.profileObj.name,
        }),
      })
        .then((r) => r.json())
        .then((resp) => {
          if (resp.error) {
            // setError(resp.error);
          } else {
            // props.setUserInfo(resp);
            // localStorage.token = resp.token;
            // props.history.push("/userhome");
          }
        })
  };

  const onFailure = (res) => {
    console.log("[Login failed] res:", res);
  };
  return (
    <>
      <GoogleLogin
        clientId={clientId}
        buttonText="login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </>
  );
}

export default GoogleLoginButton;
