import React, { useEffect, useState } from 'react';
import {
	Card,
	CardHeader,
	CardContent,
	Typography,
	Box,
	Grid,
	MenuItem,
	makeStyles,
	TextField,
} from '@material-ui/core/';
import RecipeCard from './Bits/RecipeCard';
const useStyles = makeStyles({
	filter: {
		width: '190px',
	},
});

function ChefRecipes(props) {
	const classes = useStyles();
	let [recipe, setRecipe] = useState([]);
	const [filterCategory, setFilterCategory] = useState('');

	useEffect(() => {
		getAllRecipes();
		console.log(recipe);
	}, []);

	function getAllRecipes() {
		fetch(`http://localhost:3000/recipe/${props.chef}`, {
			method: 'GET',
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				setRecipe(res);
				console.log(recipe);
			});
	}

	const RecipeMapper = () => {
		return recipe
			.filter(
				(recipe) => filterCategory === recipe.category || filterCategory === ''
			)
			.map((recipe, index) => {
				return <RecipeCard key={index} recipe={recipe} />;
			});
	};

	return (
		<div>
			<Box
				display='flex'
				flexDirection='row'
				alignItems='center'
				justifyContent='space-between'
			>
				<Box>
					<Typography variant='h2' color='textPrimary'>
						{props.chef}'s Recipes
					</Typography>
				</Box>
				<Box>
					<TextField
						className={classes.filter}
						select
						variant='outlined'
						id='category'
						label='Recipes by Category'
						value={filterCategory}
						onChange={(e) => setFilterCategory(e.target.value)}
					>
						<MenuItem value=''>All Recipes</MenuItem>
						<MenuItem value='breakfast'>Breakfast</MenuItem>
						<MenuItem value='lunch'>Lunch</MenuItem>
						<MenuItem value='dinner'>Dinner</MenuItem>
						<MenuItem value='dessert'>Dessert</MenuItem>
					</TextField>
				</Box>
			</Box>
			<Grid container direction='row' spacing={2}>
				{RecipeMapper()}
			</Grid>
		</div>
	);
}

export default ChefRecipes;
