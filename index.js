console.log("hello from node");

// require and import express framework
const express = require("express");
const app = express();
// call express

// listen at a port
app.listen(2000, () => console.log("listening now!"));

// give express a file to serve up

app.use(express.static("client-files"));
