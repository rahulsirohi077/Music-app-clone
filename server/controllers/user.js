import { compare } from "bcrypt";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  sameSite: "none",
  secure: true, 
  maxAge: 15 * 24 * 60 * 60 * 1000, 
};

const login = async (req, res) => {
  try {
    const { userNameOrEmail, password } = req.body;

    if (!userNameOrEmail || !password) {
      return res.status(401).json({
        success: false,
        message: "Please Provide all the fields",
      });
    }

    const user = await User.findOne({
      $or: [{ name: userNameOrEmail }, { email: userNameOrEmail }],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not Exist",
      });
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15d" });

    return res.status(200).cookie("Token", token, cookieOptions).json({
      success: true,
      message: "User Logged In Successfully",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const signUp = async (req, res) => {
  try {
    console.log(req.body);
    // fetch data
    const { username, email, password, confirmPassword } = req.body;

    // console.log("inside sign up function")
    // return res.status(200).json({
    //     success: true,
    //     userDetails: {
    //         username, email, password, confirmPassword
    //     }
    // })
    // validate
    if (!username || !email || !password || !confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Please Provide values of all the fields",
      });
    }

    const curUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (curUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and ConfirmPassword Does not Match",
      });
    }
    // create user entry in the database
    const user = await User.create({
      username,
      email,
      password,
    });

    // create payload and sign token

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
    // send response back with cookie containing token
    return res.status(201).cookie("Token", token, cookieOptions).json({
      success: true,
      message: "User Sign In Successfully",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export { login, signUp };
