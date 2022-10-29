console.log("hello from node");

// require and import express framework
const express = require("express");
const app = express();
// call express

// listen at a port
app.listen(2000, () => console.log("okay server listening"));

// give express a file to serve up

app.use(express.static("client-files"));

// AXIOS IMPORT

const axios = require("axios");

// nodejs file system library
const fs = require("fs");

const getAccessToken = async () => {
  let tokenDetailsJSON = fs.readFileSync("./test", "utf-8");
  let tokenDetails = JSON.parse(tokenDetailsJSON);

  let timeNow = new Date().getTime();
  if (timeNow < tokenDetails.expiry) {
    console.log("not expired, returning from file");
    return tokenDetails.token;
  }

  console.log("token expired, getting new token");
  
  let baseEncoded = `c29waGllY2xhcmstMzJhODlmMzE4ZmNiZjAwYzAxZDI3ZmQwYmM0YjUxY2Y2NTYxMzk0MjM5MTg3NzYzOTk1Ok1ScHR1aWpqWnpzQ3BKU3ZVVmpsVTFoaWE1Vk5RTG1ZZlVHc1VFR18=`;

  let settings = {
    async: true,
    crossDomain: true,
    url: "https://api.kroger.com/v1/connect/oauth2/token",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + baseEncoded,
    },
    data: {
      grant_type: "client_credentials",
      scope: "product.compact",
    },
  };

  // promise either resolves or rejects
  return axios
    .request(settings)
    .then(function (response) {
      // console.log("access token is", response.data["access_token"]);
      // get date time =
      let time = new Date().getTime();
      console.log("time", time);
      let expiry = time + response.data["expires_in"] * 1000;

      let tokenDetails = JSON.stringify({
        expiry: expiry,
        token: response.data["access_token"],
      });
      fs.writeFileSync("./test", tokenDetails);
      return response.data["access_token"];
    })
    .catch(function (error) {
      throw error;
    });
};

const callKroger = async () => {
  let term = "milk";
  let limit = 2;
  const accessToken = await getAccessToken();

  var options = {
    async: true,
    crossDomain: true,
    url: `https://api.kroger.com/v1/products?filter.term=${term}&filter.limit=${limit}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      console.log("successfully called kroger");
      // console.log("response is", response.data);
      return response.data;
    })
    .catch(function (error) {
      // potential 401 http status code (i.e. unauthorized)
      console.log("error");
      throw error;
    });
};

const main = async () => {
  console.log(await callKroger());
  const fileContents = fs.readFileSync("./test", "utf-8");
  console.log("fileContents", fileContents);
};

main();

// need to figure out how to dynamically update Access Token var from getAccessToken (as is, when i create key and assign response.data[access-token] to it i get undefined when passing into next axios.get request)
