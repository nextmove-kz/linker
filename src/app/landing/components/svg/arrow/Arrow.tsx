"use client";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import React from "react";

const Arrow = ({ className }: { className?: string }) => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  if (isMobile) {
    return (
      <svg
        width="12"
        height="41"
        viewBox="0 0 12 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 1C7 0.447715 6.55228 2.41411e-08 6 0C5.44772 -2.41411e-08 5 0.447715 5 1L7 1ZM6 41L11.7735 31L0.226496 31L6 41ZM5 1L5 4.33333L7 4.33333L7 1L5 1ZM5 11L5 17.6667L7 17.6667L7 11L5 11ZM5 24.3333L5 31L7 31L7 24.3333L5 24.3333ZM7 1C7 0.447715 6.55228 2.41411e-08 6 0C5.44772 -2.41411e-08 5 0.447715 5 1L7 1ZM6 41L11.7735 31L0.226496 31L6 41ZM5 1L5 4.33333L7 4.33333L7 1L5 1ZM5 11L5 17.6667L7 17.6667L7 11L5 11ZM5 24.3333L5 31L7 31L7 24.3333L5 24.3333Z"
          fill="#7B39ED"
        />
      </svg>
    );
  }

  return (
    <svg
      width="66"
      height="12"
      viewBox="0 0 66 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1 5C0.447715 5 4.82823e-08 5.44772 0 6C-4.82823e-08 6.55228 0.447715 7 1 7L1 5ZM66 6.00001L56 0.226502L56 11.7735L66 6.00001ZM1 7L4.25 7L4.25 5L1 5L1 7ZM10.75 7L17.25 7L17.25 5L10.75 5L10.75 7ZM23.75 7L30.25 7L30.25 5L23.75 5L23.75 7ZM36.75 7L43.25 7L43.25 5L36.75 5L36.75 7ZM49.75 7L56.25 7L56.25 5L49.75 5L49.75 7ZM1 5C0.447715 5 4.82823e-08 5.44772 0 6C-4.82823e-08 6.55228 0.447715 7 1 7L1 5ZM66 6.00001L56 0.226502L56 11.7735L66 6.00001ZM1 7L4.25 7L4.25 5L1 5L1 7ZM10.75 7L17.25 7L17.25 5L10.75 5L10.75 7ZM23.75 7L30.25 7L30.25 5L23.75 5L23.75 7ZM36.75 7L43.25 7L43.25 5L36.75 5L36.75 7ZM49.75 7L56.25 7L56.25 5L49.75 5L49.75 7Z"
        fill="#7B39ED"
      />
    </svg>
  );
};

export default Arrow;
