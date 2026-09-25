const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema(
  {
    profile: {
      name: { type: String, default: "" },
      title: { type: String, default: "" },
      location: { type: String, default: "" },
      email: { type: String, default: "" },
      about: { type: String, default: "" },
    },
    skills: {
      programming: [String],
      databases: [String],
      tools: [String],
      coursework: [String],
      softSkills: [String],
    },
    experience: [
      {
        title: String,
        company: String,
        location: String,
        duration: String,
        bullets: [String],
        recommendationLink: String,
      },
    ],
    projects: [
      {
        title: { type: String, default: "" },
        description: [String],
        tags: [String],
        liveDemo: { type: String, default: "" },
        sourceCode: { type: String, default: "" },
      },
    ],
    education: [
      {
        degree: String,
        institution: String,
        duration: String,
        gpa: String,
      },
    ],
    achievements: [
      {
        text: String,
        link: String,
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Portfolio", PortfolioSchema);
