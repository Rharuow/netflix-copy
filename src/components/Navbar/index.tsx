import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="d-flex align-items-center">
      <div className="me-3 fw-bold">
        <Link href="/" className="text-gray-600-hover">
          Home
        </Link>
      </div>
      <div className="me-3 fw-bold">
        <Link href="#" className="text-gray-600-hover">
          Populares
        </Link>
      </div>
      <div className="me-3 fw-bold">
        <Link href="#" className="text-gray-600-hover">
          TV
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
