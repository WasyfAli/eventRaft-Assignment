import "../../App.css";
import React from "react";

const Footer = () => {
  return (
    <footer className="page-footer footer nav">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Footer</h5>
            <p className="grey-text text-lighten-4">
              Footer defines all the technloigies used in this Application
            </p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Tech's Used</h5>
            <ul>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Node Js
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Express Js
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  React Js
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Mongo DB
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Neo4j Graph DB
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Materialize Css
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright navTwo">
        <div className="container">
          &copy; Copyright | eventRaft Assignment
          <a className="grey-text text-lighten-4 right" href="#!">
            ~Developed By Wasif Ali
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
