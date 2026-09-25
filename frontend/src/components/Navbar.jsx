import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function Navbar({ currentColors, theme, setTheme, name }) {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="navbar-container"
      style={{
        padding: "2.5rem 2rem 1.5rem 2rem",
        maxWidth: "768px",
        margin: "0 auto",
        boxSizing: "border-box",
        width: "100%",
        fontFamily: "'Courier New', Courier, monospace",
      }}
    >
      {/* Brand / Name */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          fontWeight: "700",
          fontSize: "1.1rem",
          cursor: "pointer",
          color: currentColors.textMain,
          letterSpacing: "-0.03em",
          whiteSpace: "nowrap", // Keeps name on one line
          marginRight: "1.5rem", // Space between name and scrolling links
        }}
      >
        {name.toLowerCase()}
      </div>

      {/* Nav Links & Aesthetic Theme Toggle */}
      <div className="nav-links-scroll">
        {["about", "skills", "experience", "projects", "education"].map(
          (sec) => (
            <button
              key={sec}
              onClick={() => scrollToSection(sec)}
              style={{
                background: "none",
                border: "none",
                color: currentColors.textDim,
                cursor: "pointer",
                fontSize: "0.95rem",
                fontWeight: "500",
                textTransform: "lowercase",
                fontFamily: "'Courier New', Courier, monospace",
                transition: "color 0.2s ease",
                padding: 0,
              }}
              onMouseOver={(e) =>
                (e.target.style.color = currentColors.textMain)
              }
              onMouseOut={(e) => (e.target.style.color = currentColors.textDim)}
            >
              {sec}
            </button>
          ),
        )}

        {/* Beautiful Minimalist Icon Toggle Button */}
        <button
          onClick={() =>
            setTheme(theme === "developer" ? "reader" : "developer")
          }
          style={{
            background: currentColors.pillBg || "transparent",
            border: `1px solid ${currentColors.border}`,
            borderRadius: "50%",
            width: "34px",
            height: "34px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0, // Prevents button from squishing in the scroll view
            cursor: "pointer",
            color: currentColors.textMain,
            marginLeft: "0.5rem",
            transition: "all 0.3s ease",
          }}
          title="Toggle Theme"
          onMouseOver={(e) => (e.currentTarget.style.borderColor = "#0ea5e9")}
          onMouseOut={(e) =>
            (e.currentTarget.style.borderColor = currentColors.border)
          }
        >
          {theme === "developer" ? <FiSun size={15} /> : <FiMoon size={15} />}
        </button>
      </div>
    </nav>
  );
}
