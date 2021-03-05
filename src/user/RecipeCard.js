import React, { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import {
	mdiClockTimeTwoOutline,
	mdiBasketOutline,
	mdiBowlMixOutline,
} from '@mdi/js';
import {
	Card,
	CardContent,
	Typography,
	Box,
	Grid,
	CardMedia,
	Button,
	Divider,
} from '@material-ui/core/';
import Icon from '@mdi/react';
import { Link } from 'react-router-dom';
import RecipeCardTitle from '../components/Recipes/Bits/RecipeCardTitle';

const RecipeCard = (props) => {
	const deleteRecipe = (recipe) => {
		fetch(`http://localhost:3000/recipe/delete/${recipe.id}`, {
			method: 'DELETE',
			headers: new Headers({
				'Content-Type': 'application/json',
				Authorization: props.token,
			}),
		}).then(() => props.fetchRecipes());
	};

	const recipeMapper = () => {
		return props.recipes.map((recipe, index) => {
			return (
				<Grid item xs={12} md={6} lg={4}>
					<Card elevation={2}>
						<CardMedia image={recipe.photo_url} style={{ height: '20vh' }} />
						<CardContent>
							<RecipeCardTitle
								recipeName={recipe.recipe_name}
								chef={recipe.chef}
								category={recipe.category}
							/>
							<Box
								alignItems='center'
								display='flex'
								flexDirection='row'
								mt={2}
								justifyContent='space-between'
							>
								<Box alignItems='center' display='flex' flexDirection='row'>
									<Icon
										path={mdiClockTimeTwoOutline}
										size={0.7}
										style={{ marginRight: '8px' }}
									/>
									<Typography variant='subtitle1' color='textPrimary'>
										{recipe.cook_time} min.
									</Typography>
								</Box>
								<Box alignItems='center' display='flex' flexDirection='row'>
									<Icon
										path={mdiBasketOutline}
										size={0.7}
										style={{ marginRight: '8px' }}
									/>
									<Typography variant='subtitle1' color='textPrimary'>
										{recipe.ingredients.length} items
									</Typography>
								</Box>
								<Box alignItems='center' display='flex' flexDirection='row'>
									<Icon
										path={mdiBowlMixOutline}
										size={0.7}
										style={{ marginRight: '8px' }}
									/>
									<Typography variant='subtitle1' color='textPrimary'>
										{recipe.servings} servings
									</Typography>
								</Box>
							</Box>
							<Divider style={{ marginTop: '16px' }} />
							<Box
								alignItems='center'
								display='flex'
								flexDirection='row'
								justifyContent='space-between'
								mt={2}
							>
								<Link
									to={`./singlerecipe/${recipe.id}`}
									style={{ textDecoration: 'none' }}
								>
									<Button style={{ marginRight: '16px' }}>
										<Typography variant='button' color='textSecondary'>
											View Full
										</Typography>
									</Button>
								</Link>
								<Box
									display='flex'
									flexDirection='row'
									justifyContent='flex-end'
								>
									<Button
										color='secondary'
										variant='outlined'
										startIcon={<DeleteIcon />}
										onClick={() => {
											deleteRecipe(recipe);
										}}
										style={{
											marginRight: '16px',
											color: '#FF8F00',
											borderColor: '#FF8F00',
										}}
									>
										Delete
									</Button>
									<Button
										style={{ backgroundColor: '#FF8F00' }}
										color='primary'
										variant='contained'
										onClick={() => {
											props.editUpdateRecipe(recipe);
											props.updateOn();
										}}
									>
										Edit
									</Button>
								</Box>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			);
		});
	};

	return <>{recipeMapper()}</>;
};

export default RecipeCard;
