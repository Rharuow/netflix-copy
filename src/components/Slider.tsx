import React from "react";
import classNames from "classnames";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./Slider.module.scss";

const Slider: React.FC<{
  centered?: boolean;
  children: JSX.Element[];
  show?: number;
  sizeButtons?: number;
}> = ({ centered = false, sizeButtons = 10, show = 1, children }) => {
  const className = classNames({ "justify-content-center": centered });

  return (
    <div className={`${style["slider-container"]} ${className}`}>
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
      {children.map((child, index) => (
        <div
          className={style["slider-item"]}
          key={index}
          style={{ flex: "0 0 auto", width: `${100 / show}%` }}
        >
          {child}
        </div>
      ))}
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
