const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbconnect");
const initRoutes = require("./routes");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 8888;
const cors = require("cors");


//
app.use(
  cors({
    origin: process.env.CLIENT_HOST || process.env.CLIENT_URL,
    methods: ["PUT", "POST", "GET", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

dbConnect();
initRoutes(app);

app.use("/", (req, res) => {
  res.send("hello wrold");
});

app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
