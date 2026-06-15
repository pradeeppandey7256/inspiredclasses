// // import Course from '../models/Course.js'

// // const SEED_COURSES = [
// //   { title: 'Foundation',  sub: 'Class 1–8',  icon: '📚', color: '#3B6EF8', desc: 'Strong academic base with interactive learning.', features: ['CBSE & ICSE curriculum','Daily practice sheets','Monthly assessments','Parent progress reports'], price: '₹2,499/mo', popular: false, order: 1 },
// //   { title: 'High School', sub: 'Class 9–10', icon: '🎯', color: '#8B5CF6', desc: 'Board exam excellence with concept clarity.', features: ['All subjects covered','Mock board exams','Doubt clearing sessions','1-on-1 mentorship'], price: '₹3,499/mo', popular: true,  order: 2 },
// //   { title: 'IIT-JEE',     sub: 'Class 11–12',icon: '⚡', color: '#F5B731', desc: 'Crack JEE Main & Advanced with top faculty.', features: ['Physics, Chemistry, Math','10,000+ practice questions','All India mock tests','Rank booster sessions'], price: '₹5,999/mo', popular: false, order: 3 },
// //   { title: 'NEET',        sub: 'Class 11–12',icon: '🧬', color: '#06B6D4', desc: 'Medical entrance prep with deep subject coverage.', features: ['NCERT deep-dive','NEET pattern tests','Biology special batches','Daily MCQ practice'], price: '₹5,499/mo', popular: false, order: 4 },
// // ]

// // // GET /api/courses  – public
// // export async function getCourses(req, res) {
// //   try {
// //     let courses = await Course.find({ hidden: { $ne: true } }).sort({ order: 1 })
// //     if (courses.length === 0) {
// //       courses = await Course.insertMany(SEED_COURSES)
// //     }
// //     res.json(courses)
// //   } catch {
// //     res.status(500).json({ message: 'Failed to fetch courses.' })
// //   }
// // }

// // // GET /api/courses/all  – admin (includes hidden)
// // export async function getAllCourses(req, res) {
// //   try {
// //     const courses = await Course.find().sort({ order: 1 })
// //     res.json(courses)
// //   } catch {
// //     res.status(500).json({ message: 'Failed to fetch courses.' })
// //   }
// // }

// // // POST /api/courses  – admin
// // export async function createCourse(req, res) {
// //   try {
// //     const course = await Course.create(req.body)
// //     res.status(201).json(course)
// //   } catch {
// //     res.status(500).json({ message: 'Failed to create course.' })
// //   }
// // }

// // // PUT /api/courses/:id  – admin
// // export async function updateCourse(req, res) {
// //   try {
// //     const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
// //     if (!course) return res.status(404).json({ message: 'Course not found.' })
// //     res.json(course)
// //   } catch {
// //     res.status(500).json({ message: 'Failed to update course.' })
// //   }
// // }

// // // DELETE /api/courses/:id  – admin
// // export async function deleteCourse(req, res) {
// //   try {
// //     const course = await Course.findByIdAndDelete(req.params.id)
// //     if (!course) return res.status(404).json({ message: 'Course not found.' })
// //     res.json({ message: 'Course deleted.' })
// //   } catch {
// //     res.status(500).json({ message: 'Failed to delete course.' })
// //   }
// // }



























// import Course from '../models/Course.js'

// const SEED_COURSES = [
//   {
//     title: 'Foundation',
//     category: 'Foundation',
//     sub: 'Class 1–8',
//     icon: '📚',
//     color: '#3B6EF8',
//     desc: 'Strong academic base with interactive learning.',
//     features: [
//       'CBSE & ICSE curriculum',
//       'Daily practice sheets',
//       'Monthly assessments',
//       'Parent progress reports'
//     ],
//     price: '₹2,499/mo',
//     popular: false,
//     order: 1
//   },

//   {
//     title: 'High School',
//     category: 'High School',
//     sub: 'Class 9–10',
//     icon: '🎯',
//     color: '#8B5CF6',
//     desc: 'Board exam excellence with concept clarity.',
//     features: [
//       'All subjects covered',
//       'Mock board exams',
//       'Doubt clearing sessions',
//       '1-on-1 mentorship'
//     ],
//     price: '₹3,499/mo',
//     popular: true,
//     order: 2
//   },

//   {
//     title: 'IIT-JEE',
//     category: 'IIT-JEE',
//     sub: 'Class 11–12',
//     icon: '⚡',
//     color: '#F5B731',
//     desc: 'Crack JEE Main & Advanced with top faculty.',
//     features: [
//       'Physics, Chemistry, Math',
//       '10,000+ practice questions',
//       'All India mock tests',
//       'Rank booster sessions'
//     ],
//     price: '₹5,999/mo',
//     popular: false,
//     order: 3
//   },

