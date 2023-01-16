import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate()
  let auth1 = localStorage.getItem("user")
  const LogOut=()=>{
    localStorage.clear();
    navigate("/register")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          User
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {
              auth1 ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="home">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="about">
                    About
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="contact">
                    Contact us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="register" >
                    <button onClick={()=>LogOut()}>
                    logout</button>
                  </NavLink>
                </li>
              </ul> :
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="register">
                      Signup
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="login">
                      Login
                    </NavLink>
                  </li>
                </ul>
            }
          </div>
        </div>
      </nav>
    </div>
  );
}
