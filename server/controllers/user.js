import { compare } from "bcrypt";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  sameSite: "none",
  secure: true,
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

    // console.log({ userNameOrEmail, password });

    const user = await User.findOne({
      $or: [{ username: userNameOrEmail }, { email: userNameOrEmail }],
    });
    // console.log(user);

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

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME }
    );
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME }
    );

    user.refreshToken = refreshToken;
    await user.save();

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json({
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
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    });
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME }
    );
    user.refreshToken = refreshToken;
    await user.save();
    // send response back with cookie containing token
    return res
      .status(201)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json({
        success: true,
        message: "User Sign In Successfully",
      });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-refreshToken");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Does Not Exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User data Fetched Successfully",
      user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const refreshTokens = async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh Token is Missing",
      });
    }

    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // console.log("decoded = ",decoded)

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Refresh Token",
      });
    }

    if (incomingRefreshToken !== user.refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh Token Expired",
      });
    }

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
      }
    );
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME }
    );

    user.refreshToken = refreshToken;
    await user.save();

    return res
      .status(201)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json({
        success: true,
        message: "Tokens Refreshed Successfully",
      });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export { login, signUp, refreshTokens, getUser };
