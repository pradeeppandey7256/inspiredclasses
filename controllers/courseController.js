
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