import React, { Component } from "react";
import { DiscussionBoard } from "./components/DiscussionBoard";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <DiscussionBoard />
      </div>
    );
  }
}

export default App;
