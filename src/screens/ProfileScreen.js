import React from "react";
import Nav from "../Nav";
import "./ProfileScreen.css";

import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { auth } from "../firebase";

function ProfileScreen() {
  const user = useSelector(selectUser);
  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <AccountCircleIcon
            className="profileScreen__logo"
            style={{
              width: "100px",
              height: "100px",
              color: "#C0C0C0",
              cursor: "pointer",
            }}
          />
          <div className="profileScreen__email">
            <h2>{user.email}</h2>
            <div className="profileScreen__plans">
                <h3>Plans</h3>
               
              <button
                onClick={() => auth.signOut()}
                className="profileScreen__signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
