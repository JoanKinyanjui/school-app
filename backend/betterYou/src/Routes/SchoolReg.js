require("dotenv").config();
// const { SECRETWORD } = process.env;
const SECRETWORD ='schoolapp'
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SchoolModel = require("../../Models/SchoolReg/Registration");

router.post("/login", async (req, res) => {
  const school = await SchoolModel.findOne({
    email: req.body.email,
  });

  if (!school) {
    res.json({ success: false, Message: "School not found" });
  } else {
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      school.password
    );
    if (isPasswordValid) {
      const token = jwt.sign(
        {
          name: school.name,
          symbol: school.symbol,
          email: school.email,
        },
        SECRETWORD
      );

      res.status(200).json({ success: true, token: token, school:school, Message:"Successfully Logged In" })

    } else {
      return  res.status(401).json({
        success: false,
        token: false,
        Message: "password is wrong",
      });
    }
  }
});

router.post("/signup", async (req, res) => {
  const { name, symbol, email, password } = req.body;
  try {
    const newPassword = await bcrypt.hash(password, 10);
    await SchoolModel.create({
      name: name,
      email: email,
      symbol: symbol,
      password: newPassword,
    });
    res.status(200).json({ success: true, status: "ok" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false});
  }
});

router.put("/UpdateDetails", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      Message: "Authorization Header/Token is missing",
    });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRETWORD);
    const email = decoded.email;
    const school = await SchoolModel.findOne({ email: email });
    if (!school) {
      return res.json({
        success: false,
        status: "error",
        Message: "school not found",
      });
    } else {
      if (req.body.password) {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        school.password = newPassword;
      }
      school.name = req.body.name;
      school.email = req.body.email;

      await school.save();
      const newToken = jwt.sign(
        {
          name: school.name,
          symbol: school.symbol,
          email: school.email,
        },
        SECRETWORD
      );
      res.json({
        success: true,
        status: "ok",
        token: newToken,
      });
    }
  } catch (error) {
    res.json({ success: false, status: Message, error: error });
  }
});

router.get("/:id", async (req, res) => {
  // console.log(req.params.id)
  try {
    const schoolId = req.params.id;

    const school = await SchoolModel.findById(schoolId);

    if (!school) {
      return res.status(404).json({ error: 'School not found' });
    }

    res.status(200).json(school);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get("/", async (req, res) => {
  try {
    const schools = await SchoolModel.find();
    console.log(schools)
    res.status(201).json(schools);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});






module.exports = router;
