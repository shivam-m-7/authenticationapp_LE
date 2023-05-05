const { encrypt, decrypt } = require("../utils/crypto.js");
const User = require("../models/userSchema");
const {
  emailVerification,
  phoneNumberVerification,
  passwordVerification,
} = require("../utils/verification.js");

exports.updateUserInfo = async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;

    if (email && !emailVerification(email))
      return res.status(422).json({ error: "Invalid Email" });

    if (phoneNumber && !phoneNumberVerification(phoneNumber)) {
      return res.status(400).json({
        message: "Phone number must be 10 digits long",
      });
    }
    const id = req.user.id;
    console.log(id);

    const updatedUser = await User.findByIdAndUpdate(id, {
      name: name ? encrypt(name) : req.user.name,
      email: email ? encrypt(email) : req.user.email,
      phoneNumber: phoneNumber ? encrypt(phoneNumber) : req.user.phoneNumber,
    });

    if (updatedUser) {
      return res
        .status(200)
        .json({ error: false, message: "Profile updated successfully." });
    } else {
      return res.status(400).json({
        error: true,
        message:
          "Profile update failed. You are probably sending the wrong token",
      });
    }
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
