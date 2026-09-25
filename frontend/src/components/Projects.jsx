import React, { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

export default function Projects({ projectList, currentColors }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const allTags = [...new Set(projectList.flatMap((p) => p.tags || []))];
  const categories = ["All", ...allTags];

  const filteredProjects = projectList.filter(
    (proj) =>
      proj.title &&
      (activeCategory === "All" || proj.tags?.includes(activeCategory)),
  );

  return (
    <div style={{ marginBottom: "5rem" }}>
      {/* Header aligned exactly like the reference */}
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
          Projects
        </div>

        {/* Minimal Category Filters aligned to the right */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: "0.9rem",
                color:
                  activeCategory === cat
                    ? currentColors.textMain
                    : currentColors.textDim,
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseOver={(e) =>
                (e.target.style.color = currentColors.textMain)
              }
              onMouseOut={(e) =>
                (e.target.style.color =
                  activeCategory === cat
                    ? currentColors.textMain
                    : currentColors.textDim)
              }
            >
              {cat.toLowerCase()} {activeCategory === cat && "→"}
            </button>
          ))}
        </div>
      </div>

      {/* Flat Project Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {filteredProjects.map((project, index) => {
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
              {/* Card Header: Title and Arrow */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1rem",
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
                  {project.title}
                </h4>
                <FiArrowUpRight
                  style={{
                    color: isHovered
                      ? currentColors.textMain
                      : currentColors.textDim,
                    fontSize: "1.1rem",
                    transition: "color 0.2s ease",
                    flexShrink: 0,
                    marginLeft: "1rem",
                  }}
                />
              </div>

              {/* Description: Formatted as clean paragraphs, no bullets */}
              <div
                style={{
                  color: currentColors.textDim,
                  fontSize: "0.95rem",
                  lineHeight: "1.6",
                  flexGrow: 1,
                  marginBottom: "1.5rem",
                }}
              >
                {project.description?.map((desc, i) =>
                  desc ? (
                    <p key={i} style={{ margin: "0 0 0.75rem 0" }}>
                      {desc}
                    </p>
                  ) : null,
                )}
              </div>

              {/* Footer: Subtle Minimal Tags & Links */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    flexWrap: "wrap",
                    maxWidth: "60%",
                  }}
                >
                  {project.tags?.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        fontSize: "0.85rem",
                        color: currentColors.textDim,
                        fontFamily: "'Courier New', Courier, monospace",
                      }}
                    >
                      {tag.toLowerCase()}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    fontSize: "0.85rem",
                    fontFamily: "'Courier New', Courier, monospace",
                  }}
                >
                  {project.sourceCode && (
                    <a
                      href={project.sourceCode}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: currentColors.textDim,
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.color = currentColors.textMain)
                      }
                      onMouseOut={(e) =>
                        (e.target.style.color = currentColors.textDim)
                      }
                    >
                      github.com
                    </a>
                  )}
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: currentColors.textDim,
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.color = currentColors.textMain)
                      }
                      onMouseOut={(e) =>
                        (e.target.style.color = currentColors.textDim)
                      }
                    >
                      live.demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
