const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");

// GET Portfolio Data
router.get("/", async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = await Portfolio.create({
        profile: {
          name: "Priya Gayen",
          title: "Full Stack Developer",
          location: "Kolkata, India",
          email: "priyagayen74@gmail.com",
          about: "Welcome to my portfolio website!",
        },
      });
    }
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE Portfolio Data (Used by Admin Panel)
router.put("/", async (req, res) => {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const providedPassword = req.headers.authorization;

  if (providedPassword !== adminPassword) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Incorrect password!" });
  }

  try {
    let portfolio = await Portfolio.findOne();

    if (!portfolio) {
      portfolio = new Portfolio(req.body);
    } else {
      // Safely update specific fields to avoid Mongoose version/id conflicts
      portfolio.profile = req.body.profile || portfolio.profile;
      portfolio.skills = req.body.skills || portfolio.skills;
      portfolio.experience = req.body.experience || portfolio.experience;
      portfolio.projects = req.body.projects || portfolio.projects;
      portfolio.education = req.body.education || portfolio.education;
      portfolio.achievements = req.body.achievements || portfolio.achievements;
    }

    await portfolio.save();
    res.json({ message: "Portfolio updated successfully!", portfolio });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
