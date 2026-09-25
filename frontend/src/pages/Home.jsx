import React, { useState, useEffect } from "react";
import axios from "axios";
import { portfolioData } from "../data";
import { palettes } from "../theme";
import { FiGithub, FiLinkedin, FiExternalLink } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import Education from "../components/Education";
import Achievements from "../components/Achievements";
import ContactFooter from "../components/ContactFooter";
const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

// Minimalist Animated Spinner Component
const LoadingSpinner = ({ color }) => (
  <div style={{ display: "flex", justifyContent: "center", padding: "3rem 0" }}>
    <div
      style={{
        width: "30px",
        height: "30px",
        border: `3px solid ${color}33`, // 33 adds 20% opacity to the hex color
        borderTop: `3px solid ${color}`,
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

export default function Home() {
  const { hero, about, skills, education, achievements } = portfolioData;

  const [backendData, setBackendData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio-theme") || "developer";
  });

  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    setIsLoading(true); // Start loading
    axios
      .get(`${API_URL}/api/portfolio`)
      .then((res) => {
        setBackendData(res.data);
        setIsLoading(false); // Stop loading on success
      })
      .catch((err) => {
        console.error("Error fetching backend data:", err);
        setIsLoading(false); // Stop loading on error
      });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
        return;
      if (e.key.toLowerCase() === "t") {
        setTheme((prev) => (prev === "developer" ? "reader" : "developer"));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentColors = palettes[theme];
  const experienceList = backendData?.experience || [];
  const projectList = backendData?.projects || [];

  return (
    <div
      style={{
        backgroundColor: currentColors.bg,
        color: currentColors.textMain,
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
        transition: "all 0.3s ease",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Inline Flow Navbar */}
      <Navbar
        currentColors={currentColors}
        theme={theme}
        setTheme={setTheme}
        name={hero.name}
      />
      {/* Main Content Wrapper */}
      <div
        style={{
          width: "100%",
          maxWidth: "768px",
          margin: "0 auto",
          padding: "0 1.5rem",
          boxSizing: "border-box",
        }}
      >
        {/* Combined Hero & About Section */}
        <div
          id="about"
          className="hero-container"
          style={{
            marginBottom: "5rem",
            scrollMarginTop: "2rem",
          }}
        >
          <img
            src="/profile.png"
            alt={hero.name}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "1.5rem",
              border: `1px solid ${currentColors.border}`,
            }}
          />

          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              margin: "0 0 0.5rem 0",
              letterSpacing: "-0.04em",
              color: currentColors.textMain,
            }}
          >
            {hero.name}
          </h1>

          <h2
            style={{
              color: currentColors.textDim,
              fontSize: "1.1rem",
              fontWeight: "400",
              margin: "0 0 1.5rem 0",
            }}
          >
            {hero.title}
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            {about.map((p, i) => (
              <p
                key={i}
                style={{
                  color: currentColors.textDim,
                  lineHeight: "1.7",
                  margin: 0,
                  fontSize: "1rem",
                }}
              >
                {p}
              </p>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "1.25rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href={hero.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              style={{
                color: currentColors.textDim,
                fontSize: "1.5rem",
                transition: "color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.target.style.color = currentColors.textMain)
              }
              onMouseOut={(e) => (e.target.style.color = currentColors.textDim)}
            >
              <FiLinkedin />
            </a>
            <a
              href={hero.socials.github}
              target="_blank"
              rel="noreferrer"
              style={{
                color: currentColors.textDim,
                fontSize: "1.5rem",
                transition: "color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.target.style.color = currentColors.textMain)
              }
              onMouseOut={(e) => (e.target.style.color = currentColors.textDim)}
            >
              <FiGithub />
            </a>
            <a
              href={hero.socials.leetcode}
              target="_blank"
              rel="noreferrer"
              style={{
                color: currentColors.textDim,
                fontSize: "1.5rem",
                transition: "color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.target.style.color = currentColors.textMain)
              }
              onMouseOut={(e) => (e.target.style.color = currentColors.textDim)}
            >
              <SiLeetcode />
            </a>

            <button
              onClick={() => setShowResume(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 1rem",
                border: `1px solid ${currentColors.border}`,
                borderRadius: "6px",
                color: currentColors.textMain,
                backgroundColor: "transparent",
                cursor: "pointer",
                fontWeight: "500",
                fontSize: "0.9rem",
                marginLeft: "0.5rem",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = currentColors.pillBg)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <FiExternalLink style={{ fontSize: "1rem" }} /> Resume
            </button>
          </div>
        </div>

        {/* Minimalist Skills Section */}
        <div
          id="skills"
          style={{ marginBottom: "5rem", scrollMarginTop: "2rem" }}
        >
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
            Skills
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {/* Programming Languages */}
            <div>
              <h4
                style={{
                  fontSize: "1.05rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem",
                  color: currentColors.textMain,
                }}
              >
                Programming Languages
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {skills.programming?.map((s, i) => (
                  <span
                    key={i}
                    style={{
                      backgroundColor: "transparent",
                      color: currentColors.textDim,
                      border: `1px solid ${currentColors.border}`,
                      padding: "0.3rem 0.75rem",
                      borderRadius: "4px",
                      fontSize: "0.85rem",
                      fontFamily: "'Courier New', Courier, monospace",
                    }}
                  >
                    {s.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Database and Language */}
            <div>
              <h4
                style={{
                  fontSize: "1.05rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem",
                  color: currentColors.textMain,
                }}
              >
                Database and Language
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {skills.databases?.map((s, i) => (
                  <span
                    key={i}
                    style={{
                      backgroundColor: "transparent",
                      color: currentColors.textDim,
                      border: `1px solid ${currentColors.border}`,
                      padding: "0.3rem 0.75rem",
                      borderRadius: "4px",
                      fontSize: "0.85rem",
                      fontFamily: "'Courier New', Courier, monospace",
                    }}
                  >
                    {s.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <h4
                style={{
                  fontSize: "1.05rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem",
                  color: currentColors.textMain,
                }}
              >
                Tools
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {skills.tools?.map((t, i) => (
                  <span
                    key={i}
                    style={{
                      backgroundColor: "transparent",
                      color: currentColors.textDim,
                      border: `1px solid ${currentColors.border}`,
                      padding: "0.3rem 0.75rem",
                      borderRadius: "4px",
                      fontSize: "0.85rem",
                      fontFamily: "'Courier New', Courier, monospace",
                    }}
                  >
                    {t.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Course Work */}
            <div>
              <h4
                style={{
                  fontSize: "1.05rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem",
                  color: currentColors.textMain,
                }}
              >
                Course Work
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {skills.coursework?.map((c, i) => (
                  <span
                    key={i}
                    style={{
                      backgroundColor: "transparent",
                      color: currentColors.textDim,
                      border: `1px solid ${currentColors.border}`,
                      padding: "0.3rem 0.75rem",
                      borderRadius: "4px",
                      fontSize: "0.85rem",
                      fontFamily: "'Courier New', Courier, monospace",
                    }}
                  >
                    {c.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div>
              <h4
                style={{
                  fontSize: "1.05rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem",
                  color: currentColors.textMain,
                }}
              >
                Soft Skills
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {skills.softSkills?.map((s, i) => (
                  <span
                    key={i}
                    style={{
                      backgroundColor: "transparent",
                      color: currentColors.textDim,
                      border: `1px solid ${currentColors.border}`,
                      padding: "0.3rem 0.75rem",
                      borderRadius: "4px",
                      fontSize: "0.85rem",
                      fontFamily: "'Courier New', Courier, monospace",
                    }}
                  >
                    {s.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Minimalist Work Experience Section */}
        <div
          id="experience"
          style={{ marginBottom: "5rem", scrollMarginTop: "2rem" }}
        >
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
            Experience
          </div>

          {isLoading ? (
            <LoadingSpinner color={currentColors.textMain} />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2.5rem",
              }}
            >
              {experienceList
                .filter((e) => e.title && e.company)
                .map((exp, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    {/* Title and Duration Row */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        marginBottom: "0.25rem",
                      }}
                    >
                      <h4
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: "600",
                          margin: 0,
                          color: currentColors.textMain,
                        }}
                      >
                        {exp.title}
                      </h4>
                      <span
                        style={{
                          color: currentColors.textDim,
                          fontSize: "0.85rem",
                          fontFamily: "'Courier New', Courier, monospace",
                        }}
                      >
                        {exp.duration}
                      </span>
                    </div>

                    {/* Company and Location Row (Monospace) */}
                    <div
                      style={{
                        color: currentColors.textMain,
                        fontSize: "0.95rem",
                        marginBottom: "1rem",
                        fontFamily: "'Courier New', Courier, monospace",
                      }}
                    >
                      {exp.company}{" "}
                      <span style={{ color: currentColors.textDim }}>
                        — {exp.location}
                      </span>
                    </div>

                    {/* Clean Paragraph Bullets */}
                    <div
                      style={{
                        color: currentColors.textDim,
                        fontSize: "0.95rem",
                        lineHeight: "1.6",
                      }}
                    >
                      {exp.bullets?.map((b, bi) =>
                        b ? (
                          <p key={bi} style={{ margin: "0 0 0.5rem 0" }}>
                            — {b}
                          </p>
                        ) : null,
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Projects Section */}
        <div id="projects" style={{ scrollMarginTop: "2rem" }}>
          {isLoading ? (
            <div style={{ marginBottom: "5rem" }}>
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
                Projects
              </div>
              <LoadingSpinner color={currentColors.textMain} />
            </div>
          ) : (
            <Projects projectList={projectList} currentColors={currentColors} />
          )}
        </div>

        {/* Education Section */}
        <div id="education" style={{ scrollMarginTop: "2rem" }}>
          <Education educationList={education} currentColors={currentColors} />
        </div>

        {/* Achievements Section */}
        <Achievements
          achievementsList={achievements}
          currentColors={currentColors}
        />
      </div>

      {/* Contact & Footer Section */}
      <ContactFooter
        email={hero.email}
        name={hero.name}
        currentColors={currentColors}
      />
      {/* Embedded Resume Modal */}
      {showResume && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              width: "90%",
              maxWidth: "800px",
              height: "85vh",
              backgroundColor: currentColors.bg,
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              border: `1px solid ${currentColors.border}`,
            }}
          >
            {/* Modal Header with Close Button */}
            <div
              style={{
                padding: "0.5rem 1rem",
                display: "flex",
                justifyContent: "flex-end",
                backgroundColor: currentColors.pillBg,
              }}
            >
              <button
                onClick={() => setShowResume(false)}
                style={{
                  background: "transparent",
                  color: currentColors.textMain,
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>
            {/* PDF Viewer */}
            <iframe
              src={hero.socials.resumeUrl}
              width="100%"
              height="100%"
              style={{ border: "none", flexGrow: 1 }}
              title="Resume"
            />
          </div>
        </div>
      )}
    </div>
  );
}
