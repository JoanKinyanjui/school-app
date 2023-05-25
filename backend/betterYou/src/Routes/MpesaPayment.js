require("dotenv").config();
const { ConsumerKey, ConsumerSecret } = process.env;
const express = require("express");
const router = express.Router();
const requestBody = require("../MpesaHelpers/RequestBody");
const getAccessToken = require("../MpesaHelpers/Authorization");

router.post("/initiate-payment", async (req, res) => {
  let stkPushHeaderList = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${await getAccessToken(
      ConsumerKey,
      ConsumerSecret
    )}`,
  };

  try {
    const { default: fetch } = await import("node-fetch");

    const stkRequestBody = requestBody.stkPushRequestBody(
      req.body.Amount,
      req.body.PhoneNumber
    );

    const response = await fetch(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        method: "POST",
        headers: stkPushHeaderList,
        body: JSON.stringify(stkRequestBody),
      }
    );

    const responseData = await response.json();

    if (responseData.ResponseCode === "0") {
      res.status(200).send({
        Message: "Payment initiated",
        CheckoutRequestID: responseData.CheckoutRequestID,
      });
    } else if (responseData.errorMessage) {
      res.status(200).send({
        Message: "try again",
        Error: responseData.errorMessage,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      Message: "An error occurred while processing your payment",
      Error: err,
    });
  }
});

router.post("/payment-status", async (req, res) => {
  const { CheckoutRequestID } = req.body;
  const queryHeaderList = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${await getAccessToken(
      ConsumerKey,
      ConsumerSecret
    )}`,
  };
  const queryRequestBody = requestBody.queryRequestBody(CheckoutRequestID);

  try {
    const { default: fetch } = await import("node-fetch");
    const response = await fetch(
      "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query",
      {
        method: "POST",
        headers: queryHeaderList,
        body: JSON.stringify(queryRequestBody),
      }
    );
    const responseData = await response.json();
    if (responseData.ResponseCode === "0") {
      res.status(200).send({ responseData, Message: responseData.ResultDesc });
    } else {
      res.send({ Response: responseData, Message: responseData.ResultDesc });
    }
  } catch (err) {
    res.status(500).send({
      Message: "An error occurred while processing your payment",
      Error: err,
    });
  }
});

module.exports = router;
