import React from "react";

import logo from "../../../assets/images/logo.png";
//import custome context hook
//import the link component from react router dom
import { Link } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext.jsx";
import loginService from "../../../services/login.service.jsx";

function Header() {
  //use the custome hool to acces
  const { isLogged, setIsLogged, employee } = useAuth();
  // console.log(useAuth())
  // call the logout function from the login service
  const handleLogout = () => {
    loginService.logOut();

    //set the isLogged to false
    setIsLogged(false);
  };
  return (
    <div>
      {/* //   <!-- Main Header --> */}
      <header className="main-header header-style-one">
        {/* <!-- Header Top --> */}
        <div className="header-top">
          <div className="auto-container">
            <div className="inner-container">
              <div className="left-column">
                <div className="text">Enjoy the Beso while we fix your car</div>
                <div className="office-hour">
                  Monday - Saturday 7:00AM - 6:00PM
                </div>
              </div>
              <div className="right-column">
                {isLogged ? (
                  <div className="phone-number">
                    <strong>Welcome {employee?.employee_first_name}</strong>
                  </div>
                ) : (
                  <div className="phone-number">
                    Schedule Your Appontment Today :{" "}
                    <strong>1800 456 7890</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Header Upper --> */}
        <div className="header-upper">
          <div className="auto-container">
            <div className="inner-container">
              {/* <!--Logo--> */}
              <div className="logo-box">
                <div className="logo">
                  <Link to="/">
                    <img src={logo} alt="" />
                  </Link>
                </div>
              </div>
              <div className="right-column">
                {/* <!--Nav Box--> */}
                <div className="nav-outer">
                  {/* <!--Mobile Navigation Toggler--> */}
                  <div className="mobile-nav-toggler">
                    <img src="assets/images/icons/icon-bar.png" alt="" />
                  </div>

                  {/* <!-- Main Menu --> */}
                  <nav className="main-menu navbar-expand-md navbar-light">
                    <div
                      className="collapse navbar-collapse show clearfix"
                      id="navbarSupportedContent"
                    >
                      <ul className="navigation">
                        <li className="dropdown">
                          <Link to="/">Home</Link>
                        </li>
                        <li className="dropdown">
                          <Link to="/about">About Us</Link>
                        </li>
                        <li className="dropdown">
                          <Link to="/services">Services</Link>
                        </li>
                        <li className="dropdown">
                          <Link to="/admin">Dashboard</Link>
                        </li>
                        <li>
                          <Link to="/contact">Contact Us</Link>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
                <div className="search-btn"></div>
                {isLogged ? (
                  <div className="link-btn">
                    <Link
                      to="/"
                      className="theme-btn btn-style-one blue"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </div>
                ) : (
                  <div className="link-btn">
                    <Link to="/login" className="theme-btn btn-style-one">
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <!--End Header Upper--> */}

        {/* <!-- Sticky Header  --> */}
        <div className="sticky-header">
          {/* <!-- Header Upper --> */}
          <div className="header-upper">
            <div className="auto-container">
              <div className="inner-container">
                {/* <!--Logo--> */}
                <div className="logo-box">
                  <div className="logo">
                    <Link to="/">
                      <img src="assets/images/custom/logo.png" alt="" />
                    </Link>
                  </div>
                </div>
                <div className="right-column">
                  {/* <!--Nav Box--> */}
                  <div className="nav-outer">
                    {/* <!--Mobile Navigation Toggler--> */}
                    <div className="mobile-nav-toggler">
                      <img src="assets/images/icons/icon-bar.png" alt="" />
                    </div>

                    {/* <!-- Main Menu --> */}
                    <nav className="main-menu navbar-expand-md navbar-light"></nav>
                  </div>
                  <div className="search-btn"></div>
                  <div className="link-btn">
                    <Link to="/login" className="theme-btn btn-style-one">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!--End Header Upper--> */}
        </div>
        {/* <!-- End Sticky Menu --> */}

        {/* <!-- Mobile Menu  --> */}
        <div className="mobile-menu">
          <div className="menu-backdrop"></div>
          <div className="close-btn">
            <span className="icon flaticon-remove"></span>
          </div>

          <nav className="menu-box">
            <div className="nav-logo">
              <Link to="index.html">
                <img src="assets/images/logo-two.png" alt="" title="" />
              </Link>
            </div>
            <div className="menu-outer">
              {/* <!--Here Menu Will Come Automatically Via Javascript / Same Menu as in Header--> */}
            </div>
          </nav>
        </div>
        {/* <!-- End Mobile Menu --> */}

        <div className="nav-overlay">
          <div className="cursor"></div>
          <div className="cursor-follower"></div>
        </div>
      </header>
      {/* <!-- End Main Header --> */}
    </div>
  );
}

export default Header;
