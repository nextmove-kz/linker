import React from "react";

const Ellipse = ({ width, height }: { width?: number; height?: number }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 280 329"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        opacity="0.1"
        cx="33"
        cy="82"
        r="182"
        stroke="white"
        strokeWidth="129"
      />
    </svg>
  );
};

export default Ellipse;
