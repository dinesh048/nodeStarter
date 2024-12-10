require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3002;
const userRouter = require("./routes/api/user");
const authRoutes = require("./routes/api/auth");
const authenticateUser = require("./middleware/authMiddleware");
const db = require("./db");
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("Time:", Date.now());
  console.log("Request Type:", req.method);
  next();
});

app.use("/auth", authRoutes);
app.use("/user", authenticateUser, userRouter);

app.get("/", (req, res) => {
  console.log("!", req.query);
  res.send("Hello World!");
});

app.get("/about-us", (req, res) => {
  res.send("About US!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
