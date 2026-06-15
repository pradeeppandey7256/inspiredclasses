import express from "express";
import {
  createLead,
  getLeads,
  updateLeadStatus,
  deleteLead,
} from "../controllers/leadController.js";

const router = express.Router();

// Create
router.post("/", createLead);

// Get all
router.get("/", getLeads);

// Update status
router.put("/:id", updateLeadStatus);

// Delete
router.delete("/:id", deleteLead);

export default router;