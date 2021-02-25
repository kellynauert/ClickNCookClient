import { React } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SingleRecipe from '../Recipes/SingleRecipe';
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';
import { spacing } from '@material-ui/system';

export default function NavBar() {
	function Home() {
		return (
			<>
				<Typography variant='h2' color='textPrimary'>
					All Recipes
				</Typography>
				<Link to='/singlerecipe'>Single Recipe</Link>
			</>
		);
	}

	function MyRecipes() {
		return (
			<Typography variant='h2' color='textPrimary'>
				My Recipes
			</Typography>
		);
	}

	function SingleRecipePath() {
		return <SingleRecipe recipeID={1} />;
	}

	function ChefRecipes() {
		return (
			<Typography variant='h2' color='textPrimary'>
				Chef Recipes
			</Typography>
		);
	}
	return (
		<Router>
			<AppBar position='sticky' style={{ width: '100vw' }}>
				<Box className='container'>
					<Toolbar style={{ padding: '0' }}>
						<Box>
							<Link to='/' style={{ color: 'white', textDecoration: 'none' }}>
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
								<Link to='/' style={{ color: 'white', textDecoration: 'none' }}>
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
						</Box>
						<Box
							width='100%'
							display='flex'
							justifyContent='flex-end'
							marginLeft={12}
						>
							<Box justifySelf='right'>
								<Link to='#' style={{ color: 'white', textDecoration: 'none' }}>
									<Typography variant='subtitle1'>Log Out</Typography>
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
					<Route path='/'>
						<Home />
					</Route>
					<Route path='/chefrecipes'>
						<ChefRecipes />
					</Route>
				</Switch>
			</Box>
		</Router>
	);
}
