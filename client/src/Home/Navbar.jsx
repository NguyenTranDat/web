import React from "react";
import { Link } from "react-router-dom";

function Navbar({ setSearchTerm, isAdmin }) {
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
                to={`/`}
                onClick={() => setSearchTerm(" ")}
              >
                Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={`/`}
                onClick={() => setSearchTerm("Văn")}
              >
                Văn
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={`/`}
                onClick={() => setSearchTerm("Trinh thám")}
              >
                Trinh thám
              </Link>
            </li>
  
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to={`/add`}>
                  Thêm sản phẩm
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }

export default Navbar