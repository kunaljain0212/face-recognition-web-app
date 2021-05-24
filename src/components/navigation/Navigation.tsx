import React from "react";
import Logo from "../Logo/Logo";

interface IProps {
  changeRoute: (route: string) => void;
  isSignedIn: boolean;
}

const Navigation: React.FC<IProps> = ({ changeRoute, isSignedIn }) => {
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
  } else {
    return null;
  }
};

export default Navigation;
