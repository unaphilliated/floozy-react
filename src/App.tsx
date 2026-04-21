import { BrowserRouter, Routes, Route } from 'react-router';
import Header from "./components/Header";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import AuthShield from "./components/AuthShield";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import ResetPassword from "./pages/ResetPassword";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import './App.css';

const App = () => {
  return (
		<div className="content">
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/pricing" element={<Pricing />} />
					<Route path="/faq" element={<FAQ />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/logout" element={<Logout />} />
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route element={<AuthShield />}>
						<Route path="/account" element={<Account />} />
						<Route path="/dashboard" element={<Dashboard />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
  );
};

export default App;
