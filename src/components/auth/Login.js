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
const Login = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		fetch(`${APIURL}/user/login`, {
			method: 'POST',
			body: JSON.stringify({
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
		<Grid container item md={4} xs={12} lg={3} spacing={2}>
			<Paper style={{ padding: '16px' }} elevation={8}>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant='h5' align='center'>
								Log In to ClickNCook
							</Typography>
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
								Lets Cook!
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Grid>
	);
};

export default Login;
