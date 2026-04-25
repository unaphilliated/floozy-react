import Axios from "axios";
import { type User } from "../store/AuthContext";

export async function register(email: string, password: string) {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  return { email } as User; // Simulate successful registration with dummy user data

  // return await Axios.get(
  //   "http://localhost:8080/register", // TODO: Replace placeholder URI with environment variable
  // )
  // .then(response => {
  //   if (response.status !== 200) {
  //     console.error('Register failed with status:', response.status);
  //     return null;
  //   }
  //   return response.data;
  // })
  // .catch(error => {
  //   console.error('Register error:', error);
  //   return null;
  // });
}

export async function login(email: string, password: string) {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  return { email } as User; // Simulate successful login with dummy user data

  // HTTPS connection secures password in transit - do NOT send over HTTP
  // await Axios.post(
  //   "http://localhost:8080/login", // TODO: Replace placeholder URI with environment variable
  //   { email, password }, 
  //   { headers: { "Content-Type": "application/json" } }
  // )
  // .then(response => {
  //   if (response.status !== 200 || !response.data) {
  //     console.error('Login failed with status:', response.status);
  //     return null;
  //   };
  //   const accountInfo = response.data as User;
  //   return accountInfo;
  // })
  // .catch(error => {
  //   console.error('Login error:', error);
  //   return null;
  // });
}

export async function logout() {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  return true; // Simulate successful logout

  // await Axios.post(
  //   "http://localhost:8080/logout", // TODO: Replace placeholder URI with environment variable
  //   undefined,
  //   { withCredentials: true }
  // )
  // .then(response => {
  //   if (response.status !== 200) {
  //     console.error('Logout failed with status:', response.status);
  //     return true;
  //   }
  // })
  // .catch(error => {
  //   console.error('Logout error:', error);
  //   return false;
  // });
}

export async function getAccountInfo() {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  return { email: "dummy@example.com" } as User; // Simulate successful get with dummy user data

  // return await Axios.get(
  //   "http://localhost:8080/accountinfo", // TODO: Replace placeholder URI with environment variable
  //   { withCredentials: true }
  // )
  // .then(response => {
  //   if (response.status !== 200) {
  //     console.error('Get account info failed with status:', response.status);
  //     return null;
  //   }
  //   return response.data;
  // })
  // .catch(error => {
  //   console.error('Get account info error:', error);
  //   return null;
  // });
}
