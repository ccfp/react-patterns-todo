import React, { useReducer, useEffect } from "react"
import ReactDOM from "react-dom"

import "./styles.scss"

const reducer = (state, action) => {
  console.log(action)
  console.log(action.type)
  switch (action.type) {
    case "SET_NEW_TODO":
      return { ...state, newTodoTitle: action.payload }
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map(
          todo =>
            todo.id === action.payload
              ? { ...todo, completed: !todo.completed }
              : todo
        )
      }
    case "ADD_TODO":
      return {
        ...state,
        todos: [action.payload, ...state.todos],
        newTodoTitle: ""
      }
    case "ADD_TODOS":
      return {
        ...state,
        todos: [...state.todos, ...action.payload]
      }
    default:
      return state
  }
}

const initialState = {
  todos: [],
  newTodoTitle: ""
}
const makeStyle = bool => ({ color: bool ? "lightgray" : "black" })

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const setTodos = todos => {
    const action = { type: "ADD_TODOS", payload: todos }
    dispatch(action)
  }
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/")
      .then(response => response.json())
      .then(todos => todos.slice(0, 10))
      .then(setTodos)
  }, [])

  const handleClick = id => _e => {
    const action = {
      type: "TOGGLE_TODO",
      payload: id
    }
    dispatch(action)
  }

  const onSubmit = e => {
    e.preventDefault()
    const newTodo = {
      id: Date.now(),
      completed: false,
      title: state.newTodoTitle
    }
    dispatch({ type: "ADD_TODO", payload: newTodo })
  }

  const handleChange = e => {
    const action = {
      type: "SET_NEW_TODO",
      payload: e.target.value
    }
    dispatch(action)
  }

  return (
    <div className="App">
      <h1>Best Todo List Ever</h1>
      <form onSubmit={onSubmit}>
        <input
          value={state.newTodoTitle}
          onChange={handleChange}
          type="text"
          placeholder="Add new todo"
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {state.todos.map(todo => (
          <li
            onClick={handleClick(todo.id)}
            className={todo.completed ? "completed" : ""}
            style={makeStyle(todo.completed)}
            key={todo.id}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
