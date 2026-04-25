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
    };

    return <AuthContext value={value}>{this.props.children}</AuthContext>;
  }
}

export default AuthProvider;
