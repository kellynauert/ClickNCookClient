import { Grid, Box, Card, CardMedia } from '@material-ui/core';
import DisplayHeaderAndText from './Bits/DisplayHeaderAndText';
import RecipeTitle from './Bits/RecipeTitle';
import CheckboxList from './Bits/Ingredients';
import Directions from './Bits/Directions';
import React, { useEffect, useState } from 'react';
import StopWatchApp from './Bits/StopWatchApp';
import { spacing } from '@material-ui/system';

function SingleRecipe(props) {
	const [recipe, setRecipe] = useState('');
	const [image, setImage] = useState(
		'http://miro.medium.com/max/1080/0*DqHGYPBA-ANwsma2.gif'
	);
	useEffect(() => {
		fetchRecipes();
	}, []);

	useEffect(() => {
		if (recipe.photo_url !== undefined) {
			setImage(recipe.photo_url);
		}
	}, [recipe.photo_url]);
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
			});
	}
	return (
		<Grid container direction='row' spacing={4}>
			<Grid item xs={5}>
				<Card
					style={{
						position: 'sticky',
						top: '80px',
						transition: 'all 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
					}}
					elevation={3}
				>
					<CardMedia image={image} style={{ height: '50vh' }} />
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
