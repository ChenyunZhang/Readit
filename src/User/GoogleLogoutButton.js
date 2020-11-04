import React from "react";
import { GoogleLogout } from "react-google-login";

const clientId =
  "689721056086-8iolean7f9v07ujlc2va33ntb6vvl18c.apps.googleusercontent.com";

function GoogleLogoutButton() {
  const onSuccess = () => {
    alert("Log out successfully");
  };
  return (
    <div>
      <GoogleLogout 
      clientId={clientId}
      buttonText="Logout"
      onLogoutSuccess={onSuccess} 
      />
    </div>
  );
}

export default GoogleLogoutButton;
