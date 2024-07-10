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

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
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
        access_token: token,
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
    if (!validUser) return res.status(404).json({error:"User not found!"});
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return res.status(401).json({error:"Email or password is wrong"});
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        message: "Login successfully!",
        data: {
          _id: validUser._id,
          fullName: validUser.fullName,
          email: validUser.email,
        },
        access_token: token,
      });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.user;

  const validUser = await User.findById(id);
  if (!validUser) return res.status(404).json("User not found!");

  const {password:pass, _v:v, ...user} = validUser._doc

  res.status(200).json(user);
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('Logout successfully!');
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};
