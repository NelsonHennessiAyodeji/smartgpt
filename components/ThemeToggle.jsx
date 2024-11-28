"use client";

import { FiSun } from "react-icons/fi";
import { FaMoon } from "react-icons/fa6";
import { useState } from "react";

const themes = {
  nord: "nord",
  dim: "dim",
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(themes.nord);

  const toggleTheme = () => {
    const newTheme = theme === themes.nord ? themes.dim : themes.nord;
    // Because this is a client component, I can access the document element
    // Just found out that "documentElement" specifically refers to tht root elements
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button onClick={toggleTheme} className="btn btn-sm btn-outline">
      {theme === "nord" ? (
        <FaMoon className="h-4 w-4"></FaMoon>
      ) : (
        <FiSun className="h-4 w-4"></FiSun>
      )}
    </button>
  );
};

export default ThemeToggle;
