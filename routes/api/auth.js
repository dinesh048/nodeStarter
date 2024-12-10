const express = require("express");
const jwt = require("jsonwebtoken");
const Admin = require("../../model/admin");

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = new Admin({ username, password });
    await admin.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
