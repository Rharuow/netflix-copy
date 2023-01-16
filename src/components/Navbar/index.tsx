import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavbarComponent = () => {
  const router = useRouter();

  return (
    <Navbar variant="dark" expand="lg" className="w-100 justify-content-end ">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="">
          <div className="me-3 fw-bold text-end">
            <Link
              href="/"
              className={`text-gray-600-hover ${
                router.pathname === "/" ? "fw-bold text-gray-600" : " "
              }`}
            >
              Home
            </Link>
          </div>
          <div className="me-3 fw-bold text-end">
            <Link
              href="/tv"
              className={`text-gray-600-hover ${
                router.pathname === "/tv" ? "fw-bold text-gray-600" : " "
              }`}
            >
              Séries
            </Link>
          </div>
          <div className="me-3 fw-bold text-end">
            <Link
              href="/most-popular"
              className={`text-gray-600-hover ${
                router.pathname === "/most-popular"
                  ? "fw-bold text-gray-600"
                  : " "
              }`}
            >
              Populares
            </Link>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
