// const mongoose = require('mongoose')

// const facultySchema = new mongoose.Schema({
//   name:         { type: String, required: true },
//   subject:      { type: String, required: true },
//   subjectLabel: { type: String, required: true },
//   qual:         { type: String, required: true },
//   exp:          { type: Number, required: true },
//   bio:          { type: String, required: true },
//   courses:      [{ type: String }],
//   photo:        { type: String, default: '' },
//   order:        { type: Number, default: 0 },
// }, { timestamps: true })

// module.exports = mongoose.model('Faculty', facultySchema)







import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    subjectLabel: {
      type: String,
      required: true,
      trim: true,
    },
    qual: {
      type: String,
      required: true,
      trim: true,
    },
    exp: {
      type: Number,
      required: true,
      min: 0,
    },
    bio: {
      type: String,
      required: true,
    },
    courses: {
      type: [String],
      enum: ['IIT-JEE', 'NEET', 'High School', 'Foundation'],
      required: true,
    },
    photo: {
      type: String,
      default: '',
    },
    iconType: {
      type: String,
      enum: [
        'Atom',
        'Sigma',
        'FlaskConical',
        'Microscope',
        'Sparkles',
        'PenTool',
      ],
      default: 'Atom',
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Faculty = mongoose.model('Faculty', facultySchema);

export default Faculty;