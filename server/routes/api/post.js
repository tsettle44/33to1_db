const express = require("express");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const router = express.Router();

//GET Posts
router.get("/", async (req, res) => {
  Post.find({}, (err, post) => {
    if (err) {
      console.log(err);
    } else {
      const posts = [];

      post.forEach(p => {
        posts.unshift(p);
      });

      posts.sort((a, b) =>
        a.createdAt > b.createdAt
          ? b.createdAt - a.createdAt
          : b.createdAt > a.createdAt
          ? b.createdAt - a.createdAt
          : 0
      );

      res.send(posts);
    }
  });
});

//POST Post
router.post("/", (req, res) => {
  if (req.body.name && req.body.body) {
    const postData = {
      name: req.body.name,
      email: req.body.email,
      body: req.body.body
    };

    //insert
    Post.create(postData, (err, post) => {
      if (err) {
        console.log(err);
      } else {
        res.status(201).send(post);
      }
    });
  } else {
    console.log("Request all fields");
  }
});

//DELETE Post
router.delete("/:pID", (req, res) => {
  Post.deleteOne({ _id: req.params.pID }, err => {
    err ? console.log(err) : res.status(202).send();
  });
});

//GET Specific Post
router.get("/:pID", (req, res) => {
  Post.findOne({ _id: req.params.pID }, (err, post) => {
    err ? console.log(err) : res.send(post);
  });
});

//POST Like Post
router.post("/:pID/like", (req, res) => {
  Post.findOne({ _id: req.params.pID }, (err, post) => {
    if (err) {
      console.log(err);
    } else {
      newPost = post.toObject();
      newPost.likes = parseInt(newPost.likes) + 1;
      Post.updateOne({ _id: req.params.pID }, newPost, (err, p) => {
        err ? console.log(err) : res.status(204).send();
      });
    }
  });
});

//POST Comment to Post
router.post("/:pID/comment", (req, res) => {
  if (req.body.name && req.body.body) {
    const commentData = {
      name: req.body.name,
      email: req.body.email,
      body: req.body.body
    };

    //insert comment
    Comment.create(commentData, (err, comment) => {
      if (err) {
        console.log(err);
      } else {
        Post.findOne({ _id: req.params.pID }, (err, post) => {
          if (err) {
            console.log(err);
          } else {
            newPost = post.toObject();
            newPost.comments.push(comment);
            Post.updateOne({ _id: req.params.pID }, newPost, err => {
              err ? console.log(err) : res.status(201).send();
            });
          }
        });
      }
    });
  } else {
    console.log("Request all fields");
  }
});

//POST Like Comment to Post
router.post("/:pID/:cID/like", (req, res) => {
  Post.findOne({ _id: req.params.pID }, (err, post) => {
    if (err) {
      console.log(err);
    } else {
      newPost = post.toObject();
      newPost.comments.forEach(c => {
        if (c._id == req.params.cID) {
          c.likes++;
        }
      });
      Post.updateOne({ _id: req.params.pID }, newPost, (err, p) => {
        err ? console.log(err) : res.status(204).send();
      });
    }
  });
});

//POST Comment to comment
router.post("/:pID/:cID/comment", (req, res) => {
  if (req.body.name && req.body.body) {
    const commentData = {
      name: req.body.name,
      email: req.body.email,
      body: req.body.body
    };

    Comment.create(commentData, (err, comment) => {
      if (err) {
        console.log(err);
      } else {
        Post.findOne({ _id: req.params.pID }, (err, post) => {
          if (err) {
            console.log(err);
          } else {
            newPost = post.toObject();
            newPost.comments.forEach(c => {
              if (c._id == req.params.cID) {
                c.comments.push(comment);
              }
            });
            Post.updateOne({ _id: req.params.pID }, newPost, (err, p) => {
              err ? console.log(err) : res.status(204).send();
            });
          }
        });
      }
    });
  }
});

//POST Like Comment of Comment
router.post("/:pID/:cID/:ccID/like", (req, res) => {
  Post.findOne({ _id: req.params.pID }, (err, post) => {
    if (err) {
      console.log(err);
    } else {
      newPost = post.toObject();
      newPost.comments.forEach(c => {
        if (c._id == req.params.cID) {
          c.comments.forEach(cc => {
            if (cc._id == req.params.ccID) {
              cc.likes++;
            }
          });
        }
      });
      Post.updateOne({ _id: req.params.pID }, newPost, (err, p) => {
        err ? console.log(err) : res.status(204).send();
      });
    }
  });
});

module.exports = router;
