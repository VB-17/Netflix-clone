import React, { useEffect, useState } from "react";
import "./Nav.css";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function Nav() {
  const [show, setShow] = useState(false);

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);

    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <div className="nav__images">
          <img
            className="nav__logo"
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt=""
          />

          <AccountCircleIcon
            style={{
              height: "35px",
              width: "35px",
              color: "#C0C0C0",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Nav;
