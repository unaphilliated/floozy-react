import React from "react";
import { AuthContext } from "../store/AuthContext";
import * as authApi from "../services/authService";


class AuthProvider extends React.Component<{ children: React.ReactNode }> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: null,
      isLoading: true,
    };

    this.refreshSession = this.refreshSession.bind(this);
    this.register = this.register.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.validateResetCode = this.validateResetCode.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async refreshSession() {
    this.setState({ isLoading: true });

    const accountInfo = await authApi.getAccountInfo();

    this.setState({
      user: accountInfo,
      isLoading: false
    });
  }

  async register(email: string, password: string) {
    this.setState({ isLoading: true });

    const accountInfo = await authApi.register(email, password);

    this.setState({
      user: accountInfo,
      isLoading: false
    });
  }

  async forgotPassword(email: string) {
    this.setState({ isLoading: true });

    const success = await authApi.forgotPassword(email);

    this.setState({ isLoading: false });
    return success;
  }

  async validateResetCode(code: string) {
    this.setState({ isLoading: true });

    const success = await authApi.validateResetCode(code);

    this.setState({ isLoading: false });
    return success;
  }

  async resetPassword(code: string, newPassword: string) {
    this.setState({ isLoading: true });

    const success = await authApi.resetPassword(code, newPassword);

    this.setState({ isLoading: false });
    return success;
  }

  async login(email: string, password: string) {
    this.setState({ isLoading: true });

    const accountInfo = await authApi.login(email, password);

    this.setState({
      user: accountInfo,
      isLoading: false
    });
  }

  async logout() {
    this.setState({ isLoading: true });

    if (await authApi.logout()) {
      this.setState({
        user: null,
        isLoading: false
      });
    }
    else {
      console.error('Logout failed');
      this.setState({ isLoading: false });
    }
  }

  async componentDidMount() {
    await this.refreshSession();
  }

  render() {
    const value = {
      user: this.state.user,
      isAuthenticated: !!this.state.user,
      isLoading: this.state.isLoading,
      login: this.login,
      logout: this.logout,
      refreshSession: this.refreshSession,
      register: this.register,
      forgotPassword: this.forgotPassword,
      validateResetCode: this.validateResetCode,
      resetPassword: this.resetPassword,
    };

    return <AuthContext value={value}>{this.props.children}</AuthContext>;
  }
}

export default AuthProvider;
