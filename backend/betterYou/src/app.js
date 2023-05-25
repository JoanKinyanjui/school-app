require("dotenv").config();
const PORT  = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const path = require("path");

//conection to database
require("../DbConnection/DbConnection");

const express = require("express");
const cors = require("cors");

const school = require("./Routes/SchoolReg");
const Mpesa = require("./Routes/MpesaPayment");
const TherapySession = require("./Routes/AddSession");
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.json({ message: "app is running" });
});
app.use("/school", school);
app.use("/Mpesa", Mpesa);
app.use("/TherapySession", TherapySession);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
