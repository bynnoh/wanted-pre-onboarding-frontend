import axios from 'axios';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

function App() {
  const initialValues = {
    email: '',
    password: ''
  }

  const [values, setValues] = useState(initialValues);
  const [disabled, setDisabled] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.target

    setValues({
      ...values,
      [name]: value
    });

    (/@/.test(values.email)) && (values.password.length >= 8) ? setDisabled(false) : setDisabled(true);
  }

  const handleSubmit = e => {
    e.preventDefault();

    axios.post('https://pre-onboarding-selection-task.shop/auth/signin', {
      email: values.email,
      password: values.password
    })
    .then((response) => {
      const data = response.data;
      localStorage.setItem("accessToken", data.access_token);
      setSubmitted(true);
    })
    .catch((err) => {
      setMessage(err.response.data.message)
    })
  }

  return(
    <div>
      {localStorage.getItem("accessToken") && <Navigate to="/todo"></Navigate>}
      {submitted && <Navigate to="/todo"></Navigate>}
      <form onSubmit={handleSubmit}>
        <label>
          E-mail
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleInputChange}>
          </input>
        </label>
        <br />
        <label>
          Password
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleInputChange}>
          </input>
        </label>
        <br />
        <button type="submit" disabled={disabled}>
          로그인
        </button>
      </form>
      <a href="/signup">회원가입</a><br />
      {message}
    </div>
  )
}

export default App