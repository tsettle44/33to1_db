const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const Cred = require("./server/routes/api/cred");
const path = require("path");
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
const posts = require("./server/routes/api/post");
app.use("/api/posts", posts);

//Serve static assests if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
