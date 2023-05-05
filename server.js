const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8000;

require("./database/connection");

app.use(express.json());
app.use(cookieParser());
app.use(require("./router/routes"));

app.get("/", (req, res) => {
  res.send("Hello World from server file");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});