// import mongoose from 'mongoose'

// const contactSchema = new mongoose.Schema(
//   {
//     name:    { type: String, required: true, trim: true },
//     phone:   { type: String, required: true, trim: true },
//     email:   { type: String, trim: true, lowercase: true, default: '' },
//     class:   { type: String, default: '' },
//     course:  { type: String, default: '' },
//     message: { type: String, default: '' },
//     source:  { type: String, enum: ['contact', 'popup', 'chatbot', 'other'], default: 'contact' },
//     status:  { type: String, enum: ['new', 'contacted', 'converted'], default: 'new' },
//     notes:   { type: String, default: '' },
//   },
//   { timestamps: true }
// )

// // Index for fast queries
// contactSchema.index({ status: 1, createdAt: -1 })
// contactSchema.index({ phone: 1 })

// export default mongoose.model('Contact', contactSchema)





import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true },
    phone:   { type: String, required: true, trim: true },
    email:   { type: String, trim: true, lowercase: true, default: '' },
    class:   { type: String, default: '' },
    course:  { type: String, default: '' },
    message: { type: String, default: '' },

    // 🔥 FIXED HERE (added "demo")
    source: {
      type: String,
      enum: ['contact', 'popup', 'chatbot', 'other', 'demo'],
      default: 'contact'
    },

    status: {
      type: String,
      enum: ['new', 'contacted', 'converted'],
      default: 'new'
    },

    notes: { type: String, default: '' },
  },
  { timestamps: true }
)

// Index for fast queries
contactSchema.index({ status: 1, createdAt: -1 })
contactSchema.index({ phone: 1 })

export default mongoose.model('Contact', contactSchema)