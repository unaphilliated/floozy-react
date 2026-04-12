import React from 'react';
import TextField from '@mui/material/TextField';
import Axios from 'axios';
// import { Navigate } from 'react-router-dom';

class Register extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { 
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    // TODO: Put api base URI into environment variable
    Axios.postForm('http://localhost:8080/register', { email: this.state.value })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        // TODO: Replace with proper navigation
        window.location.href = '/dashboard';
        // return <Navigate to="/dashboard" />;
      })
      .catch(error => {
        console.error('Registration error:', error);
      });

    console.log("Submitting form with state:", this.state);
    console.log("Form submitted!");
  }

  render() {
    return (
    <div>
      <h1>Register Page!!!!!</h1>
      <form onSubmit={this.handleSubmit}>
        <TextField
          required
          id="email"
          label="Email"
          variant="outlined"
          onChange={this.handleChange}
        />
        <TextField
          required
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          onChange={this.handleChange}
        />
        <input type="submit" value="Register" />
      </form>
    </div>
    );
  }
}

export default Register;
