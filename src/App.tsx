import { BrowserRouter, Routes, Route } from 'react-router';
import Header from "./components/Header";
import Home from "./pages/Home";
import './App.css';

const App = () => {
  return (
	<div className="content">
	  <Header />
	  <BrowserRouter>
		<Routes>
		  <Route path="/" element={<Home />} />
		</Routes>
	  </BrowserRouter>
	</div>
  );
};

export default App;
