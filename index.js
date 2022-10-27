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

const axios = require("axios");

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

getAccessToken();

const accessToken = `eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJzb3BoaWVjbGFyay0zMmE4OWYzMThmY2JmMDBjMDFkMjdmZDBiYzRiNTFjZjY1NjEzOTQyMzkxODc3NjM5OTUiLCJleHAiOjE2NjY4OTcxMjIsImlhdCI6MTY2Njg5NTMxNywiaXNzIjoiYXBpLmtyb2dlci5jb20iLCJzdWIiOiJhY2UwOTMxNC1hZGJkLTVlMzUtYmI0YS1jZTQzZTExNGNiYmMiLCJzY29wZSI6InByb2R1Y3QuY29tcGFjdCIsImF1dGhBdCI6MTY2Njg5NTMyMjkyMjkzMzI3NiwiYXpwIjoic29waGllY2xhcmstMzJhODlmMzE4ZmNiZjAwYzAxZDI3ZmQwYmM0YjUxY2Y2NTYxMzk0MjM5MTg3NzYzOTk1In0.DBUD9tX1OyATU9kPIegxC65tUwSBB3bzVWODJW0dY4fQyUJaeGJBK3VvIsAA_n-ZHUwSB1sPsuwtjvNSTYJeswGcNCx6nSC79-T6iP1R94Y_1TuY9oI6duB4QlG-kpHnmgdsBaPDxQt1zINrv6m7QDa6wJ12igGD-WuGa2TvTxiTCub9JI8yuZUbQcKoYyj9LlccvDvvoPRp5MN32Oj6Z8EZKMQvZlmtNnIbzAa14Z55pTzVzh1Lwn6Zr8-jm2TPv4wjalsSeyy4FLb_NFyoLTrYdjenw4ZH7GjUlmYYA4gcLew3NTzCY5hU_F08l4QDLnzG7QXjjP7QyVuqampYZg`;
let term = "milk";
let limit = 2;
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

const callKroger = async () => {
  return axios
    .request(options)
    .then(function (response) {
      console.log("successfully called kroger");
      console.log("response is", response.data);
    })
    .catch(function (error) {
      console.log("error");
      throw error;
    });
};

callKroger();

// need to figure out how to dynamically update Access Token var from getAccessToken (as is, when i create key and assign response.data[access-token] to it i get undefined when passing into next axios.get request)
