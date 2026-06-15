import express from 'express'
import { getConfig, updateConfig } from '../controllers/chatbotController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/config',   getConfig)              // public – chatbot widget reads this
router.put('/config',   protect, updateConfig)  // admin only

export default router
