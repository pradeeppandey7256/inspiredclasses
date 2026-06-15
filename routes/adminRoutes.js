// 


// import express from "express";
// import { createAdmin, login, getMe } from "../controllers/adminController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/create-admin", createAdmin);
// router.post("/login", login);
// router.get("/me", protect, getMe);

// export default router;








































// import express from "express";
// import { createAdmin, login, getMe } from "../controllers/adminController.js";
// import { protect, adminOnly } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // 🔐 Create Admin (ONLY first time / superadmin)
// router.post("/create-admin", createAdmin);

// // 🔑 Login
// router.post("/login", login);

// // 👤 Get logged-in admin profile
// router.get("/me", protect, getMe);

// // 🔒 Example: Admin-only test route
// router.get("/dashboard", protect, adminOnly, (req, res) => {
//   res.json({
//     message: "Welcome Admin",
//     admin: req.admin,
//   });
// });

// export default router;











































import express from "express";
import { login } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔑 Login
router.post("/login", login);

// 👤 profile
router.get("/me", protect, (req, res) => {
  res.json(req.admin);
});

// 🔒 admin dashboard
router.get("/dashboard", protect, adminOnly, (req, res) => {
  res.json({
    message: "Welcome Admin",
    admin: req.admin,
  });
});

export default router;