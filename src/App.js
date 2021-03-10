import './App.css';
import Navbar from './components/UI/Navbar';
import React, { useState, useEffect } from 'react';

function App() {
	const [sessionToken, setSessionToken] = useState('');
	const [sessionUsername, setSessionUsername] = useState('');

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			setSessionToken(localStorage.getItem('token'));
			setSessionUsername(localStorage.getItem('username'));
		}
	}, []);

	const updateToken = (newToken) => {
		localStorage.setItem('token', newToken);
		setSessionToken(newToken);
		console.log(sessionToken);
	};
	const updateUsername = (newUsername) => {
		localStorage.setItem('username', newUsername);
		setSessionUsername(newUsername);
	};

	const clearToken = () => {
		localStorage.clear();
		setSessionToken('');
		setSessionUsername('');

		setIsLoggedIn(false);
	};

	return (
		<>
			<Navbar
				token={sessionToken}
				updateToken={updateToken}
				logout={clearToken}
				setIsLoggedIn={setIsLoggedIn}
				isLoggedIn={isLoggedIn}
				updateUsername={updateUsername}
			/>
		</>
	);
}

export default App;