//   {
//     title: 'NEET',
//     category: 'NEET',
//     sub: 'Class 11–12',
//     icon: '🧬',
//     color: '#06B6D4',
//     desc: 'Medical entrance prep with deep subject coverage.',
//     features: [
//       'NCERT deep-dive',
//       'NEET pattern tests',
//       'Biology special batches',
//       'Daily MCQ practice'
//     ],
//     price: '₹5,499/mo',
//     popular: false,
//     order: 4
//   }
// ]

// // GET /api/courses  – public
// export async function getCourses(req, res) {
//   try {
//     let courses = await Course.find({
//       hidden: { $ne: true }
//     }).sort({ order: 1 })

//     if (courses.length === 0) {
//       courses = await Course.insertMany(SEED_COURSES)
//     }

//     res.json(courses)

//   } catch {
//     res.status(500).json({
//       message: 'Failed to fetch courses.'
//     })
//   }
// }

// // GET /api/courses/all  – admin
// export async function getAllCourses(req, res) {
//   try {
//     const courses = await Course.find().sort({ order: 1 })

//     res.json(courses)

//   } catch {
//     res.status(500).json({
//       message: 'Failed to fetch courses.'
//     })
//   }
// }

// // POST /api/courses  – admin
// export async function createCourse(req, res) {
//   try {
//     const {
//       title,
//       category,
//       sub,
//       icon,
//       color,
//       desc,
//       features,
//       price,
//       popular,
//       hidden,
//       order
//     } = req.body

//     const course = await Course.create({
//       title,
//       category,
//       sub,
//       icon,
//       color,
//       desc,
//       features,
//       price,
//       popular,
//       hidden,
//       order
//     })

//     res.status(201).json(course)

//   } catch (err) {
//     console.log(err)

//     res.status(500).json({
//       message: 'Failed to create course.'
//     })
//   }
// }

// // PUT /api/courses/:id  – admin
// export async function updateCourse(req, res) {
//   try {
//     const course = await Course.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     )

//     if (!course) {
//       return res.status(404).json({
//         message: 'Course not found.'
//       })
//     }

//     res.json(course)

//   } catch {
//     res.status(500).json({
//       message: 'Failed to update course.'
//     })
//   }
// }

// // DELETE /api/courses/:id  – admin
// export async function deleteCourse(req, res) {
//   try {
//     const course = await Course.findByIdAndDelete(req.params.id)

//     if (!course) {
//       return res.status(404).json({
//         message: 'Course not found.'
//       })
//     }

//     res.json({
//       message: 'Course deleted.'
//     })

//   } catch {
//     res.status(500).json({
//       message: 'Failed to delete course.'
//     })
//   }
// }




import Course from '../models/Course.js'

// ================= GET PUBLIC COURSES
export async function getCourses(req, res) {
  try {
    const courses = await Course.find().sort({ createdAt: -1 })

    res.json(courses)

  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Failed to fetch courses'
    })
  }
}

// ================= GET ALL COURSES (ADMIN)
export async function getAllCourses(req, res) {
  try {
    const courses = await Course.find().sort({ createdAt: -1 })

    res.json(courses)

  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Failed to fetch all courses'
    })
  }
}

// ================= CREATE COURSE
// export async function createCourse(req, res) {
//   try {
//     const {
//       title,
//       desc,
//       category,
//       sub,
//       color,
//       image,
//       price,
//       originalPrice,
//       discountPct,
//       rating,
//       studentsCount,
//       features,
//       popular
//     } = req.body

//     const course = await Course.create({
//       title,
//       desc,
//       category,
//       sub,
//       color,
//       image,
//       price,
//       originalPrice,
//       discountPct,
//       rating,
//       studentsCount,
//       features,
//       popular
//     })

//     res.status(201).json(course)

//   } catch (error) {
//     console.log(error)

//     res.status(500).json({
//       message: 'Failed to create course'
//     })
//   }
// }
export async function createCourse(req, res) {
  try {
    const {
      title,
      desc,
      category,
      sub,
      color,
      price,
      originalPrice,
      discountPct,
      rating,
      studentsCount,
      features,
      popular
    } = req.body

    const course = await Course.create({
      title,
      desc,
      category,
      sub,
      color,

      image: req.file
        ? `/uploads/${req.file.filename}`
        : "",

      price,
      originalPrice,
      discountPct,
      rating,
      studentsCount,
      features,
      popular
    })

    res.status(201).json(course)

  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Failed to create course'
    })
  }
}

// ================= UPDATE COURSE
export async function updateCourse(req, res) {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!course) {
      return res.status(404).json({
        message: 'Course not found'
      })
    }

    res.json(course)

  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Failed to update course'
    })
  }
}

// ================= DELETE COURSE
export async function deleteCourse(req, res) {
  try {
    const course = await Course.findByIdAndDelete(req.params.id)

    if (!course) {
      return res.status(404).json({
        message: 'Course not found'
      })
    }

    res.json({
      message: 'Course deleted successfully'
    })

  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Failed to delete course'
    })
  }
}