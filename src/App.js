import './App.css';
import React, { useState, useEffect } from 'react';
import Auth from "./components/auth/Auth";

function App() {
  const [sessionToken, setSessionToken] = useState ('');

  useEffect(() => {
    if (localStorage.getItem('token'));{
      setSessionToken(localStorage.getItem('token'));
    }
    }, [])

    const updateToken = (newToken) => {
      localStorage.setItem('token', newToken);
      setSessionToken(newToken);
      console.log(sessionToken);
    }

    const clearToken = () => {
      localStorage.clear();
      setSessionToken('');
    }

    // const protectedViews = () => {
    //   return (sessionToken === localStorage.getItem('token') ? <WorkoutIndex token={sessionToken} />
    //   : <Auth updateToken={updateToken} />)
    // }

  return (
    <div>
      <h1>ClickNCook</h1>
      <Auth />
    </div>
  );
}

export default App;
