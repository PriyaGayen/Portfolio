import React from "react";

export default function Achievements({ achievementsList, currentColors }) {
  return (
    <div style={{ marginBottom: "5rem" }}>
      {/* Updated Section Header */}
      <div
        style={{
          fontSize: "0.95rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: currentColors.textDim,
          fontFamily: "'Courier New', Courier, monospace",
          marginBottom: "1.5rem",
        }}
      >
        Achievements & Courses
      </div>

      {/* Clean Text List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {achievementsList.map((ach, index) => (
          <div
            key={index}
            style={{
              color: currentColors.textDim,
              fontSize: "0.95rem",
              lineHeight: "1.6",
            }}
          >
            — {ach.text}{" "}
            {ach.link && (
              <a
                href={ach.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: currentColors.textMain,
                  textDecoration: "none",
                  fontWeight: "600",
                  fontFamily: "'Courier New', Courier, monospace",
                  borderBottom: `1px solid ${currentColors.textDim}`,
                  paddingBottom: "1px",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "#0ea5e9";
                  e.currentTarget.style.borderColor = "#0ea5e9";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = currentColors.textMain;
                  e.currentTarget.style.borderColor = currentColors.textDim;
                }}
              >
                [link]
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
