const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const { encrypt, decrypt } = require("../utils/crypto.js");
const {
  emailVerification,
  passwordVerification,
  phoneNumberVerification,
} = require("../utils/verification.js");

exports.signup = async (req, res) => {
  const { name, phoneNumber, email, password } = req.body;

  if (!name || !phoneNumber || !email || !password) {
    res.status(422).json({ error: "Please fill all the fields" });
  }

  if (!emailVerification(email))
    return res.status(422).json({ error: "Invalid Email" });

  if (!passwordVerification(password)) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
    });
  }

  if (!phoneNumberVerification(phoneNumber)) {
    return res.status(400).json({
      message: "Phone number must be 10 digits long",
    });
  }

  try {
    const checkEncryptedEmail = encrypt(email);
    const userExist = await User.findOne({ email: checkEncryptedEmail });
    if (userExist) return res.status(422).json({ error: "User already exist" });

    const encryptedName = encrypt(name);
    const encryptedPhoneNumber = encrypt(phoneNumber);
    const encryptedEmail = encrypt(email);
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name: encryptedName,
      phoneNumber: encryptedPhoneNumber,
      email: encryptedEmail,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
