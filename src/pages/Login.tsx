import React from 'react';
import TextField from '@mui/material/TextField';
import Axios from 'axios';

class Login extends React.Component {
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
      Axios.postForm('http://localhost:8080/login', { email: this.state.value })
        .then(response => {
          localStorage.setItem('token', response.data.token);
          // TODO: Replace with proper navigation
          window.location.href = '/dashboard';
          // return <Navigate to="/dashboard" />;
        })
        .catch(error => {
          console.error('Login error:', error);
        });
  
      console.log("Submitting form with state:", this.state);
      console.log("Form submitted!");
    }
  
    render() {
      return (
      <div>
        <h1>Login Page!!!!!</h1>
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
          <input type="submit" value="Login" />
        </form>
      </div>
      );
    }
}

export default Login;