import './App.css';
import Navbar from './components/UI/Navbar';
import React, { useState, useEffect } from 'react';
//import Auth from './components/auth/Auth';
import Sitebar from './home/Navbar';
import AllRecipes from './components/Recipes/Allrecipes';
import RecipeIndex from './user/RecipeIndex';

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

  return (
    <>
      <Navbar
        token={sessionToken}
        updateToken={updateToken}
        logout={clearToken}
      />
    </>
  );
}

export default App;
