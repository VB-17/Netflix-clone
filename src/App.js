import React, { useEffect } from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./Route/PrivateRoute";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { auth } from "./firebase";

import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

    return (
      <div className="App">
        <Router>
          {!user ? (
            <LoginScreen />
          ) : (
            <Switch>
              <Route path="/profile">
                <ProfileScreen />
              </Route>

              <PrivateRoute exact path="/" component={HomeScreen} />
     
            </Switch>
          )}
        </Router>
      </div>
    );
  }

export default App;
