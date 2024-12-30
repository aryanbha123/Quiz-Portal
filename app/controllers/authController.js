import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Users from '../models/UserModel.js';
import { z as zod } from 'zod';
import { ADMIN_JWT_SECRET, COOKIE_OPTIONS, USER_JWT_SECRET } from '../config/config.js';

const generateToken = (id, role) => {
  const secretKey = role === "admin" ? ADMIN_JWT_SECRET : USER_JWT_SECRET;
  return jwt.sign({ id }, secretKey, { expiresIn: '7d' });
};

const setTokenCookie = (res, token, tokenName) => {
  res.cookie(tokenName, token, COOKIE_OPTIONS);
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required", status: false });
    }
    const user = await Users.findOne({ email: email.toLowerCase() }).lean(); // Using .lean()
    if (!user) {
      return res.status(404).json({ message: "User not found", status: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password", status: false });
    }

    const token = generateToken(user._id, user.role);
    const tokenName = user.role === "admin" ? 'admintoken' : 'usertoken';
    setTokenCookie(res, token, tokenName);

    res.status(200).json(user);
  } catch (error) {
    console.error("Sign-in error:", error);
    res.status(500).json({ message: "Internal Server Error", status: false });
  }
};

export const signup = async (req, res) => {
  const schema = zod.object({
    name: zod.string().min(3, "Name must be at least 3 characters").max(20, "Name must be less than 20 characters"),
    email: zod.string().email("Invalid email format"),
    password: zod.string().optional(),
  });

  try {
    const { name, email, password } = schema.parse(req.body);

    if (await Users.findOne({ email }).lean()) { 
      return res.status(400).json({ message: "Email is already taken" });
    }

    const newUser = new Users({
      name,
      email,
      password,
      image: req.body.image || undefined,
    });

    if (req.body.uid) {
      newUser._id = req.body.uid;
    }
    const user = await newUser.save();
    const token = generateToken(user._id, user.role);
    setTokenCookie(res, token, 'usertoken');

    res.status(201).json(user);
  } catch (error) {
    if (error instanceof zod.ZodError) {
      return res.status(400).json({ message: "Validation failed", errors: error.errors });
    }
    res.status(500).json({ message: "Internal Server Error", status: false });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await Users.findById(req.user?.id || req.user.uid ).select('-password').lean(); // Using .lean()
    if (!user) {
      return res.status(404).json({ message: "User not found", status: false });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message)
    res.status(401).json({ message: "Unauthorized User", status: false });
  }
};


export const logout = async (req, res) => {
  try {
    const { usertoken, admintoken } = req.cookies;
    if (!usertoken && !admintoken) {
      return res.status(401).json({ message: "Unauthorized User", status: false });
    }

    res.clearCookie('usertoken', COOKIE_OPTIONS);
    res.clearCookie('admintoken', COOKIE_OPTIONS);

    res.status(200).json({ message: "Logout successful", status: true });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal Server Error", status: false });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const firebaseUser = req.user;

    if (!firebaseUser) {
      return res.status(400).json({ message: "Invalid Google User Data", status: false });
    }

    const { email, displayName, uid, profile } = firebaseUser;

    let user = await Users.findOne({ email }).lean();

    if (!user) {
      user = new Users({
        name: displayName,
        email,
        password: uid,
        _id: uid,
        image: profile,
      });

      await user.save();
    }

    const token = generateToken(user._id, user.role);
    setTokenCookie(res, token, user.role == 'admin' ? 'admintoken' : 'usertoken');

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", status: false });
  }
};
