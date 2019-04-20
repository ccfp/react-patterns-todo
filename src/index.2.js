import React, { Component } from "react"
import ReactDOM from "react-dom"

class App extends Component {
  state = {
    todos: [],
    newTodoTitle: ""
  }

  componentDidMount() {
    this.getTodos()
  }

  getTodos() {
    fetch("https://jsonplaceholder.typicode.com/todos/")
      .then(response => response.json())
      .then(todos => todos.slice(0, 10))
      .then(todos => this.setState({ todos }))
  }

  makeStyle = bool => ({ color: bool ? "lightgray" : "black" })

  handleClick = id => _e => {
    const action = {
      type: "TOGGLE_TODO",
      payload: id
    }
    this.dispatch(action)
  }

  onSubmit = e => {
    e.preventDefault()
    const newTodo = {
      id: Date.now(),
      completed: false,
      title: this.state.newTodoTitle
    }

    const { todos } = this.state
    this.setState({ todos: [newTodo, ...todos] })
    this.setState({ newTodoTitle: "" })
  }

  handleChange = e => {
    const action = {
      type: "SET_NEW_TODO",
      payload: e.target.value
    }
    this.dispatch(action)
  }

  dispatch = action => {
    const newState = reducer(action, this.state)
    this.setState(newState)
  }

  render() {
    return (
      <div className="App">
        <h1>Best Todo List Ever</h1>
        <form onSubmit={this.onSubmit}>
          <input
            value={this.state.newTodoTitle}
            onChange={this.handleChange}
            type="text"
            placeholder="Add new todo"
          />
          <button type="submit">Submit</button>
        </form>
        <ul>
          {this.state.todos
            // .reduce(
            //   (acc, todo) =>
            //     !todo.completed ? [todo, ...acc] : [...acc, todo],
            //   []
            // )
            .map(todo => (
              <li
                onClick={this.handleClick(todo.id)}
                className={todo.completed ? "completed" : ""}
                style={this.makeStyle(todo.completed)}
                key={todo.id}
              >
                {todo.title}
              </li>
            ))}
        </ul>
      </div>
    )
  }
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
