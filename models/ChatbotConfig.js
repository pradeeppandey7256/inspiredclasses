import mongoose from 'mongoose'

const faqSchema = new mongoose.Schema({
  q: { type: String, required: true },
  a: { type: String, required: true },
})

const chatbotConfigSchema = new mongoose.Schema(
  {
    greeting: {
      type: String,
      default: "Hi 👋 मैं आपका AI Study Assistant हूँ! कैसे मदद कर सकता हूँ?",
    },
    enabled:  { type: Boolean, default: true },
    waNumber: { type: String, default: '+91 7840030971' },
    faqs:     [faqSchema],
    // Singleton – only one config doc
    singleton: { type: String, default: 'config', unique: true },
  },
  { timestamps: true }
)

export default mongoose.model('ChatbotConfig', chatbotConfigSchema)
