const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { encrypt, decrypt } = require("../utils/crypto.js");
const generateToken = require("../utils/jwtTokens.js");

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  try {
    const encryptedEmail = encrypt(email);
    const user = await User.findOne({ email: encryptedEmail });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = generateToken(
          {
            id: user._id.toString(),
            email: user.email,
            phoneNumber: user.phoneNumber,
          },
          "24h"
        );
        res.json({ message: "User signed in successfully", token });
      } else {
        res.json({ error: "Invalid credentials" });
      }
    } else {
      res.json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
};
