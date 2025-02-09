import React from 'react'
import axios from 'axios'

import Form from './Form'
import TodoList from './TodoList'

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

  toggleCompleted = id => () => {
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
        <TodoList
          toggleCompleted={this.toggleCompleted}
          todos={this.state.todos}
          displayComplete={this.state.displayComplete}
        />
        <Form 
          onSubmit={this.onSubmit}
          changeValues={this.changeValues}
          toggleCompletedDisplay={this.toggleCompletedDisplay}
          inputValue={this.state.inputValue}
          displayComplete={this.state.displayComplete}
        />
      </div>
    )
  }
}
