import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  FormGroup,
  Row,
  Col,
  Jumbotron,
  FormFeedback
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCommentAlt,
  faFlag
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

export class PostsD extends Component {
  render() {
    const {
      posts,
      modal,
      backdrop,
      ids,
      validatedName,
      validatedEmail,
      validatedBody
    } = this.props.state;

    return (
      <div>
        <Jumbotron
          style={{
            marginTop: "15px",
            paddingTop: "10px",
            paddingBottom: "10px",
            backgroundColor: "#404142",
            color: "#d7dadc"
          }}
        >
          <FormGroup>
            <h3>Post on the Board</h3>
            <Label for="name">Name</Label>
            <Input
              invalid={validatedName}
              onChange={this.props.handleChange}
              type="text"
              name="name"
              id="name"
            />
            <FormFeedback>Do not leave your name blank!</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              invalid={validatedEmail}
              onChange={this.props.handleChange}
              type="email"
              name="email"
              id="email"
            />
            <FormFeedback>Do not leave your email blank!</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="body">Post</Label>
            <Input
              invalid={validatedBody}
              onChange={this.props.handleChange}
              type="textarea"
              name="body"
              id="body"
            />
            <FormFeedback>Do not leave the post body blank!</FormFeedback>
            <Button
              style={{ marginTop: "15px" }}
              onClick={this.props.post}
              color="success"
            >
              Submit
            </Button>
          </FormGroup>
        </Jumbotron>
        {posts.map((post, i) => (
          <div style={postStyle} key={i}>
            <Row>
              <Col xs="8" sm="10">
                <p style={pNameStyle}>{post.name} </p>
                <p style={pDateStyle}>
                  at {moment(post.createdAt).format("MM/DD/YY, h:mm a")}
                </p>
              </Col>
              <Col xs="4" sm="2">
                <p style={pLikesStyle}>{post.likes}</p>
                <Button
                  id={i}
                  color="link"
                  style={iconHeart}
                  onClick={() => {
                    this.props.like(post._id);
                    this.props.disabled(i);
                  }}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </Button>
              </Col>
            </Row>
            <p
              style={pBody}
              dangerouslySetInnerHTML={{
                __html: post.body.replace(/\r?\n/g, "<br />", {
                  sanitize: true
                })
              }}
            />
            <Button
              color="link"
              style={replyBtn}
              onClick={() => this.props.toggle(post._id)}
            >
              <FontAwesomeIcon icon={faCommentAlt} /> Reply
            </Button>
            <Button color="link" onClick={() => this.props.flag(post._id)}>
              <FontAwesomeIcon icon={faFlag} /> Flag
            </Button>
            {post.comments.map((comment, c) => (
              <div style={commentStyle} key={c}>
                <Row>
                  <Col xs="8" sm="10">
                    <p style={pNameStyle}>{comment.name} </p>
                    <p style={pDateStyle}>
                      {" "}
                      at {moment(comment.createdAt).format("MM/DD/YY, h:mm a")}
                    </p>
                  </Col>
                  <Col xs="4" sm="2">
                    <p style={pLikesStyle}>{comment.likes}</p>
                    <Button
                      id={c.toString() + "-c"}
                      color="link"
                      style={iconHeart}
                      onClick={() => {
                        this.props.like(post._id, comment._id);
                        this.props.disabled(c + "-c");
                      }}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </Button>
                  </Col>
                </Row>
                <p
                  style={pBody}
                  dangerouslySetInnerHTML={{
                    __html: comment.body.replace(/\r?\n/g, "<br />", {
                      sanitize: true
                    })
                  }}
                />
                <Button
                  color="link"
                  style={replyBtn}
                  onClick={() => this.props.toggle(post._id, comment._id)}
                >
                  <FontAwesomeIcon icon={faCommentAlt} /> Reply
                </Button>
                <Button
                  color="link"
                  onClick={() => this.props.flag(post._id, comment._id)}
                >
                  <FontAwesomeIcon icon={faFlag} /> Flag
                </Button>
                {comment.comments.map((cc, cID) => (
                  <div style={ccDivStyle} key={cID}>
                    <Row>
                      <Col xs="8" sm="10">
                        <p style={pNameStyle}>{cc.name} </p>
                        <p style={pDateStyle}>
                          {" "}
                          at {moment(cc.createdAt).format("MM/DD/YY, h:mm a")}
                        </p>
                      </Col>
                      <Col xs="4" sm="2">
                        <p style={pLikesStyle}>{cc.likes}</p>
                        <Button
                          id={cID.toString() + "-cc"}
                          color="link"
                          style={iconHeart}
                          onClick={() => {
                            this.props.like(post._id, comment._id, cc._id);
                            this.props.disabled(cID + "-cc");
                          }}
                        >
                          <FontAwesomeIcon icon={faHeart} />
                        </Button>
                      </Col>
                    </Row>
                    <p
                      style={pBody}
                      dangerouslySetInnerHTML={{
                        __html: cc.body.replace(/\r?\n/g, "<br />", {
                          sanitize: true
                        })
                      }}
                    />
                    <Button
                      color="link"
                      style={replyBtn}
                      onClick={() => this.props.toggle(post._id, comment._id)}
                    >
                      <FontAwesomeIcon icon={faCommentAlt} /> Reply
                    </Button>
                    <Button
                      color="link"
                      onClick={() =>
                        this.props.flag(post._id, comment._id, cc._id)
                      }
                    >
                      <FontAwesomeIcon icon={faFlag} /> Flag
                    </Button>
                  </div>
                ))}
              </div>
            ))}
            <Modal
              isOpen={modal}
              toggle={this.props.toggle}
              className={this.props.className}
              backdrop={backdrop}
              style={{ backgroundColor: "#404142" }}
            >
              <ModalHeader
                style={{ backgroundColor: "#404142", color: "#fff" }}
                toggle={this.props.toggle}
              >
                Reply
              </ModalHeader>
              <ModalBody style={{ backgroundColor: "#404142", color: "#fff" }}>
                <FormGroup>
                  <Label for="nameM">Name</Label>
                  <Input
                    invalid={validatedName}
                    onChange={this.props.handleChange}
                    type="text"
                    name="name"
                    id="nameM"
                  />
                  <FormFeedback>Do not leave your name blank!</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="emailM">Email</Label>
                  <Input
                    invalid={validatedEmail}
                    onChange={this.props.handleChange}
                    type="email"
                    name="email"
                    id="emailM"
                  />
                  <FormFeedback>Do not leave your email blank!</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="bodyM">Reply</Label>
                  <Input
                    invalid={validatedBody}
                    onChange={this.props.handleChange}
                    type="textarea"
                    name="body"
                    id="bodyM"
                  />
                  <FormFeedback>Do not leave the post body blank!</FormFeedback>
                </FormGroup>
              </ModalBody>
              <ModalFooter
                style={{ backgroundColor: "#404142", color: "#fff" }}
              >
                <Button color="success" onClick={() => this.props.reply(ids)}>
                  Submit
                </Button>{" "}
                <Button color="danger" onClick={this.props.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        ))}
      </div>
    );
  }
}

const postStyle = {
  padding: "20px",
  paddingRight: "10px",
  marginTop: "20px",
  border: "2px #404142 solid",
  borderRadius: "5px",
  backgroundColor: "#1a1a1b",
  color: "#d7dadc"
};

const pNameStyle = {
  display: "inline",
  fontSize: "1.25rem",
  fontWeight: "bold"
};

const pLikesStyle = {
  display: "inline",
  float: "right",
  marginTop: "3px"
};

const pBody = {
  fontSize: "1.1rem"
};

const iconHeart = {
  padding: "0px",
  margin: "0px",
  color: "red",
  display: "inline",
  float: "right",
  fontSize: "1.5rem",
  marginRight: "10px"
};

const replyBtn = {
  border: "none"
};

const commentStyle = {
  padding: "10px",
  marginTop: "10px",
  marginLeft: "10px",
  borderLeft: "2px #404142 solid",
  borderRight: "2px #404142 solid"
};

const ccDivStyle = {
  padding: "10px",
  marginTop: "10px",
  marginLeft: "20px",
  borderLeft: "2px #404142 solid",
  borderRight: "2px #404142 solid"
};

const pDateStyle = {
  display: "inline",
  color: "grey",
  fontStyle: "italic"
};

export default PostsD;
