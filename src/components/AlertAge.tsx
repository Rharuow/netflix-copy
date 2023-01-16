import React from "react";

const AlertAge = ({ age = "18" }) => {
  return <span className="bg-danger rounded fw-bolder p-2">+{age}</span>;
};

export default AlertAge;
