require("dotenv").config();
const { SECRETWORD } = process.env;
const express = require("express");
const router = express.Router();
const addSession = require("../../Models/TherapySession/AddSession");
const appointmentSchema = require("../../Models/TherapySession/Appointments");
const jwt = require("jsonwebtoken");

// Authentication middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization Header/Token is missing",
    });
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRETWORD, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid Token",
      });
    }
    req.user = user;
    next();
  });
};

// Create a new session
router.post("/", authenticate, async (req, res) => {
  console.log(req.body)
    try {
      const { AdmNo, Name, therapistId,symbol } = req.body;
      const session = new addSession({
        AdmNo,
        Name,
        TherapistId: therapistId,
        Status: "initial status",
        School: symbol,
      });
      await session.save();
      console.log(session);
      res.status(201).json({ session, Message: "success" });
    } catch (err) {
      res.status(500).send({ Message: "Server Error", Error: err.message });
    }
  }
);

// Get all sessions
router.get("/",authenticate,async (req, res) => {
    try {
      const sessions = await addSession.find();
      console.log(sessions);
      res.status(201).json(sessions);
    } catch (err) {
      res.status(500).send({ Message: "Server Error", Error: err });
    }
  }
);

// Get session status by AdmNo
router.get("/getStatus/:AdmNo", 
// authenticate, 
async (req, res) => {
  try {
    const session = await addSession.findOne({ AdmNo: req.params.AdmNo });
    if (!session) {
      return res.status(404).send({ Message: "Session not found" });
    }
    const status = session.Status;
    console.log(status)
    res.status(201).json(status);
  } catch (err) {
    res.status(500).send({ Message: "Server Error", Error: err });
  }
});

// Update session status by AdmNo
router.put("/updateStatus/:AdmNo", authenticate, async (req, res) => {
  try {
    const { Status } = req.body;
    const session = await addSession.findOneAndUpdate(
      { AdmNo: req.params.AdmNo },
      { Status },
      { new: true }
    );
    if (!session) {
      return res.status(404).send({ Message: "Session not found" });
    }
    res.json({ session, Message: "success" });
  } catch (err) {
    res.status(500).send({ Message: "Server Error", Error: err });
  }
});

// Delete session by AdmNo
router.delete("/:AdmNo", authenticate, async (req, res) => {
  try {
    const session = await addSession.findOneAndDelete({
      AdmNo: req.params.AdmNo,
    });
    if (!session) {
      return res.status(404).send({ Message: "Session not found" });
    }
    res.json({ Message: "Session removed" });
  } catch (err) {
    res.status(500).send({ Message: "Server Error", Error: err });
  }
});


//Update Status 
router.post('/update-status', async (req, res) => {
  try {
    const { AdmNo ,Status} = req.body; 

    // Find the document by AdmNo and update the Status field
    const updatedSession = await addSession.findOneAndUpdate(
      { AdmNo },
      { Status},
      { new: true }
    );

    res.json({ message: 'Status updated successfully', session: updatedSession });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the status' });
  }
});


// Create a new appointment
router.post('/newAppointment', async (req, res) => {
  const date = req.body.date;
  const admno = req.body.admno
  console.log(date,)
try{
  const newAppointment = new appointmentSchema({
    admno: admno,
    appointments: [
      { date: date, status: "scheduled" },
    ],
  });
  
 await newAppointment.save()
 res.status(201).json({ newAppointment, Message: "successfully created an appointment" });
}catch (error) {
  console.error(error);
  res.status(500).json({ message: 'An error occurred while updating the status' });
}
});


//get appointments for one admno  
router.get('/:admno', async (req, res) => {
  try {
    const { admno } = req.params;
    const appointments = await appointmentSchema.find({ admno });
    console.log(appointments)
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;


