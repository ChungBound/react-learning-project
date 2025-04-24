import React from "react";

function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full py-4">
      <div className="container mx-auto flex justify-center items-center px-4">
        <a
          href="https://github.com/ChungBound/react-learning-project"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <div
            className="flex items-center rounded-full py-2 px-6 shadow-md bg-gray-900/60 backdrop-blur-md transition-all duration-300 group-hover:bg-gray-900 group-hover:bg-opacity-100 group-hover:backdrop-blur-none group-hover:shadow-lg group-hover:scale-110"
            style={{
              boxShadow: `rgba(0, 0, 0, 0.1) 0px 4px 6px 0px,
                          rgba(0, 0, 0, 0.08) 0px 6px 12px 0px`,
            }}
          >
            <span className="text-gray-200 text-sm font-medium mr-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              Created by ChungBound
            </span>

            <img
              src="/github-fill.svg"
              alt="GitHub"
              className="w-5 h-5 transition-transform duration-300 invert"
            />
          </div>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
