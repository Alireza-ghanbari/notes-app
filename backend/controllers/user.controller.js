import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (password.length < 4) {
      return res.status(400).json({
        error: "Password must be at least 4 characters long",
      });
    }

    const newUser = await User.create({
      fullName,
      email,
      password: bcryptjs.hashSync(password, 10),
    });

    const token = jwt.sign({ newUser }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        message: "Account create successfully!",
        data: {
          _id: newUser._id,
          fullName,
          email,
        },
        access_token : token
      });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return res.status(404).json("User not found!");
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return res.status(401).json("Email or password is wrong");
    const token = jwt.sign({ validUser }, process.env.JWT_SECRET);

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        message: "Login successfully!",
        data: {
          _id: validUser._id,
          fullName : validUser.fullName,
          email : validUser.email,
        },
        access_token : token
      });
  } catch (error) {
    res.status(500).json({
        error: "Internal Server Error",
        message: error.message,
      });
  }
};
