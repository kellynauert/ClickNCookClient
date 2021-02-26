import React, { useEffect, useState } from 'react';
import {
	Card,
	CardHeader,
	CardContent,
	Typography,
	Box,
	Grid,
} from '@material-ui/core/';

function AllRecipes() {
	let [recipe, setRecipe] = useState([]);

	useEffect(() => {
		getAllRecipes();
		console.log(recipe);
	}, []);

	function getAllRecipes() {
		fetch(`http://localhost:3000/recipe/`, {
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
		return recipe.map((recipe, index) => {
			return (
				<Grid item md={4} key={index}>
					<Card key={index}>
						<CardHeader
							title={recipe.recipe_name}
							subheader={recipe.category}
						/>
						<CardContent>
							<Typography variant='subtitle2'>Views {recipe.views}</Typography>
							<Typography>
								Cook Time: {recipe.cook_time}
								<br />
								Serves: {recipe.servings}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			);
		});
	};

	return <RecipeMapper />;
}

export default AllRecipes;
