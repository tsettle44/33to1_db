import React, { Component } from "react";
import { DiscussionBoard } from "./components/DiscussionBoard";
import { DiscussionBoard_a } from "./components/DB_Admin";
import { DiscussionBoardD } from "./components/DiscussionBoardDark";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  state = {
    dark: false
  };

  toggle = () => {
    this.setState({ dark: !this.state.dark });
  };

  componentDidMount() {
    if (
      window.location.href ===
      "https://murmuring-bayou-45837.herokuapp.com//dark"
    ) {
      this.setState({ dark: true });
    }
  }

  render() {
    return (
      <Router>
        <div style={this.state.dark ? dark : light} className="App">
          <Route
            exact
            path="/"
            render={props => (
              <DiscussionBoard {...props} toggle={this.toggle} />
            )}
          />
          <Route
            path="/dark"
            render={props => (
              <DiscussionBoardD {...props} toggle={this.toggle} />
            )}
          />
          <Route path="/admin" component={DiscussionBoard_a} />
        </div>
      </Router>
    );
  }
}

const dark = {
  backgroundColor: "#030303"
};

const light = {
  backgroundColor: "#fff"
};

export default App;
