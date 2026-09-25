import React, { useState } from "react";

export default function Education({ educationList, currentColors }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div style={{ marginBottom: "5rem" }}>
      {/* Minimal Header matching the Projects section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "1.5rem",
          fontFamily: "'Courier New', Courier, monospace",
        }}
      >
        <div
          style={{
            fontSize: "0.95rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: currentColors.textDim,
          }}
        >
          Education
        </div>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}
      >
        {educationList.map((edu, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                backgroundColor: "transparent",
                border: `1px solid ${isHovered ? currentColors.textDim : currentColors.border}`,
                borderRadius: "4px",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                transition: "border-color 0.2s ease",
              }}
            >
              {/* Card Header: Degree Title */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "0.75rem",
                }}
              >
                <h4
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    margin: 0,
                    color: currentColors.textMain,
                    lineHeight: "1.4",
                  }}
                >
                  {edu.degree}
                </h4>
              </div>

              {/* Description: Institution */}
              <div
                style={{
                  color: currentColors.textDim,
                  fontSize: "0.95rem",
                  lineHeight: "1.6",
                  flexGrow: 1,
                  marginBottom: "1.5rem",
                }}
              >
                <p style={{ margin: 0 }}>{edu.institution}</p>
              </div>

              {/* Footer: Monospace Details (Duration & GPA) */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  flexWrap: "wrap",
                  gap: "1rem",
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: "0.85rem",
                }}
              >
                <span style={{ color: currentColors.textDim }}>
                  {edu.duration}
                </span>
                <span style={{ color: currentColors.textDim }}>{edu.gpa}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
