import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { auth, firebase, firestore } from "../Fire";
import "./style.css";

const Login = ({ changepath }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordIsSame, setPasswordIsSame] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const errorSvg = (
    <svg id="error-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 143 143">
      <g id="Error_1_">
        <g id="Error">
          <circle id="BG" cx="71.5" cy="71.5" r="71.5" fill="#fc4747" />
          <path
            id="Exclamatory_x5F_Sign"
            d="M14.5,90.613H27.86V77.253H14.5ZM14.5,6V63.893H27.86V6Z"
            transform="translate(50.073 20.72)"
            fill="#e6e6e6"
          />
        </g>
      </g>
    </svg>
  );

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handlePasswordNotSame = (e) => {
    e.preventDefault();
  };

  const handleSubmitExisiting = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        changepath && changepath("/");
      })
      .catch((error) => {
        console.log(error);
      });

    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmitNew = (e) => {
    e.preventDefault();
    const name = firstName + " " + lastName;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        if (data.user) {
          data.user.updateProfile({ displayName: name });
        }
        changepath && changepath("/");
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        changepath && changepath("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signInWIthFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        changepath && changepath("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    password === confirmPassword ? setPasswordIsSame(true) : setPasswordIsSame(false);
  }, [confirmPassword, password]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  auth.onAuthStateChanged(() => {
    if (isLoggedIn) {
      const cartRef = firestore.collection("user");
      cartRef
        .doc(auth.currentUser.uid)
        .get()
        // .then((res) => (data = res.data()))
        .then(
          (res) =>
            !res.data() &&
            cartRef
              .doc(auth.currentUser.uid)
              .set({ cartItems: [], historyItems: [], favItems: [] }, { merge: true })
        );
    }
    if (auth.currentUser) {
      setIsLoggedIn(true);
      localStorage.setItem("uid", auth.currentUser.uid);
    }
  });

  return (
    <>
      {isLoggedIn && <Redirect to="/" />}
      <div className="outer-container">
        <Link className="home-back" to="/">
          <p className="login-header">Artograph</p>
        </Link>

        <div className="container">
          <p className="sign-in">{hasAccount ? "Login In" : "Sign In"}</p>

          <div className="login-button">
            <div className="google-login-button">
              <button onClick={signInWithGoogle}>Sign in with google</button>
            </div>

            <div className="facebook-login-button">
              <button onClick={signInWIthFacebook}>Contineu with facebook</button>
            </div>
          </div>

          <div className="divider">
            <hr />
            <p>or</p>
            <hr />
          </div>

          <div className="email-password">
            <form
              onSubmit={(e) => {
                hasAccount
                  ? handleSubmitExisiting(e)
                  : passwordIsSame
                  ? handleSubmitNew(e)
                  : handlePasswordNotSame(e);
              }}
              className="login-form">
              {!hasAccount && (
                <div className="names">
                  <div className="input-fields">
                    <label className="lable" htmlFor="first-name">
                      First Name
                    </label>
                    <input
                      onChange={(e) => handleFirstNameChange(e)}
                      className="input"
                      type="name"
                      id="first-name"
                      placeholder="First name"
                      autoComplete="off"
                      required
                      value={firstName}
                    />
                  </div>

                  <div className="input-fields">
                    <label className="lable" htmlFor="last-name">
                      Lasr Name
                    </label>
                    <input
                      onChange={(e) => handleLastNameChange(e)}
                      className="input"
                      type="name"
                      id="last-name"
                      placeholder="Last name"
                      autocomplete="off"
                      required
                      value={lastName}
                    />
                  </div>
                </div>
              )}

              <div className="input-fields">
                <label className="lable" htmlFor="email">
                  Email
                </label>
                <input
                  required
                  className="input"
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => handleEmailChange(e)}
                />
              </div>

              <div style={{ marginTop: "1.7rem" }} className="input-fields">
                <label className="lable" htmlFor="password">
                  Password
                </label>
                <input
                  required
                  onChange={(e) => handlePasswordChange(e)}
                  className="input"
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  autoComplete="off"
                  value={password}
                  maxLength="16"
                />
              </div>

              {!hasAccount && (
                <div className="input-fields">
                  <label className="lable" htmlFor="password">
                    Confirm Password
                  </label>
                  <input
                    required
                    onChange={(e) => handleConfirmPassword(e)}
                    className="input"
                    type="text"
                    id="confirm-password"
                    placeholder="Enter your password again"
                    autoComplete="off"
                    maxLength="16"
                    value={confirmPassword}
                  />
                  {!passwordIsSame && errorSvg}
                </div>
              )}

              <div className="submit-button">
                <button>{hasAccount ? "Submit" : "Create"}</button>
              </div>

              <div className="create-account">
                <p
                  onClick={() => {
                    setHasAccount((preValue) => !preValue);
                    // passwordIsSame ? handleSubmitNew(e) : handlePasswordNotSame(e);
                  }}>
                  {hasAccount ? "Create New Account" : "Already Have Acccount?"}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
