import React, { Component } from "react";
import { Container, Button } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import PostsD from "./items/PostsD";

export class DiscussionBoardD extends Component {
  state = {
    posts: [],
    modal: false,
    backdrop: "static",
    ids: [],
    name: "",
    body: "",
    email: "",
    validateName: false,
    validateEmail: false,
    validateBody: false
  };

  componentDidMount() {
    axios.get("/api/posts").then(res => this.setState({ posts: res.data }));
  }

  toggle = (p, c) => {
    this.setState({
      modal: !this.state.modal,
      ids: { p, c }
    });
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  post = () => {
    if (this.state.name === "") {
      this.setState({ validatedName: true });
    } else if (this.state.email === "") {
      this.setState({ validatedEmail: true, validateName: false });
    } else if (this.state.body === "") {
      this.setState({
        validatedBody: true,
        validateEmail: false,
        validateName: false
      });
    } else {
      axios
        .post("/api/posts", {
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
    }
  };

  reply = id => {
    if (this.state.name === "") {
      this.setState({ validatedName: true });
    } else if (this.state.email === "") {
      this.setState({ validatedEmail: true, validateName: false });
    } else if (this.state.body === "") {
      this.setState({
        validatedBody: true,
        validateEmail: false,
        validateName: false
      });
    } else {
      if (id.p && id.c) {
        axios
          .post("/api/posts/" + id.p + "/" + id.c + "/comment", {
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
      } else {
        axios
          .post("/api/posts/" + id.p + "/comment", {
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
    }
  };

  like = (p, c, cc) => {
    if (p && c && cc) {
      axios
        .post("/api/posts/" + p + "/" + c + "/" + cc + "/like")
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
        .post("/api/posts/" + p + "/" + c + "/like")
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
        .post("/api/posts/" + p + "/like")
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
        <Link to="/">
          <Button
            style={btnStyle}
            onClick={this.props.toggle}
            outline
            color="primary"
          >
            Light Theme
          </Button>
        </Link>
        <div style={white}>
          <p className="display-4">33to1 Discussion Board</p>
          <p className="lead">
            We’ve noticed everyone has taken a liking to talking about the race.
            So we’re giving you a place to do that, and just that. Feel free to
            use this area to discuss anything and everything about the Little
            500 — Qualifications, Spring Series, the race itself.
          </p>
          <hr className="my-2" />
          <p>
            Please, no character attacks. Trash-talking is great, but slandering
            people isn’t. Let’s keep it clean. Or your post will be deleted.
          </p>
        </div>
        <PostsD
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

const btnStyle = {
  marginTop: "15px",
  float: "right"
};

const white = {
  color: "#d7dadc"
};

const containerStyle = {
  paddingBottom: "50px"
};

export default DiscussionBoardD;
