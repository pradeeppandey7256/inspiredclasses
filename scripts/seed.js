/**
 * Seed script – run once:  npm run seed
 * Creates the default admin user and chatbot config.
 */

import 'dotenv/config'
import mongoose from 'mongoose'
import Admin from '../models/Admin.js'
import ChatbotConfig from '../models/ChatbotConfig.js'
import Course from '../models/Course.js'

await mongoose.connect(process.env.MONGO_URI)
console.log('Connected to MongoDB')

// ── Admin ────────────────────────────────────────────────────────────────────
const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL })
if (!existingAdmin) {
  await Admin.create({
    email:    process.env.ADMIN_EMAIL    || 'admin@Inspired-Classes.in',
    password: process.env.ADMIN_PASSWORD || 'admin123',
    name:     'Super Admin',
    role:     'superadmin',
  })
  console.log('✅ Admin created:', process.env.ADMIN_EMAIL)
} else {
  console.log('ℹ️  Admin already exists, skipping.')
}

// ── Chatbot Config ────────────────────────────────────────────────────────────
const existingChatbot = await ChatbotConfig.findOne({ singleton: 'config' })
if (!existingChatbot) {
  await ChatbotConfig.create({
    singleton: 'config',
    greeting: "Hi 👋 मैं आपका AI Study Assistant हूँ! कैसे मदद कर सकता हूँ?",
    enabled: true,
    waNumber: '+91 7840030971',
    faqs: [
      { q: 'What courses do you offer?', a: 'Foundation (1-8), High School (9-10), IIT-JEE, and NEET prep.' },
      { q: 'What are your fees?',        a: 'Starting ₹2,499/month. Demo is FREE!' },
      { q: 'Do you offer demo classes?', a: 'Yes! Free demo for all courses. Book on our website.' },
      { q: 'What is the batch size?',    a: 'Max 20 students per batch for personal attention.' },
    ],
  })
  console.log('✅ Chatbot config created')
} else {
  console.log('ℹ️  Chatbot config already exists, skipping.')
}

// ── Courses ───────────────────────────────────────────────────────────────────
const existingCourses = await Course.countDocuments()
if (existingCourses === 0) {
  await Course.insertMany([
    { title: 'Foundation',  sub: 'Class 1–8',  icon: '📚', color: '#3B6EF8', desc: 'Strong academic base with interactive learning.', features: ['CBSE & ICSE curriculum','Daily practice sheets','Monthly assessments','Parent progress reports'], price: '₹2,499/mo', popular: false, order: 1 },
    { title: 'High School', sub: 'Class 9–10', icon: '🎯', color: '#8B5CF6', desc: 'Board exam excellence with concept clarity.', features: ['All subjects covered','Mock board exams','Doubt clearing sessions','1-on-1 mentorship'], price: '₹3,499/mo', popular: true,  order: 2 },
    { title: 'IIT-JEE',     sub: 'Class 11–12',icon: '⚡', color: '#F5B731', desc: 'Crack JEE Main & Advanced with top faculty.', features: ['Physics, Chemistry, Math','10,000+ practice questions','All India mock tests','Rank booster sessions'], price: '₹5,999/mo', popular: false, order: 3 },
    { title: 'NEET',        sub: 'Class 11–12',icon: '🧬', color: '#06B6D4', desc: 'Medical entrance prep with in-depth coverage.', features: ['NCERT deep-dive','NEET pattern tests','Biology special batches','Daily MCQ practice'], price: '₹5,499/mo', popular: false, order: 4 },
  ])
  console.log('✅ Courses seeded')
} else {
  console.log('ℹ️  Courses already exist, skipping.')
}

await mongoose.disconnect()
console.log('\n✨ Seed complete!')
process.exit(0)
