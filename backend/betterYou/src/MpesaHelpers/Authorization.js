const getBasicAuth = (ConsumerKey, ConsumerSecret) =>
  Buffer.from(`${ConsumerKey}:${ConsumerSecret}`).toString("base64");

async function getAccessToken(ConsumerKey, ConsumerSecret) {
  const { default: fetch } = await import("node-fetch");
  const headers = new Headers();
  headers.append(
    "Authorization",
    `Basic ${getBasicAuth(ConsumerKey, ConsumerSecret)}`
  );
  const response = await fetch(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers }
  );
  const responseData = await response.json();
  return responseData.access_token;
}

module.exports = getAccessToken;
