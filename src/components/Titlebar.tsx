import React from "react";

type TitlebarProps = {
  title?: string;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
};

const Titlebar = ({
  title = "Contact App",
  isCollapsed,
  setIsCollapsed,
}: TitlebarProps) => {
  return (
    <div
      style={{
        zIndex: 999,
      }}
      className="fixed top-0 left-0 w-screen h-16 bg-gray-900 text-white text-2xl font-bold z-50 flex items-center justify-center px-4 sm:px-6"
    >
      <div className="ml-auto flex justify-center">
        <button
          onClick={() => {
            setIsCollapsed(!isCollapsed);
          }}
          className="text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <div className="text-center flex-grow">{title}</div>
    </div>
  );
};

export default Titlebar;
