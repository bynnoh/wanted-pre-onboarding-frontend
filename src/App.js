import './App.css';
import React, { useState } from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabled: true
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value
    });

    (/@/.test(this.state.email)) && (this.state.password.length >= 8) ? this.setState({disabled: false}) : this.setState({disabled: true});
  }

  handleSubmit(e) {
    e.preventDefault();
  }
  
  render() {
    const email = this.state.email
    const password = this.state.password
    const disabled = this.state.disabled

    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            E-mail
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleInputChange}>
            </input>
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleInputChange}>
            </input>
          </label>
          <button type="submit" disabled={disabled}>
            로그인
          </button>
        </form>
        {this.state.password.length}
      </div>
    )
  }
}


export default App