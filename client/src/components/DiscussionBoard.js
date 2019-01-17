import React, { Component } from "react";
import { Container } from "reactstrap";
import axios from "axios";
import Posts from "./items/Posts";

export class DiscussionBoard extends Component {
  state = {
    posts: [],
    modal: false,
    backdrop: "static",
    ids: [],
    name: "",
    body: "",
    email: ""
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/posts")
      .then(res => this.setState({ posts: res.data }));
  }

  toggle = (p, c) => {
    this.setState({
      modal: !this.state.modal,
      ids: { p, c }
    });
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  post = () => {
    axios
      .post("http://localhost:5000/api/posts", {
        name: this.state.name,
        email: this.state.email,
        body: this.state.body
      })
      .then(res => {
        console.log(res);
      })
      .catch(function(error) {
        console.log(error);
      });
    window.location.reload();
  };

  reply = id => {
    if (id.p && id.c) {
      axios
        .post(
          "http://localhost:5000/api/posts/" + id.p + "/" + id.c + "/comment",
          {
            name: this.state.name,
            email: this.state.email,
            body: this.state.body
          }
        )
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      window.location.reload();
    } else {
      axios
        .post("http://localhost:5000/api/posts/" + id.p + "/comment", {
          name: this.state.name,
          email: this.state.email,
          body: this.state.body
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      window.location.reload();
    }
  };

  like = (p, c, cc) => {
    if (p && c && cc) {
      axios
        .post(
          "http://localhost:5000/api/posts/" + p + "/" + c + "/" + cc + "/like"
        )
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });

      const post = this.state.posts.filter(post => post._id === p);
      const comment = post[0].comments.filter(comment => comment._id === c);
      const comCom = comment[0].comments.filter(comCom => comCom._id === cc);

      comCom[0].likes++;
      this.setState({ posts: [...this.state.posts] });
    } else if (p && c) {
      axios
        .post("http://localhost:5000/api/posts/" + p + "/" + c + "/like")
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      const post = this.state.posts.filter(post => post._id === p);
      const comment = post[0].comments.filter(comment => comment._id === c);

      comment[0].likes++;
      this.setState({ posts: [...this.state.posts] });
    } else {
      axios
        .post("http://localhost:5000/api/posts/" + p + "/like")
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });

      const post = this.state.posts.filter(post => post._id === p);

      post[0].likes++;
      this.setState({ posts: [...this.state.posts] });
    }
  };

  disabled = i => {
    if (i.length === 4) {
      document.getElementById(i).disabled = true;
    } else if (i.length === 3) {
      document.getElementById(i).disabled = true;
    } else {
      document.getElementById(i).disabled = true;
    }
  };

  flag = (p, c, cc) => {
    console.log(p, c, cc, "has been flagged");
  };

  render() {
    return (
      <Container style={containerStyle}>
        <h1 className="display-3">33to1 Discussion Board</h1>
        <p className="lead">
          We’ve noticed everyone has taken a liking to talking about the race.
          So we’re giving you a place to do that, and just that. Feel free to
          use this area to discuss anything and everything about the Little 500
          — Qualifications, Spring Series, the race itself.
        </p>
        <hr className="my-2" />
        <p>
          Please, no character attacks. Trash-talking is great, but slandering
          people isn’t. Let’s keep it clean. Or your post will be deleted.
        </p>
        <Posts
          state={this.state}
          toggle={this.toggle}
          like={this.like}
          post={this.post}
          disabled={this.disabled}
          handleChange={this.handleChange}
          reply={this.reply}
          flag={this.flag}
        />
      </Container>
    );
  }
}

const containerStyle = {
  marginBottom: "50px"
};

export default DiscussionBoard;
