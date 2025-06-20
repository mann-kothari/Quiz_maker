// server/controllers/userController.js

const User = require("../models/User");

// Register a new user (after Firebase Auth)
const registerUser = async (req, res) => {
  const { uid, email, name } = req.body;

  try {
    let user = await User.findOne({ uid });

    if (!user) {
      user = new User({ uid, email, name });
      await user.save();
    }

    res.status(200).json({ message: "User registered", user });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Error registering user" });
  }
};

// Fetch user profile by UID
const getUserProfile = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

module.exports = {
  registerUser,
  getUserProfile,
};
