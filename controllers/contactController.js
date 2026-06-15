
import Contact from '../models/Contact.js'

/* =========================
   CREATE CONTACT (LEAD CREATE)
========================= */
export async function createContact(req, res) {
  try {
    const { name, phone, email, class: cls, course, message, source } = req.body

    if (!name?.trim() || !phone?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name and phone required',
      })
    }

    if (!/^\d{10}$/.test(phone.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Phone must be 10 digits',
      })
    }




const lead = await Contact.create({
  name: name.trim(),
  phone: phone.trim(),
  email: email || "",
  class: cls || "",
  course,
  message: message || "",
  source: "contact",   // ⭐ FIX FIX FIX
  status: "new"
})





    return res.status(201).json({
      success: true,
      message: 'Lead created',
      data: lead
    })

  } catch (err) {
    console.log(err)

    return res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

/* =========================
   GET LEADS (ADMIN PANEL)
========================= */
export async function getLeads(req, res) {
  try {
    const { status, source, page = 1, limit = 50 } = req.query

    const filter = {}
    if (status && status !== 'all') filter.status = status
    if (source) filter.source = source

    const leads = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))

    const total = await Contact.countDocuments(filter)

    return res.json({
      success: true,
      data: leads,
      meta: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    })

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch leads'
    })
  }
}

/* =========================
   UPDATE LEAD
========================= */
export async function updateLeadStatus(req, res) {
  try {
    const lead = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      })
    }

    return res.json({
      success: true,
      data: lead
    })

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Update failed'
    })
  }
}

/* =========================
   DELETE LEAD
========================= */
export async function deleteLead(req, res) {
  try {
    const lead = await Contact.findByIdAndDelete(req.params.id)

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      })
    }

    return res.json({
      success: true,
      message: 'Lead deleted'
    })

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Delete failed'
    })
  }
}