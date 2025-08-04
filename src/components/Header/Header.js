import React, { useState } from "react";

import { Link } from "react-router-dom";

import "./Header.css";

export default function Header() {
  const [search, setsearch] = useState("");
  const logout = () => {
    localStorage.removeItem("uid");
    localStorage.removeItem("pass");
    localStorage.removeItem("token");
    window.location.href = "https://localhost:3000";
  };

  return (
    <nav className="navbar container navbar-expand-lg text-light ">
      <Link className="navbar-brand text-light" to="/">
        Movie Seekers
      </Link>
      <button
        className="navbar-toggler bg-light"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        More
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link text-light" to="/filter/series">
              Series-Netflix
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link text-light " to="/filter/bollywood">
              Bollywood-South
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link text-light " to="/filter/hollywood">
              Hollywood
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link text-light " to="/filter/all">
              All
            </Link>
          </li>
        </ul>

        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
          {search ? (
            <Link to={`/search/${search}`}>
              <button
                className="btn btn-outline-light my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </Link>
          ) : (
            <button
              className="btn btn-outline-light my-2 my-sm-0"
              type="button"
            >
              Search
            </button>
          )}

          <div className="user-dropdown">
            {localStorage.getItem("token") ? (
              <>
                <h4>
 &nbsp;&nbsp;                 {" "}
                  Welcome {localStorage.getItem("uid").slice(0, 6)}
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-sm btn-outline-info"
                    onClick={logout}
                  >
                    <a href="/register">Logout</a>
                  </button>
                </h4>
              </>
            ) : (
              <div className="dropdown-wrapper">
                <div
                  style={{ marginLeft: "63px" }}
                  className="user-avatar"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector(".dropdown-menu-custom")
                      .classList.toggle("show");
                  }}
                >
                  <i class="bi bi-person-add" style={{ fontSize: "30px" }}></i>
                </div>
                <div className="dropdown-menu-custom">
                  <Link className="dropdown-item-custom" to="/login">
                    Login
                  </Link>
                  <Link className="dropdown-item-custom" to="/register">
                    Sign Up
                  </Link>
                  <Link className="dropdown-item-custom" to="/A_D_M_I_N">
                    Admin
                  </Link>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </nav>
  );
}
