console.log("hello from node");

// require and import express framework
const express = require("express");
const app = express();
// call express

// listen at a port
app.listen(2000, () => console.log("listening now!"));

// give express a file to serve up

app.use(express.static("client-files"));

// AXIOS IMPORT

let encoded = `c29waGllY2xhcmstMzJhODlmMzE4ZmNiZjAwYzAxZDI3ZmQwYmM0YjUxY2Y2NTYxMzk0MjM5MTg3NzYzOTk1Ok1ScHR1aWpqWnpzQ3BKU3ZVVmpsVTFoaWE1Vk5RTG1ZZlVHc1VFR18=`;

let settings = {
  async: true,
  crossDomain: true,
  url: "https://api.kroger.com/v1/connect/oauth2/token",
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic " + encoded,
  },
  data: {
    grant_type: "client_credentials",
    scope: "product.compact",
  },
};

const axios = require("axios");

app.get("/blah", async (req, res) => {
  return res.send("Hello world");
});

const getAccessToken = async () => {
  return axios
    .request(settings)
    .then(function (response) {
      return response.data["access_token"];
    })
    .catch(function (error) {
      throw error;
    });
};
