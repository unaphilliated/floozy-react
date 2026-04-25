import { createContext } from "react";

export type User = {
  email: string;
};

export type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);