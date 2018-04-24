import React, { Component } from "react";
import axios from "axios";

import "./App.css";

import List from "./components/List";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      inputText: "",
      todos: [
        // {
        //   id: 1,
        //   title: "Teach Cypress Testing Suite",
        //   isComplete: false
        // }
      ]
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckBoxSelect = this.handleCheckBoxSelect.bind(this);
  }

  componentDidMount() {
    axios.get("/api/todos").then(({ data }) => {
      this.setState({ todos: data });
    });
  }

  handleInputChange(event) {
    this.setState({
      inputText: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post("/api/todos", { title: this.state.inputText, isComplete: false })
      .then(({ data }) => {
        this.setState({
          todos: data,
          inputText: ""
        });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  handleCheckBoxSelect(id) {
    console.log("id: ", id);
    axios
      .put(`/api/todos/${id}`)
      .then(({ data }) => {
        this.setState({ todos: data });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" />
        {this.state.error && (
          <span className="error">Oh snap, something went wrong!</span>
        )}
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleInputChange}
            value={this.state.inputText}
            autoFocus
            className="new_todo"
            placeholder="Add new Todo"
          />
        </form>
        <List
          handleCheckBoxSelect={this.handleCheckBoxSelect}
          todos={this.state.todos}
        />
      </div>
    );
  }
}

export default App;
