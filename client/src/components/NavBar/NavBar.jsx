import React from "react";
import logo from "../../assets/ticketboxLogo.png";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="nav-container">
      <div className="nav-wrapper">
        <Navbar expand="lg" className="navbar text-light p-3">
          <Navbar.Brand as={Link} to="/home">
            <img
              src={logo}
              alt="Logo"
              className="nav-logo d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form className="d-flex mx-auto me-lg-3">
              <div className="search-container">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  id="search-icon"
                >
                  <path
                    d="M11 17a6 6 0 100-12 6 6 0 000 12zM18.5 18.5l-3-3"
                    stroke="#6c757d"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <input
                  type="text"
                  placeholder="Bạn tìm gì hôm nay?"
                  name="search-input"
                  id="search-input"
                  className="search-input fs-6"
                />
                <button className="search-button fs-6">Tìm kiếm</button>
              </div>
            </Form>
            <Nav className="ms-auto d-flex gap-3">
              <Button variant="outline-light rounded-pill fs-6">
                Create Event
              </Button>
              <Nav.Link as={Link} to="/my-booking" className="text-light fs-6">
                <i class="fa-solid fa-ticket"></i>Tickets You Buy
              </Nav.Link>
              <Nav.Link as={Link} to="/login" className="text-light fs-6">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register" className="text-light fs-6">
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
};

export default NavBar;
