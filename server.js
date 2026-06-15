
// // app.use(cors());
// // app.use(express.json());

// // app.use("/api/admin", adminRoutes);
// // import fs from 'fs'
// // import path from 'path'
// // import 'dotenv/config'
// // import express from 'express'
// // import cors from 'cors'
// // import helmet from 'helmet'
// // import morgan from 'morgan'
// // import rateLimit from 'express-rate-limit'

// // import connectDB from './config/db.js'
// // import contactRoutes from './routes/contactRoutes.js'
// // import adminRoutes from './routes/adminRoutes.js'
// // import chatbotRoutes from './routes/chatbotRoutes.js'
// // import courseRoutes from './routes/courseRoutes.js'
// // import leadRoutes from './routes/leadRoutes.js'
// // // import './models/Faculty.js' // Ensure Faculty model is registered
// // const app = express()
// // const PORT = process.env.PORT || 5001

// // // ─── Uploads Folder Setup ───────────────────────────────
// // const uploadsPath = path.join(process.cwd(), 'uploads')

// // if (!fs.existsSync(uploadsPath)) {
// //   fs.mkdirSync(uploadsPath, { recursive: true })
// //   console.log('📁 uploads folder created')
// // }

// // // ─── Connect DB ─────────────────────────────────────────
// // await connectDB()

// // // ─── Security Middleware ────────────────────────────────
// // app.use(helmet())



// // app.use(
// //   helmet({
// //     crossOriginResourcePolicy: false,
// //   })
// // )

// // app.use((req, res, next) => {
// //   res.removeHeader('Cross-Origin-Resource-Policy')
// //   next()
// // })

// // app.use(cors({
// //   origin:
// //     process.env.NODE_ENV === 'production'
// //       ? ['https://yourdomain.com']
// //       : ['http://localhost:5173', 'http://localhost:3000'],
// //   credentials: true,
// // }))

// // // ─── Rate Limiting ──────────────────────────────────────
// // const globalLimiter = rateLimit({
// //   windowMs: 15 * 60 * 1000,
// //   max: 200,
// //   message: {
// //     message: 'Too many requests, please try again later.',
// //   },
// // })

// // const contactLimiter = rateLimit({
// //   windowMs: 60 * 60 * 1000,
// //   max: 10,
// //   message: {
// //     message: 'Too many form submissions. Try again later.',
// //   },
// // })

// // app.use(globalLimiter)

// // // ─── Body Parser ────────────────────────────────────────
// // app.use(express.json({ limit: '10kb' }))
// // app.use(express.urlencoded({ extended: true }))

// // // ─── Logger ─────────────────────────────────────────────
// // if (process.env.NODE_ENV === 'development') {
// //   app.use(morgan('dev'))
// // }

// // // ─── Static Uploads Folder ──────────────────────────────
// // app.use('/uploads', express.static(uploadsPath))

// // // ─── Routes ─────────────────────────────────────────────
// // app.use('/api/admin', adminRoutes)
// // app.use('/api/chatbot', chatbotRoutes)
// // app.use('/api/courses', courseRoutes)
// // app.use('/api/contact', contactLimiter, contactRoutes)
// // app.use('/api/leads', leadRoutes)
// // // Admin routes mein
// // // app.use('/api/faculty', require('./routes/faculty'))

// // // ─── Health Check ───────────────────────────────────────
// // app.get('/api/health', (_, res) => {
// //   res.json({
// //     status: 'ok',
// //     env: process.env.NODE_ENV,
// //     time: new Date().toISOString(),
// //   })
// // })

// // // ─── 404 Handler ────────────────────────────────────────
// // app.use((req, res) => {
// //   res.status(404).json({
// //     message: `Route not found: ${req.originalUrl}`,
// //   })
// // })

// // // ─── Global Error Handler ───────────────────────────────
// // app.use((err, req, res, next) => {
// //   console.error('🔥 ERROR:', err)

