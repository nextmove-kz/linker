"use client";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import React from "react";

const FinalArrow = ({ isRoadmap }: { isRoadmap?: boolean }) => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  if (isMobile && isRoadmap) {
    return (
      <svg
        width="2"
        height="42"
        viewBox="0 0 2 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L0.999998 41"
          stroke="#7B39ED"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 6"
        />
      </svg>
    );
  }

  return (
    <svg
      width="67"
      height="2"
      viewBox="0 0 67 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L66 1.00001"
        stroke="#7B39ED"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 6"
      />
    </svg>
  );
};

export default FinalArrow;
