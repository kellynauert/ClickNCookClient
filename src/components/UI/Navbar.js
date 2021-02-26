import { React } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SingleRecipe from '../Recipes/SingleRecipe';
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import AllRecipes from '../Recipes/Allrecipes'
import Auth from '../Auth/Auth';
import RecipeIndex from '../../user/RecipeIndex';

export default function NavBar(props) {

	function Home() {
		return (
			<>
				<AllRecipes />
				<Link to='/singlerecipe'>All Recipes</Link>
			</>
		);
	}

	function MyRecipes() {
		return <RecipeIndex token={props.sessionToken} />;
		// <>{protectedViews()}</>;
	}

	function SingleRecipePath() {
		return <SingleRecipe recipeID={1} />;
	}
	function AuthPath() {
		return <Auth token={props.sessionToken} updateToken={props.updateToken} />;
	}
	function ChefRecipes() {
		return null;
	}
	const protectedViews = () => {
		return props.sessionToken === localStorage.getItem('token') ? (
			<RecipeIndex token={props.sessionToken} />
		) : (
			<Auth token={props.sessionToken} updateToken={props.updateToken} />
		);
	};
	return (
		<Router>
			<AppBar position='sticky' style={{ width: '100vw' }}>
				<Box className='container'>
					<Toolbar style={{ padding: '0' }}>
						<Box>
							<Link
								to='/home'
								style={{ color: 'white', textDecoration: 'none' }}
							>
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
								<Link
									to='/home'
									style={{ color: 'white', textDecoration: 'none' }}
								>
									<Typography variant='subtitle1'>Explore Recipes</Typography>
								</Link>
							</Box>
							<Box>
								<Link
									to='/myrecipes'
									style={{ color: 'white', textDecoration: 'none' }}
								>
									<Typography variant='subtitle1'>My Recipes</Typography>
								</Link>
							</Box>
							<Box>
								<Link
									to='/chefrecipes'
									style={{ color: 'white', textDecoration: 'none' }}
								>
									<Typography variant='subtitle1'>Chef Recipes</Typography>
								</Link>
							</Box>
						</Box>
						<Box
							width='100%'
							display='flex'
							justifyContent='flex-end'
							marginLeft={12}
						>
							<Box justifySelf='right'>
								<Link
									onClick={props.clearToken}
									to='/auth'
									style={{ color: 'white', textDecoration: 'none' }}
								>
									<Typography variant='subtitle1'>Auth</Typography>
								</Link>
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
					<Route path='/singlerecipe'>
						<SingleRecipePath />
					</Route>
					<Route path='/home'>
						<Home />
					</Route>
					<Route path='/chefrecipes'>
						<ChefRecipes />
					</Route>
					<Route path='/auth'>
						<AuthPath />
					</Route>
				</Switch>
			</Box>
		</Router>
	);
}
