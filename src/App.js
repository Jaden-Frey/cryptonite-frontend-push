import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage";
import EthereumPage from "./EthereumPage";
import Bitcoin from "./Bitcoin";
import Tether from "./Tether";
import Bnb from "./Bnb";
import SolanaPage from "./SolanaPage";
import Usdc from "./Usdc";
import Xrp from "./Xrp";
import Doge from "./Doge";
import Cardano from "./Cardano";
import Polkadot from "./Polkadot";
import ProtectedRoute from "./ProtectedRoute";
import Spinner from "./Spinner";
import IconComponent from "./IconBackground";
import "./Questionmark.css";
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false); 

const logout = async () => {
  try {
    const response = await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });

    if (response.status === 200) {
      console.log(response.data.message);
      window.location.href = 'http://localhost:5000/login';
    } else {
      console.error('Logout failed:', response.data.message);
    }
  } catch (error) {
    console.error('Error:', error.response ? error.response.data.message : error.message);
  }
};

  const checkAuthentication = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/check', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setAuthenticated(data.authenticated);
      } else {
        setAuthenticated(false); 
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setAuthenticated(false); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);


  if (loading) {
    return <Spinner />;
  }

  return (
    <Router>
      <div className="App">
        <IconComponent />
      <header className="App-header">
        <div id="logo-container" className="logo-container" title="Click to logout" onClick={logout}>
          <div className="logo" id="logout-button">
            <span className="logo-text"><b>CRYPT</b></span>
          <div className="logo-gem-container">
             <i className="bi bi-gem logo-gem"></i>
          </div>
            <span className="logo-text"><b>NITE</b></span>
          </div>
      </div>
    </header>

{/* Navigation Menu */}
<nav>
  <ul className="menu">
    <li className="menu-item">
      <a 
        href="http://localhost:5000/" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        TUTORIAL PAGE
      </a>
    </li>
    <li className="menu-item">
      <a 
        href="http://localhost:5000/marksum" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        MARKET SUMMARY
      </a>
    </li>
    <li className="menu-item">
      <a 
        href="http://localhost:5000/coins" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        CURRENCY PAGE
      </a>
    </li>
    <li className="menu-item">
      <a 
        href="http://localhost:5000/favourites" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        FAVOURITES PAGE
      </a>
    </li>
  </ul>
</nav>

        {/* Link to Bootstrap Icons */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />

        <main>
          <Routes>
            {/* The root route should lead to a home page or dashboard */}
            <Route path="/" element={<ProtectedRoute element={<HomePage />} authenticated={authenticated} />} />

            {/* The other protected routes */}
            <Route path="/ethereum" element={<ProtectedRoute element={<EthereumPage />} authenticated={authenticated} />} />
            <Route path="/bitcoin" element={<ProtectedRoute element={<Bitcoin />} authenticated={authenticated} />} />
            <Route path="/tether" element={<ProtectedRoute element={<Tether />} authenticated={authenticated} />} />
            <Route path="/binancecoin" element={<ProtectedRoute element={<Bnb />} authenticated={authenticated} />} />
            <Route path="/solana" element={<ProtectedRoute element={<SolanaPage />} authenticated={authenticated} />} />
            <Route path="/usd-coin" element={<ProtectedRoute element={<Usdc />} authenticated={authenticated} />} />
            <Route path="/ripple" element={<ProtectedRoute element={<Xrp />} authenticated={authenticated} />} />
            <Route path="/dogecoin" element={<ProtectedRoute element={<Doge />} authenticated={authenticated} />} />
            <Route path="/cardano" element={<ProtectedRoute element={<Cardano />} authenticated={authenticated} />} />
            <Route path="/polkadot" element={<ProtectedRoute element={<Polkadot />} authenticated={authenticated} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
