import { Grid, Box, Card, CardMedia, CardContent } from '@material-ui/core';
import DisplayHeaderAndText from './Bits/DisplayHeaderAndText';
import RecipeTitle from './Bits/RecipeTitle';
import CheckboxList from './Bits/Ingredients';
import Directions from './Bits/Directions';
import React, { useEffect, useState } from 'react';
import StopWatchApp from './Bits/StopWatchApp';
import { spacing } from '@material-ui/system';

function SingleRecipe(props) {
	const [recipe, setRecipe] = useState('');

	useEffect(() => {
		fetchRecipes();
	}, []);

	function fetchRecipes() {
		fetch(`http://localhost:3000/recipe/id/${props.recipeID}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((recipe) => {
				setRecipe(recipe.recipes[0]);
				console.log(recipe);
			});
	}

	return (
		<Grid container direction='row' spacing={4}>
			<Grid item xs={6}>
				<Card item style={{ position: 'sticky', top: '24px' }} elevation={3}>
					<CardMedia image={recipe.photo_url} style={{ height: '50vh' }} />
					<StopWatchApp cookTime={recipe.cook_time} />
				</Card>
			</Grid>

			<Grid item xs={6}>
				<Box>
					<RecipeTitle
						recipeName={recipe.recipe_name}
						creator={recipe.chef}
						category={recipe.category}
					/>
				</Box>
				<Box pt={3}>
					<DisplayHeaderAndText header='Servings:' value={recipe.servings} />
					<DisplayHeaderAndText
						header='Cooking Time:'
						value={`${recipe.cook_time} minutes`}
					/>
				</Box>
				<CheckboxList
					ingredients={recipe.ingredients ? recipe.ingredients : ['']}
				/>

				<Directions directions={recipe.directions} />
			</Grid>
		</Grid>
	);
}

export default SingleRecipe;
