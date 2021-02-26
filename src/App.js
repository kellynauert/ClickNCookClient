import './App.css';
import Navbar from './components/UI/Navbar';
import React, { useState, useEffect } from 'react';
import Auth from './components/Auth/Auth';
import Sitebar from './home/Navbar';

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
			<Navbar token={sessionToken} updateToken={updateToken} />
		</>
	);
}

export default App;
