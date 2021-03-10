import React, { useEffect, useState } from 'react';
import {
	Typography,
	Box,
	Grid,
	MenuItem,
	makeStyles,
	TextField,
} from '@material-ui/core/';
import RecipeCard from './Bits/RecipeCard';
import APIURL from '../../helpers/environment';
import { useParams } from 'react-router-dom';
const useStyles = makeStyles({
	filter: {
		width: '190px',
	},
});
function ChefRecipes(props) {
	const classes = useStyles();
	let [recipe, setRecipe] = useState([]);
	const [filterCategory, setFilterCategory] = useState('');
	let { id } = useParams();

	useEffect(() => {
		getAllRecipes();
		console.log(recipe);
	}, []);

	function getAllRecipes() {
		fetch(`${APIURL}/recipe/${id}`, {
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
				mb={2}
			>
				<Box>
					<Typography variant='h2' color='textPrimary'>
						{id}'s Recipes
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
						<MenuItem value='Breakfast'>Breakfast</MenuItem>
						<MenuItem value='Lunch'>Lunch</MenuItem>
						<MenuItem value='Dinner'>Dinner</MenuItem>
						<MenuItem value='Dessert'>Dessert</MenuItem>
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
