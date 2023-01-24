import React from "react";
import classNames from "classnames";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Slider: React.FC<{
  centered?: boolean;
  children: JSX.Element[];
  show?: number;
  sizeButtons?: number;
}> = ({ centered = true, sizeButtons = 10, show = 1, children }) => {
  const className = classNames({ "justify-content-center": centered });

  const elementsToShow = new Array<any>(show).fill(null);

  return (
    <div
      className={`d-flex position-relative ${className}`}
      style={{
        overflowX: "hidden",
        transition: "transform 0.7s ease-in-out",
      }}
    >
      <div
        className={`position-absolute start-0 h-100 w-${sizeButtons}px`}
        style={{ backgroundColor: "rgba(0,0,0,0.2)", zIndex: 10 }}
      >
        <div
          className={`position-absolute start-0 w-${sizeButtons}px`}
          style={{ top: `calc(50% - ${sizeButtons}px)`, zIndex: 10 }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
      </div>
      <div className="d-flex w-100">{children}</div>
      <div
        className={`position-absolute end-0 h-100 w-${sizeButtons}px`}
        style={{ backgroundColor: "rgba(0,0,0,0.2)", zIndex: 10 }}
      >
        <div
          className={`position-absolute end-0 w-${sizeButtons}px`}
          style={{ top: `calc(50% - ${sizeButtons}px)` }}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </div>
  );
};

export default Slider;
