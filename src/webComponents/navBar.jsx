import React from 'react'

export default function NavBar() {
  return (
    <nav style={{margin:0}} className="navbar navbar-expand-lg navbar-light bg-light fixed-top p-1">
        <a className="navbar-brand" href="#"><img className="loginImage" src="/img/mtu logo.png" alt="MTU Logo" /></a>
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

        <div className="collapse navbar-collapse flex justify-content-center" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="visually-hidden">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">My profile</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Help/Support</a>
            </li>
            
          </ul>
          <li className="nav-item d-flex me-3">
            <button className="btn btn-outline-primary" type="submit">Log Out</button>
          </li>
        </div>
      </nav>
  )
}
