const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: String,
  email: String,
});
module.exports = mongoose.model("User", userSchema);
