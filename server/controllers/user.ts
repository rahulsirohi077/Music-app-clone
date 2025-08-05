import { compare } from "bcrypt";
import { User } from "../models/user.js";
import jwt, { type SignOptions } from "jsonwebtoken";
import fs from "fs";
import path from "path";
import type { Request, Response } from "express";
import type { IUser, JwtPayload } from "../declarations";

const cookieOptions = {
  httpOnly: true,
  sameSite: "none" as const,
  secure: true,
};

const login = async (req: Request, res: Response) => {
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
      { id: user._id.toString() } as JwtPayload,
      process.env.ACCESS_TOKEN_SECRET || "default_secret",
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME || "1h" } as SignOptions
    );
    const refreshToken = jwt.sign(
      { id: user._id.toString() } as JwtPayload,
      process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret",
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME || "7d",
      } as SignOptions
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
        user,
      });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

const signUp = async (req: Request, res: Response) => {
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
    const user = (await User.create({
      username,
      email,
      password,
    })) as IUser;

    // create payload and sign token

    const payload = {
      id: user._id.toString(),
    };
    const accessToken = jwt.sign(
      payload as JwtPayload,
      process.env.ACCESS_TOKEN_SECRET || "default_secret",
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME || "1h" } as SignOptions
    );
    const refreshToken = jwt.sign(
      payload as JwtPayload,
      process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret",
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME || "7d",
      } as SignOptions
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
        user,
      });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = await User.findById((req.user as any).id).select(
      "-refreshToken"
    );

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
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

const refreshTokens = async (req: Request, res: Response) => {
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
      process.env.REFRESH_TOKEN_SECRET as string
    ) as { id: string };

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
      { id: user._id.toString() } as JwtPayload,
      process.env.ACCESS_TOKEN_SECRET || "default_secret",
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME || "1h" } as SignOptions
    );
    const refreshToken = jwt.sign(
      { id: user._id.toString() } as JwtPayload,
      process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret",
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME || "7d",
      } as SignOptions
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
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

const updateInfo = async (req: Request, res: Response) => {
  try {
    const profilePic = req.file;
    const { username, password } = req.body;

    // @ts-ignore
    const user = await User.findById((req.user as any).id);
    if (user) {
      if (username) {
        user.username = username;
      }
      if (password) {
        user.password = password;
      }
      await user.save();
    }
    console.log("Profile Pic = " + profilePic);

    let fileUrl = null;

    if (profilePic) {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found while updating profile picture",
        });
      }
      const ext = path.extname(profilePic.originalname);
      const newFileName = user.username + ext;
      const newPath = path.join(profilePic.destination, newFileName);

      // Rename the uploaded file
      fs.renameSync(profilePic.path, newPath);

      fileUrl = `/uploads/${newFileName}`;
    }

    return res.status(200).json({
      success: true,
      message: "Information Updated Successfully",
      profilePicUrl: fileUrl || null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

const Logout = async (req: Request, res: Response) => {
  return res
    .status(200)
    .cookie("accessToken", "", { ...cookieOptions, maxAge: 0 })
    .cookie("refreshToken", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
};

export { login, signUp, refreshTokens, getUser, updateInfo, Logout };
