const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const Cred = require("./routes/api/cred");
var mongoose = require("mongoose");

// mongodb connection
mongoose.connect(
  Cred,
  { useNewUrlParser: true }
);
var db = mongoose.connection;
// mongo error
db.on("error", console.error.bind(console, "connection error:"));

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Posts API
const posts = require("./routes/api/post");
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
