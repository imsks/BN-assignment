const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const taskKnexAuth = require("./routes/knex-user/auth");
const taskKnexTask = require("./routes/knex-user/task");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(cookieParser());

// For Kex
app.use("/api/user/auth", taskKnexAuth);
app.use("/api/user/task", taskKnexTask);

module.exports = app;
