# Example in usage

# School Registration

### Login

```js
let headersList = {
  "Content-Type": "application/json",
};

let bodyContent = JSON.stringify({
  email: "kijabehigh@gmail.com",
  password: "KJH100",
});

let response = await fetch("http://localhost:5000/school/login", {
  method: "POST",
  body: bodyContent,
  headers: headersList,
});

let data = await response.json();
console.log(data);
```

### SignUp

```js
let headersList = {
  "Content-Type": "application/json",
};

let bodyContent = JSON.stringify({
  name: "Kijabe High",
  symbol: "KJH",
  email: "kijabehigh@gmail.com",
  password: "kjh1010",
});

let response = await fetch("http://localhost:5000/school/signup", {
  method: "POST",
  body: bodyContent,
  headers: headersList,
});

let data = await response.json();
console.log(data);
```

### UpdateDetails

```js
//example token
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiS2lqYWJlIEhpZ2ggU2Nob29sIiwic3ltYm9sIjoiS0pIMTAwIiwiZW1haWwiOiJraWphYmVoaWdoQGdtYWlsLmNvbSIsImlhdCI6MTY4MzY0MzU0Mn0.jmGBQpyeFjeUiLU2Y1bImTz3DgRawp3O2c6sfHGJfCs";

let headersList = {
  Authorization: `Bearer ${localstorage.getItem("token")}`, //assumming u have already stored in as a cookie
  "Content-Type": "application/json",
};

let bodyContent = JSON.stringify({
  name: "Kijabe High School",
  email: "kijabehigh@gmail.com",
});

let response = await fetch("http://localhost:5000/school/UpdateDetails", {
  method: "PUT",
  body: bodyContent,
  headers: headersList,
});

let data = await response.text();
console.log(data);
```
### get all schools
```js
```

# Add Sessions

### create Session

```js
let headersList = {
  Authorization: `Bearer ${localstorage.getItem("token")}`, //assumming u have already stored in as a cookie
  "Content-Type": "application/json",
};

let bodyContent = JSON.stringify({
  Name: "Mary",
  AdmNo: "100",
});

let response = await fetch("http://localhost:5000/TherapySession/", {
  method: "POST",
  body: bodyContent,
  headers: headersList,
});

let data = await response.text();
console.log(data);
```

### Get Sessions

```js
let headersList = {
  Authorization: `Bearer ${localstorage.getItem("token")}`, //assumming u have already stored in as a cookie
  "Content-Type": "application/json",
};

let response = await fetch("http://localhost:5000/TherapySession/", {
  method: "GET",
  headers: headersList,
});

let data = await response.text();
console.log(data);
```

### get Session status

```js
let AdmNo = "149";
let headersList = {
  Authorization: `Bearer ${localstorage.getItem("token")}`, //assumming u have already stored in as a cookie
  "Content-Type": "application/json",
};
let response = await fetch(
  `http://localhost:5000/TherapySession/getStatus/${AdmNo}`,
  {
    method: "GET",
  }
);

let data = await response.text();
console.log(data);
```

### Update Session status

```js
let AdmNo = "149";
let headersList = {
  Authorization: `Bearer ${localstorage.getItem("token")}`, //assumming u have already stored in as a cookie
  "Content-Type": "application/json",
};
let bodyContent = JSON.stringify({
  Status: "tharapist selection",
});

let response = await fetch(
  "http://localhost:5000/TherapySession/updateStatus/149",
  {
    method: "PUT",
    body: bodyContent,
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

### removing a students session

```js
let AdmNo = "149";
let headersList = {
  Authorization: `Bearer ${localstorage.getItem("token")}`, //assumming u have already stored in as a cookie
  "Content-Type": "application/json",
};

let response = await fetch("http://localhost:5000/TherapySession/149", {
  method: "DELETE",
  headers: headersList,
});

let data = await response.text();
console.log(data);
```

# Mpesa Payment

### initiate payment

```js
let headersList = {
  "Content-Type": "application/json",
};

let bodyContent = JSON.stringify({
  PhoneNumber: 254713563798,
  Amount: 1,
});

let response = await fetch("http://localhost:5000/Mpesa/initiate-payment", {
  method: "POST",
  body: bodyContent,
  headers: headersList,
});

let data = await response.json();
console.log(data);
console.log(data.CheckoutRequestID); //get this and use as a body to check payment status
```

### payment status

```js
let headersList = {
  "Content-Type": "application/json",
};

let bodyContent = JSON.stringify({
  CheckoutRequestID: "ws_CO_09052023164416126713563798",
});

let response = await fetch("http://localhost:5000/Mpesa/payment-status", {
  method: "POST",
  body: bodyContent,
  headers: headersList,
});

let data = await response.json();
console.log(data);
```