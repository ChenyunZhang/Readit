import React from "react";
import { FacebookProvider, LoginButton } from "react-facebook";

const appId = process.env.REACT_APP_FACEBOOK_ClIENTID


function FacebookLoginButton() {
  const handleResponse = (data) => {
    console.log(data);
  };

  const handleError = (error) => {
    this.setState({ error });
  };

  return (
    <>
      <FacebookProvider appId={appId}>
        <LoginButton
          scope="email"
          onCompleted={handleResponse}
          onError={handleError}
        >
          <span>Login via Facebook</span>
        </LoginButton>
      </FacebookProvider>
    </>
  );
}

export default FacebookLoginButton;
