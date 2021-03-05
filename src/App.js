import './App.css';
import Navbar from './components/UI/Navbar';
import React, { useState, useEffect } from 'react';

function App() {
	const [sessionToken, setSessionToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    setIsLoggedIn(false)
	};

	return (
		<>
			<Navbar
				token={sessionToken}
				updateToken={updateToken}
				logout={clearToken}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
			/>
		</>
	);
}

export default App;
