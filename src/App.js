/* global Pi */

import React, { useState } from 'react';
import UserDetails from './components/UserDetails';
import UserForm from './components/UserForm';
import Listing from './components/Listing';
import Search from './components/Search';
import Contact from './components/Contact';
import Detail from './components/Detail';
import Footer from './components/Footer';
import './App.css';
import FrontPage from './components/FrontPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/css/FrontPage.css';
import myLogo from './img/logo.jpg';
import axios from 'axios';

function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const handleAuthenticate = () => {
    Pi.authenticate(['username', 'payments', 'wallet_address'], onIncompletePaymentFound)
      .then(authResult => {
        // Handle successful authentication
        const accessToken = authResult.accessToken;
        const user = authResult.user;
        console.log('Authentication successful:', user);
        // Proceed with your application logic
        setUser(user);
        setCurrentPage('Home');
        axios.defaults.headers.common['Authorization'] = accessToken;

        // Send authentication to backend
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/authenticate`, {}, {
          headers: { Authorization: accessToken }
        })
        .then(response => {
          console.log('Authentication sent to backend:', response.data);
        })
        .catch(error => {
          console.error('Error sending authentication to backend:', error);
        });
      })
      .catch(error => {
        // Handle authentication error
        console.error('Authentication failed:', error);
        setError('Authentication failed');
      });
  };

  const onIncompletePaymentFound = payment => {
    // Handle incomplete payment found
    console.log('Incomplete payment found:', payment);
    // You may want to complete the payment here before proceeding
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('Home');
  };

  return (
    <div className="App">
      <header>
        <div className="container">
          <div className="header-left">
            <div className="logo">
              <img src={myLogo} alt="Logo" />
            </div>
          </div>
          <div className="header-right">
            {!user && <button className="authenticate-btn" onClick={handleAuthenticate}>Authenticate</button>}
            {user && <span>{user.username}</span>}
            <nav className="navbar">
              <div className="dropdown">
                <button className="dropbtn">Menu</button>
                <div className="dropdown-content">
                  <button onClick={() => handleNavigate('Home')}>Home</button>
                  <button onClick={() => handleNavigate('Listing')}>Listing</button>
                  <button onClick={() => handleNavigate('Search')}>Search</button>
                  {user && <button onClick={() => handleNavigate('Details')}>Details</button>}
                  <button onClick={() => handleNavigate('Contact')}>Contact</button>
                  {user && <button onClick={handleLogout}>Logout</button>}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {currentPage === 'Home' && (
          <div>
            {error && <p>{error}</p>}
          </div>
        )}
        {currentPage === 'Listing' && <Listing />}
        {currentPage === 'Search' && <Search />}
        {currentPage === 'Details' && user ? <Detail user={user} /> : null} {/* Use Detail component */}
        {currentPage === 'Contact' && <Contact />}
      </main>

      {currentPage === 'Home' && <FrontPage />}

      <Footer />
    </div>
  );
}

export default App;
