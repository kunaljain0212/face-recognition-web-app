import React from "react";
import Logo from "../Logo/Logo.js";

const Navigation = ({ changeRoute, isSignedIn }) => {
  if (isSignedIn === false) {
    return (
      <nav
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <p
          className="f3 link dim underline pa3 pointer"
          onClick={() => changeRoute("signin")}
        >
          Sign In
        </p>
        <p
          className="f3 link dim underline pa3 pointer"
          onClick={() => changeRoute("register")}
        >
          Register
        </p>
      </nav>
    );
  } else if (isSignedIn === true) {
    return (
      <div className="flex justify-between">
        <Logo />
        <nav
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <p
            className="f3 link dim underline pa3 pointer"
            onClick={() => changeRoute("signout")}
          >
            Sign Out
          </p>
        </nav>
      </div>
    );
    // }}
  }
};

export default Navigation;
