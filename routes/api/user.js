const express = require("express");
const router = express.Router();
const User = require("../../model/user");

router.get("/", async (req, res) => {
  try {
    console.log("request params", req.params);
    const users = await User.find();
    console.log("users", users);
    res.json(users);
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    console.log("user", user);
    res.json(user || {});
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("request body", req.body);
    if (!req.body.name || !req.body.email) {
      res.status(422).send({ message: "name and email are required" });
    } else if (req.body.age && req.body.age < 18) {
      res.status(422).send({ message: "age should be greater than 18" });
    }

    //check for valid email

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    });
    await user.save();
    res.send(user);
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: "Internal Server Error", error: error });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
});

module.exports = router;
