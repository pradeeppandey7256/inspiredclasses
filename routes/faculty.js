
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Faculty from '../models/Faculty.js';

const router = express.Router();

/* __dirname fix for ES module */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ─── Multer config (local upload) ──────────────────────── */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads/faculty');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `faculty_${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files allowed'), false);
  },
});


/* ─── Helper ─────────────────────────────────────────────── */
const buildPhotoUrl = (req, filename) =>
  `${req.protocol}://${req.get('host')}/uploads/faculty/${filename}`;

/* GET /api/faculty */
router.get('/', async (req, res) => {
  try {
    const { course } = req.query;
    const filter = { isActive: true };

    if (course && course !== 'All') {
      filter.courses = course;
    }

    const faculty = await Faculty.find(filter).sort({
      order: 1,
      createdAt: 1,
    });

    res.json({ success: true, data: faculty });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* GET /api/faculty/all */
router.get('/all', async (req, res) => {
  try {
    const faculty = await Faculty.find().sort({
      order: 1,
      createdAt: 1,
    });

    res.json({ success: true, data: faculty });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* GET /api/faculty/:id */
router.get('/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty not found',
      });
    }

    res.json({ success: true, data: faculty });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* POST /api/faculty */
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const body = { ...req.body };

    if (typeof body.courses === 'string') {
      try {
        body.courses = JSON.parse(body.courses);
      } catch {
        body.courses = body.courses
          .split(',')
          .map((s) => s.trim());
      }
    }

    if (req.file) {
      body.photo = buildPhotoUrl(req, req.file.filename);
    }

    const faculty = await Faculty.create(body);

    res.status(201).json({
      success: true,
      data: faculty,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

/* PUT /api/faculty/:id */
router.put('/:id', upload.single('photo'), async (req, res) => {
  try {
    const body = { ...req.body };

    if (typeof body.courses === 'string') {
      try {
        body.courses = JSON.parse(body.courses);
      } catch {
        body.courses = body.courses
          .split(',')
          .map((s) => s.trim());
      }
    }

    if (req.file) {
      body.photo = buildPhotoUrl(req, req.file.filename);

      const old = await Faculty.findById(req.params.id);

      if (old?.photo?.includes('/uploads/faculty/')) {
        const oldPath = path.join(
          __dirname,
          '../uploads/faculty',
          path.basename(old.photo)
        );

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    }

    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty not found',
      });
    }

    res.json({
      success: true,
      data: faculty,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

/* PATCH /api/faculty/:id/toggle */
router.patch('/:id/toggle', async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty not found',
      });
    }

    faculty.isActive = !faculty.isActive;
    await faculty.save();

    res.json({
      success: true,
      data: faculty,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* DELETE /api/faculty/:id */
router.delete('/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty not found',
      });
    }

    if (faculty.photo?.includes('/uploads/faculty/')) {
      const filePath = path.join(
        __dirname,
        '../uploads/faculty',
        path.basename(faculty.photo)
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.json({
      success: true,
      message: 'Faculty deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
export default router;
