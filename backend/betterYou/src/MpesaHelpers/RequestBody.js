require("dotenv").config();
const { MpesaPassKey, BusinessShortCode, PartyA } = process.env;
const getCurrentTimestamp = require("../utils/getCurrentTimestamp");
const timestamp = getCurrentTimestamp();

function getStkPassword(passkey, timestamp) {
  const data = BusinessShortCode + passkey + timestamp;
  const buffer = Buffer.from(data, "utf8");
  const base64Encoded = buffer.toString("base64");

  return base64Encoded;
}

const stkPushRequestBody = (amount, phoneNumber) => {
  const password = getStkPassword(MpesaPassKey, timestamp);
  const requestBody = {
    BusinessShortCode: BusinessShortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: PartyA,
    PartyB: BusinessShortCode,
    PhoneNumber: phoneNumber,
    CallBackURL: "https://mydomain.com/path",
    AccountReference: "BetterYou",
    TransactionDesc: "Therapy session",
  };
  return requestBody;
};

const queryRequestBody = (CheckoutRequestID) => {
  const QrequestBody = {
    BusinessShortCode: BusinessShortCode,
    Password: getStkPassword(MpesaPassKey, timestamp),
    Timestamp: timestamp,
    CheckoutRequestID: CheckoutRequestID,
  };
  return QrequestBody;
};

module.exports = { stkPushRequestBody, queryRequestBody };
