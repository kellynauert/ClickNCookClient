import './App.css';
import Navbar from './components/UI/Navbar';
import React, { useState, useEffect } from 'react';
import RecipeIndex from './user/RecipeIndex';
import Sitebar from './home/Navbar';
import Auth from './auth/Auth';

function App() {
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  };

  const protectedViews = () => {
    return sessionToken === localStorage.getItem('token') ? (
      <RecipeIndex token={sessionToken} />
    ) : (
      <Auth updateToken={updateToken} />
    );
  };

  return (
    <>
      <Sitebar clearToken={clearToken} />
      {protectedViews()}
      			<Navbar />

    </>
  );
}

export default App;
