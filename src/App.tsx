import { BrowserRouter, Routes, Route } from 'react-router';
import AuthProvider from './providers/AuthProvider';
import PodProvider from './providers/PodProvider';
import Header from "./components/Header";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import AuthShield from "./components/AuthShield";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import ResetPasswordWrapper from "./components/ResetPasswordWrapper";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
		<div className="content">
			<AuthProvider>
				<PodProvider>
					<BrowserRouter>
						<Header />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/pricing" element={<Pricing />} />
							<Route path="/faq" element={<FAQ />} />
							<Route path="/register" element={<Register />} />
							<Route path="/login" element={<Login />} />
							<Route path="/logout" element={<Logout />} />
							<Route path="/reset-password/:code?" element={<ResetPasswordWrapper />} />
							<Route element={<AuthShield />}>
								<Route path="/account" element={<Account />} />
								<Route path="/dashboard" element={<Dashboard />} />
							</Route>
						</Routes>
					</BrowserRouter>
				</PodProvider>
			</AuthProvider>
		</div>
  );
};

export default App;
