// // import express from 'express'
// // import { getCourses, getAllCourses, createCourse, updateCourse, deleteCourse } from '../controllers/courseController.js'
// // import { protect } from '../middleware/authMiddleware.js'

// // const router = express.Router()

// // router.get('/',          getCourses)                  // public
// // router.get('/all',       protect, getAllCourses)       // admin (includes hidden)
// // router.post('/',         protect, createCourse)        // admin
// // router.put('/:id',       protect, updateCourse)        // admin
// // router.delete('/:id',    protect, deleteCourse)        // admin

// // export default router


// import express from 'express'
// import {
//   getCourses,
//   getAllCourses,
//   createCourse,
//   updateCourse,
//   deleteCourse
// } from '../controllers/courseController.js'

// import { protect } from '../middleware/authMiddleware.js'

// const router = express.Router()

// // ================= PUBLIC (Frontend use karega)
// router.get('/', getCourses)

// // ================= ADMIN (Dashboard use karega)
// router.get('/all', protect, getAllCourses)

// router.post('/', protect, createCourse)

// router.put('/:id', protect, updateCourse)

// router.delete('/:id', protect, deleteCourse)

// export default router




import upload from "../middleware/upload.js"
import express from 'express'
import {
  getCourses,
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse
} from '../controllers/courseController.js'

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getCourses)

router.get('/all', protect, getAllCourses)

// router.post('/', protect, createCourse)
router.post(
  '/',
  protect,
  upload.single("image"),
  createCourse
)

router.put('/:id', protect, updateCourse)

router.delete('/:id', protect, deleteCourse)

export default router