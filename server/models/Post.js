const mongoose = require("mongoose");
const moment = require("moment");

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: String,
    default: moment().format("MM/DD/YY, h:mm a")
  },
  body: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: []
});

//Sort Posts

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
