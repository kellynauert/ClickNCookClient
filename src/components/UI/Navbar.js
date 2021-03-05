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
} from '@material-ui/core';
import { spacing } from '@material-ui/system';
import Auth from '../auth/Auth';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import RecipeIndex from '../../user/RecipeIndex';
import AllRecipes from '../Recipes/Allrecipes';
import ChefRecipes from '../Recipes/ChefRecipes';

export default function NavBar(props) {

	 
	function Home() {
		return <AllRecipes />;
	}

	function MyRecipes() {
		return props.token ? <RecipeIndex token={props.token} /> : <>My Recipes</>;
	}

	function SingleRecipePath() {
		let { id } = useParams();
		return <SingleRecipe recipeID={id} />;
	}
	function AuthPath() {
		return <Auth token={props.sessionToken} updateToken={props.updateToken} setIsLoggedIn={props.setIsLoggedIn} />;
	}
	function ChefRecipesPath() {
		let { id } = useParams();
		return <ChefRecipes chef={id} />;
	}
	const protectedViews = () => {
		return props.sessionToken === localStorage.getItem('token') ? (
			<RecipeIndex token={props.token} />
		) : (
			<Auth token={props.sessionToken} updateToken={props.updateToken} />
		);
	};
	const [openSignup, setOpenSignup] = useState(false);
	const [openLogin, setOpenLogin] = useState(false);
	const [buttonText, setButtonText] = useState('Login');
	const handleOpenLogin = () => {
		if (buttonText === 'Logout') {
			props.logout();
			setButtonText('Login');
			return null;
		}
		setOpenLogin(true);
		setButtonText('Login');
	};

	const handleOpenSignup = () => {
		setOpenSignup(true);
	};

	const handleClose = () => {
		setOpenLogin(false);
		setOpenSignup(false);
		setButtonText('Logout');
	};

	

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
							{ props.isLoggedIn && <Box marginRight={4}>
								<Link
									to='/myrecipes'
									style={{ color: 'black', textDecoration: 'none' }}
								>
									<Typography variant='subtitle1'>My Recipes</Typography>
								</Link>
							</Box>}
						</Box>
						<Box
							width='100%'
							display='flex'
							justifyContent='flex-end'
							marginLeft={12}
						>
							<Box justifySelf='right'>
								<Button
									type='button'
									onClick={handleOpenLogin}
									style={{ color: 'black', textDecoration: 'none' }}
								>
									<Typography variant='subtitle1'>{buttonText}</Typography>
								</Button>
								<Modal open={openLogin} onBackdropClick={handleClose}>
									<Login token={props.token} updateToken={props.updateToken} setIsLoggedIn={props.setIsLoggedIn} />
								</Modal>
							</Box>
						</Box>
						<Box>
							<Box justifySelf='right'>
							 {!props.isLoggedIn && <Button
								type='button'
								onClick={handleOpenSignup}
								style={{ color: 'black', textDecoration: 'none' }}
							>
								<Typography variant='subtitle1'>Signup</Typography>
							</Button>}

								<Modal open={openSignup} onBackdropClick={handleClose}>
									<Signup token={props.token} updateToken={props.updateToken} setIsLoggedIn={props.setIsLoggedIn}/>
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
					<Route path='/singlerecipe/:id'>
						<SingleRecipePath />
					</Route>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route path='/chef/:id'>
						<ChefRecipesPath />
					</Route>
					<Route path='/auth'>
						<AuthPath />
					</Route>
				</Switch>
			</Box>
		</Router>
	);
}
