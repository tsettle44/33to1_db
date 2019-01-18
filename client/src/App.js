import React, { Component } from "react";
import { DiscussionBoard } from "./components/DiscussionBoard";
import { DiscussionBoard_a } from "./components/DB_Admin";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={DiscussionBoard} />
          <Route path="/admin" component={DiscussionBoard_a} />
        </div>
      </Router>
    );
  }
}

export default App;
