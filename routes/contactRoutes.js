import express from 'express'
import { createContact, getLeads, updateLeadStatus, deleteLead } from '../controllers/contactController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/',             createContact)          // public
router.get('/leads',         protect, getLeads)      // admin
router.patch('/leads/:id',   protect, updateLeadStatus) // admin
router.delete('/leads/:id',  protect, deleteLead)    // admin

export default router
