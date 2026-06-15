import ChatbotConfig from '../models/ChatbotConfig.js'

const DEFAULT = {
greeting: "Hi 👋 I am your AI Study Assistant! How can I help you?",
  enabled: true,
  waNumber: '+91 7840030971',
  faqs: [
    { q: 'What courses do you offer?', a: 'Foundation (1-8), High School (9-10), IIT-JEE, and NEET preparation.' },
    { q: 'What are your fees?',        a: 'Starting from ₹2,499/month. Demo class is FREE!' },
    { q: 'Do you offer demo classes?', a: 'Yes! Free demo classes for all courses. Book via our website.' },
    { q: 'What is the batch size?',    a: 'We keep batches small — max 20 students for personal attention.' },
  ],
}

// GET /api/chatbot/config  – public (chatbot widget reads this)
export async function getConfig(req, res) {
  try {
    let config = await ChatbotConfig.findOne({ singleton: 'config' })
    if (!config) {
      config = await ChatbotConfig.create({ ...DEFAULT, singleton: 'config' })
    }
    res.json(config)
  } catch {
    res.status(500).json({ message: 'Failed to fetch chatbot config.' })
  }
}

// PUT /api/chatbot/config  – admin only
export async function updateConfig(req, res) {
  try {
    const { greeting, enabled, waNumber, faqs } = req.body
    const config = await ChatbotConfig.findOneAndUpdate(
      { singleton: 'config' },
      { greeting, enabled, waNumber, faqs },
      { new: true, upsert: true }
    )
    res.json(config)
  } catch {
    res.status(500).json({ message: 'Failed to update chatbot config.' })
  }
}
