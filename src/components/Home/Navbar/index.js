import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../../Fire";
import Message from "../Message";
import "./style.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showError, setShowError] = useState(false);
  const location = useLocation();
  const checkbox = useRef();

  const logoutSvg = (
    <svg
      className="logout-svg"
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      height="24px"
      viewBox="0 0 24 24"
      width="24px">
      <g>
        <path d="M0,0h24v24H0V0z" fill="none" />
      </g>
      <g>
        <path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z" />
      </g>
    </svg>
  );

  auth.onAuthStateChanged(() => {
    auth.currentUser ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });

  const handleLogout = () => {
    auth.signOut();
    auth.onAuthStateChanged(() => {
      !auth.currentUser && setShowMessage(true);
      !auth.currentUser && localStorage.removeItem("uid");
    });
  };

  const hanldeCheckboxClick = (e) => {
    const setMenu = (e) => {
      if (!e.target.closest(".nav-menu") && !e.target.closest(".menu")) {
        setNavMenu(false);
        window.removeEventListener("click", setMenu);
      }
    };
    setIsChecked(e.target.checked);
    window.addEventListener("click", setMenu);
  };

  const setNavMenu = (bool) => {
    if (window.innerWidth > 990) return;
    setIsChecked(bool);
    checkbox.current.checked = bool;
  };

  const handleNavbarClick = () => {
    setNavMenu(false);
    !auth.currentUser && setShowError(true);
  };

  return (
    <>
      {showError && <Message type="error" msg="Please First Sign In" setShowMessage={setShowError} />}
      <nav className="nav">
        <Link to="/">
          <h1 className="logo">Artogrph</h1>
        </Link>

        <ul className={isChecked ? "nav-list-expand nav-menu" : "nav-list nav-menu"}>
          <Link onClick={() => setNavMenu(false)} to="/" className="nav-items">
            <p className={location.pathname === "/" ? "active" : undefined}>Products</p>
          </Link>

          <Link onClick={handleNavbarClick} to={isLoggedIn ? "/favorite" : "/"} className="nav-items">
            <p className={location.pathname === "/favorite" ? "active" : undefined}>Favorite</p>
          </Link>

          <Link onClick={handleNavbarClick} to={isLoggedIn ? "/cart" : "/"} className="nav-items">
            <p className={location.pathname === "/cart" ? "active" : undefined}>Cart</p>
          </Link>

          <Link onClick={handleNavbarClick} to={isLoggedIn ? "/history" : "/"} className="nav-items">
            <p className={location.pathname === "/history" ? "active" : undefined}>History</p>
          </Link>

          {isLoggedIn ? (
            <Link to="/" onClick={handleLogout} className="nav-items">
              <p className="logout">Log Out{logoutSvg}</p>
            </Link>
          ) : (
            <a href="/sign-in" className="nav-items">
              <p className="login">Sign In{logoutSvg}</p>
            </a>
          )}
        </ul>
        <div className="menu">
          <input type="checkbox" onClick={(e) => hanldeCheckboxClick(e)} id="checkbox-menu" ref={checkbox} />
          <label htmlFor="checkbox-menu" className="menu-container">
            <div className="hamburger-menu"></div>
          </label>
        </div>
      </nav>
      {showMessage && <Message msg="Logged Out!" setShowMessage={setShowMessage} />}
    </>
  );
};

export default Navbar;
