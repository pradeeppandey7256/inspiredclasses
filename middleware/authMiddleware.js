// import jwt from 'jsonwebtoken'
// import Admin from '../models/Admin.js'

// export async function protect(req, res, next) {
//   const auth = req.headers.authorization
//   if (!auth?.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Not authorised – no token' })
//   }

//   const token = auth.split(' ')[1]
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET)
//     req.admin = await Admin.findById(decoded.id).select('-password')
//     if (!req.admin) {
//       return res.status(401).json({ message: 'Admin not found' })
//     }
//     next()
//   } catch {
//     return res.status(401).json({ message: 'Token invalid or expired' })
//   }
// }

import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// 🔐 Protect middleware (token verify)
export const protect = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const token = auth.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    req.admin = admin;
    next();

  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

// 🔒 Admin-only middleware
export const adminOnly = (req, res, next) => {
  if (!req.admin || !["admin", "superadmin"].includes(req.admin.role)) {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};