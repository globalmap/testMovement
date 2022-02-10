import React from "react";

export const ExampleSVG = ({ ...props }) => {
  return (
    <svg
      width="13"
      height="8"
      viewBox="0 0 13 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M1 1L6.5 7L12 1" stroke="black" />
    </svg>
  );
};
