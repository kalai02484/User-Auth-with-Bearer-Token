import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserAuth from "../models/userAuthModel.js";

// Load environment variables from .env file
dotenv.config();

export const userAuthRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await UserAuth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already Exists" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new UserAuth({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export const userAuthLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserAuth.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
