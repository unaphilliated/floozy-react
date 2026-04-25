import React from 'react';
import '../styles/Login.scss';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';

// TODO: Refactor to shared template for Register/Login? Very similar code.

class Login extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { 
      email: '',
      password: '',
      showPassword: false,
      attemptedSubmit: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.preventMouseEvent = this.preventMouseEvent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextType = AuthContext;
  declare context: React.ContextType<typeof AuthContext>;
  
  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleClickShowPassword() {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  }

  preventMouseEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  async handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    await this.context.login(this.state.email, this.state.password)
    this.setState({ attemptedSubmit: true });
  }

  render() {
    const authContext = this.context;

    if (authContext.isAuthenticated) {
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
              <input type="submit" value="Login" disabled={authContext?.isLoading} />
              {this.state.attemptedSubmit && !authContext?.isAuthenticated ? <h2 className="form-error-text">Login failed<br />Please check your credentials and try again</h2> : null}
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
