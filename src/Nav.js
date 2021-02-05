import React, { useEffect, useState } from "react";
import "./Nav.css";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

function Nav() {
  const user = useSelector(selectUser);

  const [show, setShow] = useState(false);
  const history = useHistory();
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
            onClick={() => history.push("/")}
            style={{ cursor: "pointer" }}
            className="nav__logo"
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt=""
          />

          <AccountCircleIcon
            onClick={() => history.push("/profile")}
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
