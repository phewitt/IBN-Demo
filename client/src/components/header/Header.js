import React, { Component } from "react";
import "./Header.css";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

class Header extends Component {
  render() {
    return (
      <div>
        <Navbar color="primary" dark expand="lg">
          <NavbarBrand href="/">CryptoSearch</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/">Graphs</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Header;
