import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } =
    useContext(ThemeContext);

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
    >
      {theme === "light"
        ? "🌙 Dark Mode"
        : "☀️ Light Mode"}
    </button>
  );
}

export default ThemeToggle;