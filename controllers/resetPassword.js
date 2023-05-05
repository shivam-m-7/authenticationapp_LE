const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

exports.resetPassword = async (req, res) => {
  const { password, newPassword } = req.body;
  if (!password || !newPassword) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  try {
    const userExist = await User.findOne({
      email: req.user.email,
    });

    if (!userExist) {
      return res.status(400).json({
        error: true,
        message: "User does not exist.",
      });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.status(400).json({
        error: true,
        message: "Invalid credentials.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.findOneAndUpdate(
      { email: req.user.email },
      { password: hashedPassword },
      { new: true }
    );

    res.status(200).json({
      error: false,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