// //   res.status(err.status || 500).json({
// //     message:
// //       process.env.NODE_ENV === 'production'
// //         ? 'Internal Server Error'
// //         : err.message,
// //   })
// // })

// // // ─── Start Server ───────────────────────────────────────
// // app.listen(PORT, () => {
// //   console.log(`🚀 Server running on http://localhost:${PORT}`)
// //   console.log(`🌍 Environment: ${process.env.NODE_ENV}`)
// // })





























































// import fs from 'fs'
// import path from 'path'
// import 'dotenv/config'
// import express from 'express'
// import cors from 'cors'
// import helmet from 'helmet'
// import morgan from 'morgan'
// import rateLimit from 'express-rate-limit'

// import connectDB from './config/db.js'
// import contactRoutes from './routes/contactRoutes.js'
// import adminRoutes from './routes/adminRoutes.js'
// import chatbotRoutes from './routes/chatbotRoutes.js'
// import courseRoutes from './routes/courseRoutes.js'
// import leadRoutes from './routes/leadRoutes.js'
// import facultyRoutes from './routes/faculty.js';
// const app = express()
// const PORT = process.env.PORT || 5001

// // Connect Database
// await connectDB()

// // Upload Folder
// const uploadsPath = path.join(process.cwd(), 'uploads')

// if (!fs.existsSync(uploadsPath)) {
//   fs.mkdirSync(uploadsPath, { recursive: true })
// }

// // Security
// app.use(
//   helmet({
//     crossOriginResourcePolicy: false,
//   })
// )

// app.use((req, res, next) => {
//   res.removeHeader('Cross-Origin-Resource-Policy')
//   next()
// })

// // ✅ Updated CORS
// app.use(
//   cors({
//     origin: [
//       'http://localhost:5173',
//       'http://localhost:5174',
//       'http://localhost:3000',
//     ],
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   })
// )

// // Handle Preflight Requests
// app.options('*', cors())

// // Rate Limiter
// const globalLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 200,
// })

// app.use(globalLimiter)

// // Body Parser
// app.use(express.json({ limit: '10kb' }))
// app.use(express.urlencoded({ extended: true }))

// // Logger
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'))
// }

// // Static Files
// app.use('/uploads', express.static(uploadsPath))

// // Routes
// app.use('/api/admin', adminRoutes)
// app.use('/api/chatbot', chatbotRoutes)
// app.use('/api/courses', courseRoutes)
// app.use('/api/contact', contactRoutes)
// app.use('/api/leads', leadRoutes)
// app.use('/api/faculty', facultyRoutes)
// // Health Check
// app.get('/api/health', (req, res) => {
//   res.json({
//     status: 'ok',
//     env: process.env.NODE_ENV,
//     time: new Date().toISOString(),
//   })
// })

// // 404
// app.use((req, res) => {
//   res.status(404).json({
//     message: `Route not found: ${req.originalUrl}`,
//   })
// })

// // Error Handler
// app.use((err, req, res, next) => {
//   console.error(err)

//   res.status(err.status || 500).json({
//     message:
//       process.env.NODE_ENV === 'production'
//         ? 'Internal Server Error'
//         : err.message,
//   })
// })

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`)
// })


































































































































import fs from "fs";
import path from "path";
import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import facultyRoutes from "./routes/faculty.js";

const app = express();
const PORT = process.env.PORT || 5001;

// Database Connection
try {
  await connectDB();
  console.log("✅ MongoDB Connected");
} catch (err) {
  console.error("❌ Database Connection Failed");
  console.error(err);
  process.exit(1);
}

// Upload Folder
const uploadsPath = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

// Security
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use((req, res, next) => {
  res.removeHeader("Cross-Origin-Resource-Policy");
  next();
});

// CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Body Parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Logger
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Rate Limiter
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Static Files
app.use("/uploads", express.static(uploadsPath));

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Inspired Classes Backend is Live",
  });
});

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/faculty", facultyRoutes);

// 404 Handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});