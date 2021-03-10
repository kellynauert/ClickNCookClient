import React, { useState } from 'react';
import {
	Button,
	TextField,
	Grid,
	Paper,
	Typography,
	Link,
} from '@material-ui/core';
import APIURL from '../../helpers/environment';
const Signup = (props) => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	let handleSubmit = (event) => {
		event.preventDefault();
		fetch(`${APIURL}/user/register`, {
			method: 'POST',
			body: JSON.stringify({
				username: username,
				email: email,
				password: password,
			}),
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				props.setIsLoggedIn(true);
				props.updateToken(data.sessionToken);
				props.updateUsername(data.user.username);
			});
	};

	return (
		<Grid container item md={4} lg={3} xs={12} spacing={2}>
			<Paper style={{ padding: '16px' }} elevation={8}>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant='h5' align='center'>
								Sign Up for ClickNCook
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<TextField
								type='username'
								placeholder='Username'
								fullWidth
								name='username'
								variant='outlined'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
								autoFocus
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								type='email'
								placeholder='Email'
								fullWidth
								name='email'
								variant='outlined'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								type='password'
								placeholder='Password'
								fullWidth
								name='password'
								variant='outlined'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								fullWidth
								variant='contained'
								color='secondary'
								style={{ backgroundColor: '#FF8F00' }}
								type='submit'
								className='button-block'
							>
								Signup
							</Button>
							<br />
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Grid>
	);
};

export default Signup;
