import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

export default function Admin() {
  const [formData, setFormData] = useState(null);
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/portfolio`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error(err));
  }, []);

  // --- Work Experience Handlers ---
  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...(formData.experience || []),
        {
          title: "",
          company: "",
          location: "",
          duration: "",
          bullets: [],
          recommendationLink: "",
        },
      ],
    });
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExp = [...formData.experience];
    updatedExp[index][field] = value;
    setFormData({ ...formData, experience: updatedExp });
  };

  const addBullet = (expIndex) => {
    const updatedExp = [...formData.experience];
    if (!updatedExp[expIndex].bullets) updatedExp[expIndex].bullets = [];
    updatedExp[expIndex].bullets.push("");
    setFormData({ ...formData, experience: updatedExp });
  };

  const handleBulletChange = (expIndex, bulletIndex, value) => {
    const updatedExp = [...formData.experience];
    updatedExp[expIndex].bullets[bulletIndex] = value;
    setFormData({ ...formData, experience: updatedExp });
  };

  const removeBullet = (expIndex, bulletIndex) => {
    const updatedExp = [...formData.experience];
    updatedExp[expIndex].bullets = updatedExp[expIndex].bullets.filter(
      (_, i) => i !== bulletIndex,
    );
    setFormData({ ...formData, experience: updatedExp });
  };

  const removeExperience = (index) => {
    const updatedExp = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: updatedExp });
  };

  // --- Project Handlers ---
  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...(formData.projects || []),
        { title: "", description: [], tags: [], liveDemo: "", sourceCode: "" },
      ],
    });
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  const removeProject = (index) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: updatedProjects });
  };

  // --- Save Handler with Auto-Cleaning ---
  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("Saving...");
    try {
      // Clean data before sending: drop empty projects and clear empty tag/bullet strings
      const cleanedData = {
        ...formData,
        projects: (formData.projects || [])
          .filter((proj) => proj.title && proj.title.trim() !== "")
          .map((proj) => ({
            ...proj,
            tags: (proj.tags || []).filter((t) => t && t.trim() !== ""),
            description: (proj.description || []).filter(
              (d) => d && d.trim() !== "",
            ),
          })),
        experience: (formData.experience || [])
          .filter((exp) => exp.title && exp.company)
          .map((exp) => ({
            ...exp,
            bullets: (exp.bullets || []).filter((b) => b && b.trim() !== ""),
          })),
      };

      const res = await axios.put(`${API_URL}/api/portfolio`, cleanedData, {
        headers: { Authorization: password },
      });

      setFormData(res.data.portfolio); // Sync state with cleaned backend data
      setMessage(res.data.message);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Error saving data.",
      );
      console.error(err);
    }
  };

  if (!formData)
    return (
      <div style={{ color: "#fff", padding: "2rem" }}>
        Loading Admin Panel...
      </div>
    );

  if (!isAuthenticated) {
    return (
      <div
        style={{
          padding: "2rem",
          color: "#fff",
          backgroundColor: "#0f172a",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: "2rem",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h2>Admin Login</h2>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "0.5rem",
              marginTop: "1rem",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
          <button
            onClick={() => setIsAuthenticated(true)}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#0ea5e9",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Enter Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "2rem",
        color: "#fff",
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <h1>Admin Dashboard (Experience & Projects)</h1>
          <a href="/" target="_blank" style={{ color: "#38bdf8" }}>
            View Live Site ↗
          </a>
        </div>

        {message && (
          <div
            style={{
              padding: "1rem",
              backgroundColor: message.includes("Error")
                ? "#ef4444"
                : "#059669",
              marginBottom: "1rem",
              borderRadius: "4px",
            }}
          >
            {message}
          </div>
        )}

        <form
          onSubmit={handleSave}
          style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
          {/* Work Experience Section */}
          <div
            style={{
              backgroundColor: "#1e293b",
              padding: "1.5rem",
              borderRadius: "8px",
            }}
          >
            <h2 style={{ marginBottom: "1rem" }}>
              💼 Work Experience Management
            </h2>
            {formData.experience?.map((exp, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #334155",
                  padding: "1rem",
                  marginBottom: "1.5rem",
                  borderRadius: "6px",
                }}
              >
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) =>
                    handleExperienceChange(index, "title", e.target.value)
                  }
                  placeholder="Job Title"
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    marginBottom: "0.5rem",
                    backgroundColor: "#0f172a",
                    color: "#fff",
                    border: "1px solid #334155",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                />
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) =>
                    handleExperienceChange(index, "company", e.target.value)
                  }
                  placeholder="Company"
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    marginBottom: "0.5rem",
                    backgroundColor: "#0f172a",
                    color: "#fff",
                    border: "1px solid #334155",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) =>
                      handleExperienceChange(index, "location", e.target.value)
                    }
                    placeholder="Location"
                    style={{
                      flex: 1,
                      padding: "0.5rem",
                      backgroundColor: "#0f172a",
                      color: "#fff",
                      border: "1px solid #334155",
                      borderRadius: "4px",
                    }}
                  />
                  <input
                    type="text"
                    value={exp.duration}
                    onChange={(e) =>
                      handleExperienceChange(index, "duration", e.target.value)
                    }
                    placeholder="Duration"
                    style={{
                      flex: 1,
                      padding: "0.5rem",
                      backgroundColor: "#0f172a",
                      color: "#fff",
                      border: "1px solid #334155",
                      borderRadius: "4px",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "0.75rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.9rem",
                      marginBottom: "0.4rem",
                      color: "#94a3b8",
                    }}
                  >
                    Bullet Point Details:
                  </label>
                  {exp.bullets?.map((bullet, bIndex) => (
                    <div
                      key={bIndex}
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginBottom: "0.4rem",
                      }}
                    >
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) =>
                          handleBulletChange(index, bIndex, e.target.value)
                        }
                        placeholder={`Detail line ${bIndex + 1}`}
                        style={{
                          flex: 1,
                          padding: "0.4rem 0.5rem",
                          backgroundColor: "#0f172a",
                          color: "#fff",
                          border: "1px solid #334155",
                          borderRadius: "4px",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeBullet(index, bIndex)}
                        style={{
                          padding: "0.4rem 0.7rem",
                          backgroundColor: "#ef4444",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addBullet(index)}
                    style={{
                      padding: "0.3rem 0.8rem",
                      backgroundColor: "#334155",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      marginTop: "0.3rem",
                    }}
                  >
                    + Add Detail Line
                  </button>
                </div>

                <input
                  type="text"
                  value={exp.recommendationLink || ""}
                  onChange={(e) =>
                    handleExperienceChange(
                      index,
                      "recommendationLink",
                      e.target.value,
                    )
                  }
                  placeholder="Certificate / LOR Link URL (Optional)"
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    marginBottom: "0.75rem",
                    backgroundColor: "#0f172a",
                    color: "#fff",
                    border: "1px solid #334155",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                />

                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  style={{
                    padding: "0.4rem 0.8rem",
                    backgroundColor: "#ef4444",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                >
                  Delete Experience Entry
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addExperience}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#3b82f6",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              + Add Experience
            </button>
          </div>

          {/* Projects Section */}
          <div
            style={{
              backgroundColor: "#1e293b",
              padding: "1.5rem",
              borderRadius: "8px",
            }}
          >
            <h2 style={{ marginBottom: "1rem" }}>🚀 Projects Management</h2>
            {formData.projects?.map((project, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #334155",
                  padding: "1rem",
                  marginBottom: "1.5rem",
                  borderRadius: "6px",
                }}
              >
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) =>
                    handleProjectChange(index, "title", e.target.value)
                  }
                  placeholder="Project Title (e.g. WeatherGPT)"
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    marginBottom: "0.5rem",
                    backgroundColor: "#0f172a",
                    color: "#fff",
                    border: "1px solid #334155",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <input
                    type="text"
                    value={project.liveDemo || ""}
                    onChange={(e) =>
                      handleProjectChange(index, "liveDemo", e.target.value)
                    }
                    placeholder="Live Demo URL (Optional)"
                    style={{
                      flex: 1,
                      padding: "0.5rem",
                      backgroundColor: "#0f172a",
                      color: "#fff",
                      border: "1px solid #334155",
                      borderRadius: "4px",
                    }}
                  />
                  <input
                    type="text"
                    value={project.sourceCode || ""}
                    onChange={(e) =>
                      handleProjectChange(index, "sourceCode", e.target.value)
                    }
                    placeholder="GitHub Source Code URL"
                    style={{
                      flex: 1,
                      padding: "0.5rem",
                      backgroundColor: "#0f172a",
                      color: "#fff",
                      border: "1px solid #334155",
                      borderRadius: "4px",
                    }}
                  />
                </div>

                {/* Tech Stack Tags Manager */}
                <div style={{ marginBottom: "0.75rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.9rem",
                      marginBottom: "0.4rem",
                      color: "#94a3b8",
                    }}
                  >
                    Tech Stack / Categories:
                  </label>
                  {project.tags?.map((tag, tIndex) => (
                    <div
                      key={tIndex}
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginBottom: "0.4rem",
                      }}
                    >
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[index].tags[tIndex] = e.target.value;
                          setFormData({ ...formData, projects: updated });
                        }}
                        placeholder={`Tag ${tIndex + 1} (e.g. React, AI)`}
                        style={{
                          flex: 1,
                          padding: "0.4rem 0.5rem",
                          backgroundColor: "#0f172a",
                          color: "#fff",
                          border: "1px solid #334155",
                          borderRadius: "4px",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...formData.projects];
                          updated[index].tags = updated[index].tags.filter(
                            (_, i) => i !== tIndex,
                          );
                          setFormData({ ...formData, projects: updated });
                        }}
                        style={{
                          padding: "0.4rem 0.7rem",
                          backgroundColor: "#ef4444",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...formData.projects];
                      if (!updated[index].tags) updated[index].tags = [];
                      updated[index].tags.push("");
                      setFormData({ ...formData, projects: updated });
                    }}
                    style={{
                      padding: "0.3rem 0.8rem",
                      backgroundColor: "#334155",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      marginTop: "0.3rem",
                    }}
                  >
                    + Add Tech Tag
                  </button>
                </div>

                {/* Project Description Bullets Manager */}
                <div style={{ marginBottom: "0.75rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.9rem",
                      marginBottom: "0.4rem",
                      color: "#94a3b8",
                    }}
                  >
                    Project Description Bullets:
                  </label>
                  {project.description?.map((desc, dIndex) => (
                    <div
                      key={dIndex}
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginBottom: "0.4rem",
                      }}
                    >
                      <input
                        type="text"
                        value={desc}
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[index].description[dIndex] = e.target.value;
                          setFormData({ ...formData, projects: updated });
                        }}
                        placeholder={`Detail line ${dIndex + 1}`}
                        style={{
                          flex: 1,
                          padding: "0.4rem 0.5rem",
                          backgroundColor: "#0f172a",
                          color: "#fff",
                          border: "1px solid #334155",
                          borderRadius: "4px",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...formData.projects];
                          updated[index].description = updated[
                            index
                          ].description.filter((_, i) => i !== dIndex);
                          setFormData({ ...formData, projects: updated });
                        }}
                        style={{
                          padding: "0.4rem 0.7rem",
                          backgroundColor: "#ef4444",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...formData.projects];
                      if (!updated[index].description)
                        updated[index].description = [];
                      updated[index].description.push("");
                      setFormData({ ...formData, projects: updated });
                    }}
                    style={{
                      padding: "0.3rem 0.8rem",
                      backgroundColor: "#334155",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      marginTop: "0.3rem",
                    }}
                  >
                    + Add Detail Line
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  style={{
                    padding: "0.4rem 0.8rem",
                    backgroundColor: "#ef4444",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                >
                  Delete Project Entry
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addProject}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#3b82f6",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              + Add Project
            </button>
          </div>

          <button
            type="submit"
            style={{
              padding: "1rem",
              backgroundColor: "#0ea5e9",
              color: "#fff",
              border: "none",
              fontSize: "1.2rem",
              cursor: "pointer",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            Save All Changes
          </button>
        </form>
      </div>
    </div>
  );
}
