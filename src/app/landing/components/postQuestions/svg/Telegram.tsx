import React from "react";

const Telegram = ({ width, height }: { width: number; height: number }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="60" height="60" rx="12" fill="#7B39ED" />
      <path
        d="M46.25 17.2685L41.1091 43.8031C41.1091 43.8031 40.3899 45.6428 38.4139 44.7605L26.5526 35.4492L26.4976 35.4218C28.0998 33.9488 40.5238 22.5119 41.0668 21.9934C41.9074 21.1905 41.3856 20.7126 40.4096 21.3191L22.0577 33.2513L14.9775 30.8123C14.9775 30.8123 13.8633 30.4065 13.7561 29.5242C13.6475 28.6405 15.0142 28.1625 15.0142 28.1625L43.8777 16.5695C43.8777 16.5695 46.25 15.5024 46.25 17.2685Z"
        fill="white"
      />
    </svg>
  );
};

export default Telegram;
