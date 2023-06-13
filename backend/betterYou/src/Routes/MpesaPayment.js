
const { default: axios } = require("axios");
const moment = require('moment');
const express = require("express");
const crypto = require('crypto');
const router = express.Router();
require('dotenv').config();


async function generateToken() {
  const secretKey = process.env.SECRET_KEY;
  const consumerKey = process.env.CONSUMER_KEY;
  const baseUrl = 'https://sandbox.safaricom.co.ke/';
  try {
    const response = await axios.get(baseUrl + 'oauth/v1/generate?grant_type=client_credentials', {
      auth: {
        username: consumerKey,
        password: secretKey
      }
    });
    // console.log(response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error(error);
    throw error; // throw the error to be caught by the caller
  }
}

router.post("/initiate-payment", async (req, res) => {
  console.log({"message":"now"})
    try {
      // M-Pesa Daraja API credentials
  const passkey = process.env.PASS_KEY;
  const shortCode = 174379;
  const baseUrl = 'https://sandbox.safaricom.co.ke/'
  
  // Generate a timestamp in the format required by M-Pesa Daraja
  const timestamp = moment().format('YYYYMMDDHHmmss')
  
  // Generate the password required for STK Push
  const password = new Buffer.from(shortCode + passkey + timestamp).toString('base64');
  
  const phoneNo = req.body.PhoneNumber.substring(1)
  const amount = req.body.Amount

  // console.log('all these',phoneNo, amount,password,clientName,cart,total);

      // Get an access token
      const accessToken = await generateToken();
  
      // Send the STK Push request to M-Pesa Daraja
      const response = await axios.post(baseUrl + 'mpesa/stkpush/v1/processrequest', 
      {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount, // replace with the amount you want to charge
        PartyA: `254${phoneNo}`, // replace with the phone number you want to charge
        PartyB: shortCode,
        PhoneNumber: `254${phoneNo}`, // replace with the phone number you want to charge
        CallBackURL: 'https://your-callback-url.com', // replace with your callback URL
        AccountReference: `254${phoneNo}`,    
        TransactionDesc:"better you"
      }
      , {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
  
      // Log the response and send it to the client
      console.log(response.data);
      res.status(200).json(response.data);
      if(response.status == 200){
  //  confirm(response.data.CheckoutRequestID) ......

      }
  
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }
)

 // Function to post a transaction on payment
// async function postTransactionToDB(cart, clientName, total) {
//   console.log(clientName,cart,total ,"===>What I need")
//   const feeCharge = Math.round(total*0.08);
//   try {
//     const formattedCartItems = cart.map(item => {
//       return {
//         name: item.name,
//         price: item.price,
//         quantity: item.cart,
//         vendor:item.vendor,
//       };
//     });

//     const transaction = new Transaction({
//       cart: formattedCartItems,
//       clientName: clientName,
//       FeeCharge: feeCharge,
//       Total: total
//     });

//     const savedTransaction = await transaction.save(); // Save the transaction to the database

//     console.log('Transaction saved:', savedTransaction);
//   } catch (error) {
//     console.error('Error saving transaction:', error);
//   }
// }

    // Confirm the status of the transaction 
  const confirm = async (id)=>{
    const baseUrl = 'https://sandbox.safaricom.co.ke/';
    const timestamp = moment().format('YYYYMMDDHHmmss')
    const passkey = process.env.PASS_KEY;
    const shortCode = 174379;
    const password = new Buffer.from(shortCode + passkey + timestamp).toString('base64');
    const accessToken = await generateToken();
    const requestData = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    CheckoutRequestID:id,
  }
  
  axios.post(baseUrl + 'mpesa/stkpushquery/v1/query', requestData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    console.error(error)
  })
  }


//   require("dotenv").config();
// const { ConsumerKey, ConsumerSecret } = process.env;
// const express = require("express");
// const router = express.Router();
// const requestBody = require("../MpesaHelpers/RequestBody");
// const getAccessToken = require("../MpesaHelpers/Authorization");


// router.post("/initiate-payment", async (req, res) => {
//   console.log(req.body.Amount, req.body.PhoneNumber)
//   let stkPushHeaderList = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${await getAccessToken(
//       ConsumerKey,
//       ConsumerSecret
//     )}`,
//   };

//   try {
//     const { default: fetch } = await import("node-fetch");

//     const stkRequestBody = requestBody.stkPushRequestBody(
//       req.body.Amount,
//       req.body.PhoneNumber
//     );

//     const response = await fetch(
//       "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
//       {
//         method: "POST",
//         headers: stkPushHeaderList,
//         body: JSON.stringify(stkRequestBody),
//       }
//     );

//     const responseData = await response.json();

//     if (responseData.ResponseCode === "0") {
//       res.status(200).send({
//         Message: "Payment initiated",
//         CheckoutRequestID: responseData.CheckoutRequestID,
//       });
//     } else if (responseData.errorMessage) {
//       res.status(200).send({
//         Message: "try again",
//         Error: responseData.errorMessage,
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({
//       Message: "An error occurred while processing your payment",
//       Error: err,
//     });
//   }
// });

// router.post("/payment-status", async (req, res) => {
//   const { CheckoutRequestID } = req.body;
//   const queryHeaderList = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${await getAccessToken(
//       ConsumerKey,
//       ConsumerSecret
//     )}`,
//   };
//   const queryRequestBody = requestBody.queryRequestBody(CheckoutRequestID);

//   try {
//     const { default: fetch } = await import("node-fetch");
//     const response = await fetch(
//       "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query",
//       {
//         method: "POST",
//         headers: queryHeaderList,
//         body: JSON.stringify(queryRequestBody),
//       }
//     );
//     const responseData = await response.json();
//     if (responseData.ResponseCode === "0") {
//       res.status(200).send({ responseData, Message: responseData.ResultDesc });
//     } else {
//       res.send({ Response: responseData, Message: responseData.ResultDesc });
//     }
//   } catch (err) {
//     res.status(500).send({
//       Message: "An error occurred while processing your payment",
//       Error: err,
//     });
//   }
// });

module.exports = router;
