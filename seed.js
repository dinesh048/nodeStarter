require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./model/admin");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Admin.deleteMany();

    const users = [
      { username: "admin", password: "admin123" },
      { username: "user1", password: "password1" },
    ];

    for (const userData of users) {
      const admin = new Admin(userData);
      await admin.save();
    }

    console.log("Seeding completed");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
})();
