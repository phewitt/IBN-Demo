import React, { Component } from "react";
import "./Footer.css";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer fixed-bottom border-top text-center">
        <p className="text-muted add-top-margin">made with &lt;3 in denver</p>
      </footer>
    );
  }
}

export default Footer;
