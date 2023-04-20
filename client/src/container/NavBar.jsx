import React from "react";
import { Link } from "react-router-dom";

function NavBar({ setSearchTerm }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link
              className="nav-link"
              onClick={() => setSearchTerm(" ")}
              to={`/`}
            >
              Trang chủ
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              onClick={() => setSearchTerm("Văn")}
              to={`/`}
            >
              Văn
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              onClick={() => setSearchTerm("Trinh thám")}
              to={`/`}
            >
              Trinh thám
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
