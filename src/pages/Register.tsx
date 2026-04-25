import React from 'react';
import '../styles/Register.scss';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';

// TODO: Refactor to shared template for Register/Login? Very similar code.

class Register extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { 
      email: '',
      password: '',
      confirmpassword: '',
      showPassword: false,
      emailValid: true,
      emailError: '',
      passwordValid: true,
      passwordMatch: false,
      passwordError: '',
      attemptedSubmit: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.preventMouseEvent = this.preventMouseEvent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // Minimum eight characters, at least one letter and one number:
    this.passwordStrengthRegex = new RegExp(/^(?=.*[A-Z])(?=.*\d)[A-Z\d@$!%*#?&]{8,}$/, "i");

    // 99% of emails fall under this - if it fails they'll figure it out
    this.emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/, "i");
  }
  
  static contextType = AuthContext;
  declare context: React.ContextType<typeof AuthContext>;
  
  handleInputChange(event: React.ChangeEvent<HTMLInputElement>, validator?: () => void) {
    this.setState({ [event.target.id]: event.target.value }, () => {
      if (validator) {
        validator();
      }
    });
  }

  validatePassword() {
    // Strength check
    const passwordValid = this.passwordStrengthRegex.test(this.state.password);
    this.setState({ 
      passwordValid: passwordValid,
      passwordError: passwordValid || this.state.password.length === 0 ? '' : 'Password must be at least eight characters and include at least one letter and one number'
    });
    if (!passwordValid) {
      return;
    }

    // Match check
    const passwordMatch = this.state.password === this.state.confirmpassword;
    this.setState({ 
      passwordMatch: passwordMatch,
      passwordError: passwordMatch || this.state.confirmpassword.length === 0 ? '' : 'Passwords do not match'
    });
  }

  validateEmail() {
    const emailValid = this.emailRegex.test(this.state.email);
    this.setState({ 
      emailValid: emailValid,
      emailError: emailValid || this.state.email.length === 0 ? '' : 'Please enter a valid email address'
    });
  }

  handleClickShowPassword() {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  }

  preventMouseEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  async handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    await this.context.register(this.state.email, this.state.password)
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
          <h1 className="form-title">Register</h1>
          <form className="form" onSubmit={this.handleSubmit}>
            <TextField
              required
              id="email"
              label="Email"
              variant="outlined"
              onChange={(event) => this.handleInputChange(event, this.validateEmail)}
              error={this.state.emailError}
              helperText={this.state.emailError}
            />
            <TextField
              required
              id="password"
              label="Password"
              variant="outlined"
              onChange={(event) => this.handleInputChange(event, this.validatePassword)}
              error={this.state.passwordError}
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
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
            />
            <TextField
              required
              id="confirmpassword"
              label="Confirm Password"
              variant="outlined"
              onChange={(event) => this.handleInputChange(event, this.validatePassword)}
              error={this.state.passwordError}
              helperText={this.state.passwordError}
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
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
            />
            <div className="form-actions">
              <input type="submit" value="Register" disabled={authContext?.isLoading || this.state.emailError || this.state.passwordError || this.state.confirmPasswordError} />
              {this.state.attemptedSubmit && !this.context.isAuthenticated ? <h2 className="form-error-text">Registration failed<br />Please check your details and try again</h2> : null}
              <h2 className="form-helper-text">Already have an account? <Link to="/login">Login</Link></h2>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
