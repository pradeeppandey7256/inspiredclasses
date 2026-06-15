// import jwt from "jsonwebtoken";
// import Admin from "../models/Admin.js";

// // 🔐 Token
// function signToken(admin) {
//   return jwt.sign(
//     { id: admin._id, role: admin.role },
//     process.env.JWT_SECRET,
//     { expiresIn: "7d" }
//   );
// }

// // ✅ CREATE ADMIN
// export const createAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const exists = await Admin.findOne({ email });
//     if (exists) {
//       return res.status(400).json({ message: "Admin already exists" });
//     }

//     const admin = new Admin({
//       email,
//       password,
//     });

//     await admin.save(); // 🔥 HASHING YAHI HOGA

//     console.log("Saved Password:", admin.password);

//     res.status(201).json({
//       message: "Admin created successfully",
//       admin,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Error creating admin" });
//   }
// };

// // ✅ LOGIN
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const admin = await Admin.findOne({ email: email.toLowerCase() });

//     if (!admin || !(await admin.matchPassword(password))) {
//       return res.status(401).json({ message: "Invalid email or password." });
//     }

//     admin.lastLogin = new Date();
//     await admin.save();

//     res.json({
//       token: signToken(admin),
//       admin,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ GET ADMIN PROFILE
// export const getMe = (req, res) => {
//   res.json(req.admin);
// };



































import Admin from "../models/Admin.js";
import { signToken } from "../utils/jwt.js";

// 🔑 LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    admin.lastLogin = new Date();
    await admin.save();

    const token = signToken(admin._id);

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};