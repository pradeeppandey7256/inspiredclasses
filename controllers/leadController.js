import Lead from "../models/Lead.js";

// ➕ CREATE LEAD
export const createLead = async (req, res) => {
  try {
    const { name, phone, course, source } = req.body;

    if (!name || !phone || !course) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const lead = await Lead.create({
      name,
      phone,
      course,
      source: source || "contact",
    });

    res.status(201).json({
      success: true,
      lead,
    });
  } catch (err) {
    console.log("Create Lead Error:", err);
    res.status(500).json({
      message: "Failed to create lead",
    });
  }
};

// 📥 GET ALL LEADS
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      leads,
    });
  } catch (err) {
    console.log("Get Leads Error:", err);
    res.status(500).json({
      message: "Failed to fetch leads",
    });
  }
};

// 🔄 UPDATE STATUS (optional but useful)
export const updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const lead = await Lead.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      lead,
    });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// ❌ DELETE (optional)
export const deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Lead deleted",
    });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};