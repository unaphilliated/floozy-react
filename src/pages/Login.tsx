import React from 'react';
import '../styles/Login.scss';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, Navigate } from 'react-router-dom';
import Axios from 'axios';

// TODO: Refactor to shared template for Register/Login? Very similar code.

class Login extends React.Component {
  constructor(props: any) {
      super(props);
      this.state = { 
        email: '',
        password: '',
        showPassword: false,
        isSubmitting: false,
        submitResponse: null,
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
      this.preventMouseEvent = this.preventMouseEvent.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
      this.setState({ [event.target.id]: event.target.value });
    }

    handleClickShowPassword() {
      this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
    }

    preventMouseEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
  
    handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
      event.preventDefault();

      this.setState({ isSubmitting: true });
      console.log("Submitting form with state:", this.state);
  
      // TODO: Put api base URI into environment variable
      Axios.postForm('http://localhost:8080/login', { email: this.state.email })
        .then(response => {
          localStorage.setItem('token', response.data.token);

          // Navigation logic in render()
          this.setState({ isSubmitting: false, submitResponse: response.status });
        })
        .catch(error => {
          console.error('Login error:', error);
          this.setState({ isSubmitting: false, submitResponse: error.response ? error.response.status : -1 });
        });
  
      console.log("Submitting form with state:", this.state);
      console.log("Form submitted!");
    }
  
    render() {
      if (this.state.submitResponse === 200) {
        return <Navigate to="/dashboard" />;
      }

      return (
        <div className="form-page">
          <div className="form-card">
            <h1 className="form-title">Login</h1>
            <form className="form" onSubmit={this.handleSubmit}>
              <TextField
                required
                id="email"
                label="Email"
                variant="outlined"
                onChange={this.handleInputChange}
              />
              <TextField
                required
                id="password"
                label="Password"
                variant="outlined"
                onChange={this.handleInputChange}
                type={this.state.showPassword ? 'text' : 'password'}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            this.state.showPassword ? 'hide the password' : 'display the password'
                          }
                          onClick={this.handleClickShowPassword}
                          onMouseDown={this.preventMouseEvent}
                          onMouseUp={this.preventMouseEvent}
                          edge="end"
                        >
                          {this.state.showPassword ? <VisibilityOff sx={{ color: "#fff" }} /> : <Visibility sx={{ color: "#fff" }} />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}
              />
              <div className="form-actions">
                <input type="submit" value="Login" disabled={this.state.isSubmitting} />
                {this.state.submitResponse && this.state.submitResponse !== 200 ? <h2 className="form-error-text">Login failed<br />Please check your credentials and try again</h2> : null}
                <h2 className="form-helper-text">Don't have an account? <Link to="/register">Register</Link></h2>
                <h2 className="form-helper-text"><Link to="/reset-password">Forgot your password?</Link></h2>
              </div>
            </form>
          </div>
        </div>
      );
    }
}

export default Login;
