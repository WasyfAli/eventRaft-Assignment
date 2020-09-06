import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
class NavBar extends Component {
  componentDidMount() {
    const M = window.M;
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".sidenav");
      var instances = M.Sidenav.init(elems, {});
    });
  }
  render() {
    return (
      <div>
        <nav className="nav-fixed nav">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">
              RaftLabs
            </Link>
            <Link to="" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Link to="/">Add Peoples</Link>
              </li>
              <li>
                <Link to="/tag">Add Tag</Link>
              </li>
              <li>
                <Link to="/addRelations">Add Relations</Link>
              </li>
              <li>
                <Link to="/getRelations">Get Relations</Link>
              </li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          <li>
            <Link to="/">Add Peoples</Link>
          </li>
          <li>
            <Link to="/tag">Add Tag</Link>
          </li>
          <li>
            <Link to="/addRelations">Add Relations</Link>
          </li>
          <li>
            <Link to="/getRelations">Get Relations</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar;
