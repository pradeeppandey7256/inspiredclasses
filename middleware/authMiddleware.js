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


// 🔐 Protect route
export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "No token, unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({ message: "User not found" });
    }

    req.admin = admin;
    next();
  }catch (err) {
  console.error("JWT ERROR:", err);

  return res.status(401).json({
    message: "Token failed",
    error: err.message,
  });
}
};

// 👑 Admin only
export const adminOnly = (req, res, next) => {
  if (req.admin.role !== "admin" && req.admin.role !== "superadmin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};