


// import mongoose from 'mongoose'

// const courseSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true
//     },

//     sub: {
//       type: String,
//       default: ''
//     },

//     icon: {
//       type: String,
//       default: '📚'
//     },

//     color: {
//       type: String,
//       default: '#3B6EF8'
//     },

//     desc: {
//       type: String,
//       default: ''
//     },

//     /* ✅ CATEGORY UPDATED */
//     category: {
//       type: String,
//       required: true,
//       enum: [
//         'Pre-Foundation',
//         'Foundation',
//         'High School',
//         'IIT-JEE',
//         'NEET'
//       ]
//     },

//     features: [
//       {
//         type: String
//       }
//     ],

//     price: {
//       type: String,
//       default: ''
//     },

//     popular: {
//       type: Boolean,
//       default: false
//     },

//     hidden: {
//       type: Boolean,
//       default: false
//     },

//     order: {
//       type: Number,
//       default: 0
//     }
//   },
//   {
//     timestamps: true
//   }
// )

// export default mongoose.model('Course', courseSchema)


// models/Course.js

import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema(
  {
    // ───────────────── BASIC ─────────────────
    title: {
      type: String,
      required: true,
      trim: true,
    },

    desc: {
      type: String,
      trim: true,
      default: '',
    },

    category: {
      type: String,
      trim: true,
      default: 'Foundation',
    },

    sub: {
      type: String,
      trim: true,
      default: '',
    },

    // ───────────────── UI ─────────────────
    color: {
      type: String,
      default: '#4F46E5',
    },

    icon: {
      type: String,
      default: '📚',
    },

    image: {
      type: String,
      default: '',
    },

    // ───────────────── PRICING ─────────────────
    price: {
      type: Number,
      default: 0,
    },

    originalPrice: {
      type: Number,
      default: 0,
    },

    discountPct: {
      type: Number,
      default: 0,
    },

    // ───────────────── SOCIAL PROOF ─────────────────
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    studentsCount: {
      type: Number,
      default: 0,
    },

    // ───────────────── FEATURES ─────────────────
    features: {
      type: [String],
      default: [],
    },

    // ───────────────── FLAGS ─────────────────
    popular: {
      type: Boolean,
      default: false,
    },

    hidden: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Course = mongoose.model('Course', courseSchema)

export default Course