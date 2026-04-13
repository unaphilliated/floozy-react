import React from 'react';
import '../styles/Login.scss';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Axios from 'axios';

// TODO: Refactor to shared template for Register/Login? Very similar code.

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
        <div className="form-page">
          <div className="form-card">
            <h1 className="form-title">Login Page!!!!!</h1>
            <form className="form" onSubmit={this.handleSubmit}>
              <TextField className="form-field"
                required
                id="email"
                label="Email"
                variant="outlined"
                onChange={this.handleChange}
              />
              <TextField className="form-field"
                required
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                onChange={this.handleChange}
              />
              <div className="form-actions">
                <input type="submit" value="Login" />
                <p className="form-helper-text">Don't have an account? <Link to="/register">Register</Link>.</p>
              </div>
            </form>
          </div>
        </div>
      );
    }
}

export default Login;
