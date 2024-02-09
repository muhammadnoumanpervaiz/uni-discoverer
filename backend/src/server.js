const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5000;
const DB_URL = "mongodb://0.0.0.0:27017/";

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

const universitiesRoute = require("./routes/universities");

mongoose
  .connect(DB_URL, {
})
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.use("/universities", universitiesRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
