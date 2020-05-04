import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './index.css';
function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="nav">
      <Navbar.Brand>STOCKY</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto nav">
          <Link className="nav-links" to="/">Find Prices</Link>
          <Link className="nav-links" to="/my-list">My List</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
