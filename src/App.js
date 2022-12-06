import axios from 'axios';
import React from 'react';
import { Navigate } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabled: true,
      submitted: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
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

    axios.post('https://pre-onboarding-selection-task.shop/auth/signin', {
      email: this.state.email,
      password: this.state.password
    })
    .then((response) => {
      const data = response.data;
      localStorage.setItem("accessToken", data.access_token);
      this.setState({submitted: true});
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render() {
    return(
      <div>
        {localStorage.getItem("accessToken") && <Navigate to="/todo"></Navigate>}
        {this.submitted && <Navigate to="/todo"></Navigate>}
        <form onSubmit={this.handleSubmit}>
          <label>
            E-mail
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}>
            </input>
          </label>
          <br />
          <label>
            Password
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}>
            </input>
          </label>
          <br />
          <button type="submit" disabled={this.state.disabled}>
            로그인
          </button>
        </form>
        <a href="/signup">회원가입</a>
        {localStorage.getItem("accessToken")}
      </div>
    )
  }
}


export default App