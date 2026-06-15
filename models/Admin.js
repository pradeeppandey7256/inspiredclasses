import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const adminSchema = new mongoose.Schema(
  {
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    name:     { type: String, default: 'Admin' },
    role:     { type: String, enum: ['superadmin', 'admin'], default: 'admin' },
    lastLogin:{ type: Date },
  },
  { timestamps: true }
)

// Hash password before save
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// Compare plain password to hash
adminSchema.methods.matchPassword = async function (plain) {
  return bcrypt.compare(plain, this.password)
}

// Remove password from JSON output
adminSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password
  return obj
}

export default mongoose.model('Admin', adminSchema)
