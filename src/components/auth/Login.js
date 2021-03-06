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
			});
	};
	return (
		<div>
			<br />
			<br />
			<br />

			<Grid container spacing={12} justify='center' direction='row'>
				<Grid item item xs={3}>
					<Grid
						container
						direction='column'
						justify='center'
						spacing={2}
						className='login-form'
					>
						<Paper
							variant='elevation'
							elevation={3}
							className='login-background'
						>
							<Grid item>
								<Typography component='h1' variant='h5' align='center'>
									<br />
									Log In to ClickNCook
								</Typography>
							</Grid>
							<Grid item>
								<form onSubmit={handleSubmit}>
									<Grid container direction='column' spacing={2}>
										<Grid item>
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
										<Grid item>
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
										<Grid item align='center'>
											<Button
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
							</Grid>
							<Grid item align='center'>
								<Link href='#' variant='body2'>
									Forgot Password?
								</Link>
								<br />
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default Login;
