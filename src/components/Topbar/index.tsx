import React from "react";
import Image from "next/image";
import Navbar from "../Navbar";

const Topbar = () => {
  return (
    <div className="d-flex px-4">
      <div className="me-3">
        <Image alt="Logo" src="/netflix.png" width={150} height={100} />
      </div>
      <Navbar />
    </div>
  );
};

export default Topbar;
