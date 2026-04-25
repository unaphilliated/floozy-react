import React from 'react';
import '../styles/ResetPassword.scss';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, Navigate } from 'react-router-dom';
import Axios from 'axios';

class ResetPasswordEmailStep extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { 
      email: '',
      isSubmitting: false,
      submitResponse: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    this.setState({ isSubmitting: true });

    console.log("Placeholder submit:", this.state);
    new Promise((resolve) => setTimeout(resolve, 1000))
      .then(() => {
        this.setState({ isSubmitting: false, submitResponse: 200 });
        this.props.nextStep();
      });

    // TODO: Put api base URI into environment variable
    // Axios.postForm('http://localhost:8080/reset-password', { email: this.state.email })
    //   .then(response => {
    //     localStorage.setItem('token', response.data.token);

    //     // Navigation logic in render()
    //     this.setState({ isSubmitting: false, submitResponse: response.status });
    //     this.props.nextStep();
    //   })
    //   .catch(error => {
    //     console.error('Reset password error:', error);
    //     this.setState({ isSubmitting: false, submitResponse: error.response ? error.response.status : -1 });
    //   });
  }

  render() {
    return (
      <div className="form-page">
        <div className="form-card">
          <h1 className="form-title">Reset Password</h1>
          <form className="form" onSubmit={this.handleSubmit}>
            <TextField
              required
              id="email"
              label="Email"
              variant="outlined"
              onChange={this.handleInputChange}
            />
            <div className="form-actions">
              <input type="submit" value="Reset Password" disabled={this.state.isSubmitting} />
              {this.state.submitResponse && this.state.submitResponse !== 200 ? <h2 className="form-error-text">Reset password failed<br />Please check your email and try again</h2> : null}
              <h2 className="form-helper-text">Don't have an account? <Link to="/register">Register</Link></h2>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


class ResetPasswordCodeStep extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      code: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    this.setState({ isSubmitting: true });

    console.log("Placeholder submit:", this.state);
    new Promise((resolve) => setTimeout(resolve, 1000))
      .then(() => {
        this.setState({ isSubmitting: false, submitResponse: 200 });
        this.props.nextStep();
      });

    // TODO: Put api base URI into environment variable
    // Axios.postForm('http://localhost:8080/reset-password-code', { code: this.state.code })
    //   .then(response => {
    //     localStorage.setItem('token', response.data.token);

    //     // Navigation logic in render()
    //     this.setState({ isSubmitting: false, submitResponse: response.status });
    //     this.props.nextStep();
    //   })
    //   .catch(error => {
    //     console.error('Reset password code error:', error);
    //     this.setState({ isSubmitting: false, submitResponse: error.response ? error.response.status : -1 });
    //   });
  }

  render() {
    return (
      <div className="form-page">
        <div className="form-card">
          <h1 className="form-title">Reset Password</h1>
          <form className="form" onSubmit={this.handleSubmit}>
            <p className="form-helper-text">A confirmation code has been sent to your email.</p>
            <TextField
              required
              id="code"
              label="Confirmation Code"
              placeholder="XXX-XXX"
              variant="outlined"
              onChange={this.handleInputChange}
            />
            <div className="form-actions">
              <input type="submit" value="Confirm" disabled={this.state.isSubmitting} />
              {this.state.submitResponse && this.state.submitResponse !== 200 ? <h2 className="form-error-text">Confirmation failed<br />Please check the code and try again</h2> : null}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

// TODO: Deduplicate password validation logic with Register page
class ResetPasswordNewPasswordStep extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      newPassword: '',
      confirmpassword: '',
      passwordValid: true,
      passwordMatch: false,
      passwordError: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.preventMouseEvent = this.preventMouseEvent.bind(this);

    // Minimum eight characters, at least one letter and one number:
    this.passwordStrengthRegex = new RegExp(/^(?=.*[A-Z])(?=.*\d)[A-Z\d@$!%*#?&]{8,}$/, "i");

    // 99% of emails fall under this - if it fails they'll figure it out
    this.emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/, "i");
  }
    
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
  
  handleClickShowPassword() {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  }

  preventMouseEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    this.setState({ isSubmitting: true });

    console.log("Placeholder submit:", this.state);
    new Promise((resolve) => setTimeout(resolve, 1000))
      .then(() => {
        this.setState({ isSubmitting: false, submitResponse: 200 });
        this.props.nextStep();
      });

    // TODO: Put api base URI into environment variable
    // Axios.postForm('http://localhost:8080/reset-password-code', { code: this.state.code })
    //   .then(response => {
    //     localStorage.setItem('token', response.data.token);

    //     // Navigation logic in render()
    //     this.setState({ isSubmitting: false, submitResponse: response.status });
    //     this.props.nextStep();
    //   })
    //   .catch(error => {
    //     console.error('Reset password code error:', error);
    //     this.setState({ isSubmitting: false, submitResponse: error.response ? error.response.status : -1 });
    //   });
  }

  render() {
    return (
      <div className="form-page">
        <div className="form-card">
          <h1 className="form-title">Reset Password</h1>
          <form className="form" onSubmit={this.handleSubmit}>
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
              <input type="submit" value="Update Password" disabled={this.state.isSubmitting} />
              {this.state.submitResponse && this.state.submitResponse !== 200 ? <h2 className="form-error-text">Password reset failed<br />Please check your details and try again</h2> : null}
            </div>
          </form>
        </div>
      </div>
    );
  }
}


class ResetPassword extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      stepIndex: 0,
    }

    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);

    this.steps = [
      <ResetPasswordEmailStep nextStep={this.nextStep} />,
      <ResetPasswordCodeStep nextStep={this.nextStep} />,
      <ResetPasswordNewPasswordStep nextStep={this.nextStep} />,
      <Navigate to="/login" />
    ];
  }

  nextStep() {
    this.setState((prevState) => ({ stepIndex: Math.min(prevState.stepIndex + 1, this.steps.length - 1) }));
  }

  prevStep() {
    this.setState((prevState) => ({ stepIndex: Math.max(prevState.stepIndex - 1, 0) }));
  }

  render() {
    return this.steps[this.state.stepIndex];
  }
}

export default ResetPassword;
