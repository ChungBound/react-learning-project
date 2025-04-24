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
          <div className="flex bg-gray-900/80 items-center bg-white/10 backdrop-blur-md rounded-full py-2 px-6 shadow-lg">
            <span className="text-gray-200 text-sm font-medium mr-3">
              Created by ChungBound
            </span>

            <img
              src="/github-fill.svg"
              alt="GitHub"
              className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 invert"
            />
          </div>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
