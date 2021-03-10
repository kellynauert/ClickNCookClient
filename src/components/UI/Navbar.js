import { React, useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
} from 'react-router-dom';
import SingleRecipe from '../Recipes/SingleRecipe';
import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	Modal,
	Button,
	Grid,
} from '@material-ui/core';
import { spacing } from '@material-ui/system';
import Auth from '../auth/Auth';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import RecipeIndex from '../../user/RecipeIndex';
import AllRecipes from '../Recipes/Allrecipes';
import ChefRecipes from '../Recipes/ChefRecipes';

export default function NavBar(props) {
	const [buttonColor, setbuttonColor] = useState('#FF9003');

	function Home() {
		return <AllRecipes />;
	}

	function MyRecipes() {
		return props.token ? <RecipeIndex token={props.token} /> : <>My Recipes</>;
	}

	function AuthPath() {
		return (
			<Auth
				token={props.sessionToken}
				updateToken={props.updateToken}
				setIsLoggedIn={props.setIsLoggedIn}
			/>
		);
	}
	function ChefRecipesPath() {
		let { id } = useParams();
		return <ChefRecipes chef={id} />;
	}

	const [openSignup, setOpenSignup] = useState(false);
	const [openLogin, setOpenLogin] = useState(false);
	const [buttonText, setButtonText] = useState('Login');
	const handleOpenLogin = () => {
		if (buttonText === 'Logout') {
			props.logout();
			setButtonText('Login');
			setbuttonColor('#FF9003');
			return null;
		}
		setOpenLogin(true);
		setButtonText('Login');
	};

	const handleOpenSignup = () => {
		setOpenSignup(true);
	};

	const handleClose = () => {
		if (props.token) {
			setOpenLogin(false);
			setOpenSignup(false);
			setButtonText('Logout');
			setbuttonColor('');
		}
	};

	useEffect(() => {
		handleClose();
	}, [props.token]);

	return (
		<Router>
			<AppBar
				position='sticky'
				style={{ width: '100vw', backgroundColor: 'white' }}
			>
				<Box className='container'>
					<Toolbar style={{ padding: '0' }}>
						<Box>
							<Link to='/' style={{ color: '#FF8F00', textDecoration: 'none' }}>
								<Typography variant='h6'>ClickNCook</Typography>
							</Link>
						</Box>
						<Box
							width='100%'
							display='flex'
							alignItems='center'
							marginLeft={12}
						>
							<Box marginRight={4}>
								<Link to='/' style={{ color: 'black', textDecoration: 'none' }}>
									<Typography variant='subtitle1'>Explore Recipes</Typography>
								</Link>
							</Box>
							{props.token && (
								<Box marginRight={4}>
									<Link
										to='/myrecipes'
										style={{ color: 'black', textDecoration: 'none' }}
									>
										<Typography variant='subtitle1'>My Recipes</Typography>
									</Link>
								</Box>
							)}
						</Box>
						<Box
							width='100%'
							display='flex'
							justifyContent='flex-end'
							marginLeft={12}
							alignItems='center'
						>
							<Box mr={2}>
								<Typography color='textSecondary' variant='subtitle1'>
									{localStorage.getItem('username')}
								</Typography>
							</Box>
							<Box justifySelf='right' mr={2}>
								<Button
									type='button'
									variant='outlined'
									onClick={handleOpenLogin}
									style={{
										borderColor: buttonColor,
										color: buttonColor,
										textDecoration: 'none',
									}}
								>
									<Typography variant='subtitle1'>{buttonText}</Typography>
								</Button>

								<Modal
									open={openLogin}
									onSubmit={handleClose}
									onBackdropClick={() => setOpenLogin(false)}
									style={{
										width: '100vw',
										height: '100vh',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<Login
										token={props.token}
										updateToken={props.updateToken}
										updateUsername={props.updateUsername}
										setIsLoggedIn={props.setIsLoggedIn}
									/>
								</Modal>
							</Box>
						</Box>
						<Box>
							<Box justifySelf='right'>
								{!props.token && (
									<Button
										type='button'
										variant='outlined'
										onClick={handleOpenSignup}
										style={{ color: 'black', textDecoration: 'none' }}
									>
										<Typography variant='subtitle1'>Signup</Typography>
									</Button>
								)}

								<Modal
									open={openSignup}
									onSubmit={handleClose}
									onBackdropClick={() => setOpenSignup(false)}
									style={{
										width: '100vw',
										height: '100vh',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<Signup
										token={props.token}
										updateToken={props.updateToken}
										updateUsername={props.updateUsername}
										setIsLoggedIn={props.setIsLoggedIn}
									/>
								</Modal>
							</Box>
						</Box>
					</Toolbar>
				</Box>
			</AppBar>

			<Box className='container' marginTop={4} marginBottom={4}>
				<Switch>
					<Route path='/myrecipes'>
						<MyRecipes />
					</Route>
					<Route path='/singlerecipe/:id' children={<SingleRecipe />} />
					{/* <SingleRecipePath />
					</Route> */}
					<Route exact path='/'>
						<Home />
					</Route>
					<Route path='/chef/:id' children={<ChefRecipes />} />
					{/* <ChefRecipesPath />
					</Route> */}
					<Route path='/auth'>
						<AuthPath />
					</Route>
				</Switch>
			</Box>
		</Router>
	);
}
