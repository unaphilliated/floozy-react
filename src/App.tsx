import { BrowserRouter, Routes, Route } from 'react-router';
import Header from "./components/Header";
import Home from "./pages/Home";
import AuthShield from "./components/AuthShield";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import './App.css';

const App = () => {
  return (
	<div className="content">
	  <Header />
	  <BrowserRouter>
		<Routes>
		  <Route path="/" element={<Home />} />
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />

			<Route element={<AuthShield />}>
			  <Route path="/dashboard" element={<Dashboard />} />
			</Route>
		</Routes>
	  </BrowserRouter>
	</div>
  );
};

export default App;
