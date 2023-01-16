import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="d-flex align-items-center">
      <div className="me-3 fw-bold">
        <Link
          href="/"
          className={`text-gray-600-hover ${
            router.pathname === "/" ? "fw-bold text-gray-600" : " "
          }`}
        >
          Home
        </Link>
      </div>
      <div className="me-3 fw-bold">
        <Link
          href="/tv"
          className={`text-gray-600-hover ${
            router.pathname === "/tv" ? "fw-bold text-gray-600" : " "
          }`}
        >
          Séries
        </Link>
      </div>
      <div className="me-3 fw-bold">
        <Link
          href="/most-popular"
          className={`text-gray-600-hover ${
            router.pathname === "/most-popular" ? "fw-bold text-gray-600" : " "
          }`}
        >
          Populares
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
