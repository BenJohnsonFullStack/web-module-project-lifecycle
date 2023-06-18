import React from 'react'
import axios from 'axios'
import TodoList from './TodoList'
import Form from "./Form"

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: []
    }
  }

  fetchTodos = () => {
    axios.get(URL)
    .then((res) => {
      this.setState({ ...this.state, todos: res.data.data })
    })
    .catch((err) => {
      console.error(err)
    })
  }

  componentDidMount() {
    this.fetchTodos()
  }

  render() {
    return (
      <>
        {
          this.state.todos.map(todo => {
            return (<div key={todo.id}>{todo.name}</div>)
          })
        }
        <Form />
      </>
    )
  }
}
