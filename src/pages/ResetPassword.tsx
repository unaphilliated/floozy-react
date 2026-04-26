import React from 'react';
import '../styles/ResetPassword.scss';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';

class ResetPasswordEmailStep extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { 
      email: '',
      attemptedSubmit: false,
      submitSuccess: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  static contextType = AuthContext;
  declare context: React.ContextType<typeof AuthContext>;

  componentDidMount() {
    if (this.props.params?.code) {
      // If we have a code param, skip straight to the code confirmation step
      this.props.gotoStep("codeStep");
    }
  }
  
  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ [event.target.id]: event.target.value });
  }

  async handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const success = await this.context.resetPassword(this.state.email);
    this.setState({
      attemptedSubmit: true,
      submitSuccess: success
    });
    if (success) {
      this.props.gotoStep("codeStep");
    }
  }

  render() {
    const authContext = this.context;

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
              <input type="submit" value="Reset Password" disabled={authContext.isLoading} />
              {this.state.attemptedSubmit && !this.state.submitSuccess ? <h2 className="form-error-text">Reset password failed<br />Please check your email and try again</h2> : null}
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
      attemptedSubmit: false,
      submitSuccess: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.formatCodeForDisplay = this.formatCodeForDisplay.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  static contextType = AuthContext;
  declare context: React.ContextType<typeof AuthContext>;

  componentDidMount() {
    this.setState({ code: this.formatCodeForDisplay(this.props.params?.code ?? '') });
  }
  
  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const formattedValue = this.formatCodeForDisplay(value);
    this.setState({ [event.target.id]: formattedValue });
  }

  formatCodeForDisplay(code: string) {
    // TODO: Use an input library? Complicated: https://mui.com/material-ui/react-text-field/#integration-with-3rd-party-input-libraries
    // Alphanumeric only, 6 characters max, uppercase, auto-format with dashes -> XXX-XXX
    return code.replace(/[^a-z0-9]+/gi, "").slice(0, 6).toUpperCase().match(/.{1,3}/g)?.join("-") ?? code;
  }

  async handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const success = await this.context.validateResetCode(this.state.code);
    this.setState({
      attemptedSubmit: true,
      submitSuccess: success
    });
    if (success) {
      this.props.gotoStep("newPasswordStep");
    }
  }

  render() {
    const authContext = this.context;

    return (
      <div className="form-page">
        <div className="form-card">
          <h1 className="form-title">Reset Password</h1>
          <form className="form" onSubmit={this.handleSubmit} autoComplete="off">
            <p className="form-helper-text">A confirmation code has been sent to your email.</p>
            <TextField
              required
              id="code"
              label="Confirmation Code"
              placeholder="XXX-XXX"
              variant="outlined"
              value={this.state.code}
              onChange={this.handleInputChange}
            />
            <div className="form-actions">
              <input type="submit" value="Confirm" disabled={authContext.isLoading} />
              {this.state.attemptedSubmit && !this.state.submitSuccess ? <h2 className="form-error-text">Confirmation failed<br />Please check the code and try again</h2> : null}
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
      showPassword: false,
      passwordValid: true,
      passwordMatch: false,
      passwordError: '',
      attemptedSubmit: false,
      submitSuccess: false,
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
  
  handleClickShowPassword() {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  }

  preventMouseEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  async handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const success = await this.context.resetPassword(this.state.code, this.state.newPassword);
    this.setState({
      attemptedSubmit: true,
      submitSuccess: success
    });
    if (success) {
      this.props.gotoStep("redirect");
    }
  }

  render() {
    const authContext = this.context;

    return (
      <div className="form-page">
        <div className="form-card">
          <h1 className="form-title">Reset Password</h1>
          <form className="form" onSubmit={this.handleSubmit} autoComplete="off">
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
              <input type="submit" value="Update Password" disabled={authContext?.isLoading || this.state.emailError || this.state.passwordError || this.state.confirmPasswordError} />
              {this.state.attemptedSubmit && !this.state.submitSuccess ? <h2 className="form-error-text">Password reset failed<br />Please check your details and try again</h2> : null}
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
      stepIndex: "emailStep",
    }

    this.gotoStep = this.gotoStep.bind(this);

    this.steps = {
      "emailStep": <ResetPasswordEmailStep gotoStep={this.gotoStep} params={this.props.params} />,
      "codeStep": <ResetPasswordCodeStep gotoStep={this.gotoStep} params={this.props.params} />,
      "newPasswordStep": <ResetPasswordNewPasswordStep gotoStep={this.gotoStep} params={this.props.params} />,
      "redirect": <Navigate to="/login" />
    };
  }

  gotoStep(stepIndex: string) {
    console.log(`Navigating to step ${stepIndex}`);
    this.setState(() => ({ stepIndex: stepIndex }));
  }

  render() {
    return this.steps[this.state.stepIndex];
  }
}

export default ResetPassword;
