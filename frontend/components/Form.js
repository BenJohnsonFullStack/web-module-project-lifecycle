import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <>
        <form id="todoForm" onSubmit={this.props.onSubmit}>
          <input 
            value={this.props.inputValue} 
            type="text" 
            placeholder="Enter an Item" 
            onChange={this.props.changeValues}
          />
          <input type="submit" />
        </form>
        <button 
          onClick={this.props.toggleCompletedDisplay}
        >
          {this.props.displayComplete 
            ? "Hide" 
            : "Show"} Completed
        </button>
      </>
    )
  }
}
