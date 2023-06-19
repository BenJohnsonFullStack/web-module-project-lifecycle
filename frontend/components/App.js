import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      error: '',
      inputValue: '',
      displayComplete: true
    }
  }

  changeValues = (evt) => {
    const { value } = evt.target
    this.setState({ ...this.state, inputValue: value })
  }

  postTodo = () => {
    axios.post(URL, { name: this.state.inputValue })
    .then((res) => {
      this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
    })
    .catch((err) => {
      this.setState({ ...this.state, error: err.response.data.message })
    })
  }

  onSubmit = (evt) => {
    evt.preventDefault()
    this.postTodo()
    this.setState({ ...this.state, inputValue: '' })
  }

  fetchTodos = () => {
    axios.get(URL)
    .then((res) => {
      this.setState({ ...this.state, todos: res.data.data })
    })
    .catch((err) => {
      this.setState({ ...this.state, error: err.response.data.message })
    })
  }

  toggleCompleted = id => e => {
    axios.patch(`${URL}/${id}`)
      .then((res) => {
        this.setState({ 
            ...this.state, 
            todos: this.state.todos
              .map(todo => {
                if(todo.id !== id) return todo
                return res.data.data
              }) })
      })
      .catch((err) => {
        this.setState({ ...this.state, error: err.response.data.message })
      })
  }

  toggleCompletedDisplay = () => {
    this.setState({ ...this.state, displayComplete: !this.state.displayComplete })
  }

  componentDidMount() {
    this.fetchTodos()
  }

  render() {
    return (
      <div>
        <div id="error">Error: {this.state.error}</div>
        <div id="todos">
          <h2>Todos:</h2>
          { 
          this.state.todos.reduce((acc, todo) => {
              if(this.state.displayComplete || !todo.completed)
                return acc.concat(
                  <div onClick={this.toggleCompleted(todo.id)} key={todo.id}>{todo.name} {todo.completed ? " -COMPLETE": ''}</div>
                )
              return acc
            }, [])
          }
        </div>
        <form id="todoForm" onSubmit={this.onSubmit}>
          <input 
          value={this.state.inputValue} 
          type="text" 
          placeholder="Enter an Item" 
          onChange={this.changeValues}
          />
          <input type="submit" />
        </form>
        <button onClick={this.toggleCompletedDisplay}>{this.state.displayComplete ? "Hide" : "Show"} Completed</button>
      </div>
    )
  }
}
