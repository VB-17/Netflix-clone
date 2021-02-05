import React, { useRef } from "react";
import { auth, provider } from "../firebase";
import "./SignupScreen.css";

import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

function SignupScreen() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => alert(error.message));
  };

  const signIn = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((err) => alert(err.message));
  };

  const googleSignIn = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(provider)
      .then((res) => console.log(res))
      .catch((err) => alert(err.message));
  };
  return (
    <div className="signupScreen">
      <form>
        <h1>Sign In</h1>
        <input type="email" ref={emailRef} placeholder="Email" />
        <input type="password" ref={passwordRef} placeholder="Password" />
        <button
          onClick={signIn}
          type="submit"
          className="signupScreen__loginBtn"
        >
          Sign In
        </button>
        <button
          onClick={googleSignIn}
          type="submit"
          className="signupScreen__googleBtn"
        >
          Sign up with Google
        </button>

        <h4>
          <span className="signupScreen__gray">New to Netflix? </span>
          <span className="signupScreen__link" onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignupScreen;
