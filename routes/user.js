const express = require("express");
const router = express.Router();
const UserModal = require("../model/user");
router.post("/", async (req, res) => {
  try {
    const user = new UserModal({
      name: "Raj",
      email: "raj@gmail.com",
      age: 27,
    });

    await user.save();
    //todo add user to db
    res.send("user sucessfully created!");
  } catch (err) {
    console.log("err", err);
    res.send(err);
  }
});

router.get("/", async (req, res) => {
  const user = await UserModal.find();
  res.json(user);
});
module.exports = router;
