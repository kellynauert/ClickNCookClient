import {
	Grid,
	Box,
	Card,
	CardMedia,
	Paper,
	Typography,
} from '@material-ui/core';
import Icon from '@mdi/react';
import RecipeTitle from './Bits/RecipeTitle';
import CheckboxList from './Bits/Ingredients';
import Directions from './Bits/Directions';
import React, { useEffect, useState } from 'react';
import StopWatchApp from './Bits/StopWatchApp';
import { spacing } from '@material-ui/system';
import APIURL from '../../helpers/environment';
import { useParams } from 'react-router-dom';
import {
	mdiClockTimeTwoOutline,
	mdiBasketOutline,
	mdiBowlMixOutline,
	mdiEye,
	mdiStarShooting,
	mdiCupcake,
	mdiFoodTurkey,
	mdiPizza,
	mdiCoffee,
} from '@mdi/js';

function SingleRecipe(props) {
	let { id } = useParams();
	const [recipe, setRecipe] = useState('');
	const [fetchingRecipe, setFetchingRecipe] = useState(false);

	useEffect(() => {
		if (!recipe && !fetchingRecipe) {
			console.log(`hi ${fetchingRecipe}`);
			setFetchingRecipe(true);
			fetchRecipes();
		}
	}, []);

	function fetchRecipes() {
		console.log(props);
		fetch(`${APIURL}/recipe/id/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				setRecipe(res.recipes[0]);
			});
	}

	const [image, setImage] = useState(
		'http://miro.medium.com/max/1080/0*DqHGYPBA-ANwsma2.gif'
	);
	useEffect(() => {
		if (recipe.photo_url !== undefined) {
			setImage(recipe.photo_url);
		}
	}, [recipe.photo_url]);

	const [icon, setIcon] = useState();

	useEffect(() => {
		if (recipe.category == 'Dessert') {
			setIcon(
				<Icon path={mdiCupcake} size={0.8} style={{ marginRight: '8px' }} />
			);
		} else if (recipe.category == 'Dinner') {
			setIcon(
				<Icon path={mdiFoodTurkey} size={0.8} style={{ marginRight: '8px' }} />
			);
		} else if (recipe.category == 'Breakfast') {
			setIcon(
				<Icon path={mdiCoffee} size={0.8} style={{ marginRight: '8px' }} />
			);
		} else if (recipe.category == 'Lunch') {
			setIcon(
				<Icon path={mdiPizza} size={0.8} style={{ marginRight: '8px' }} />
			);
		}
	}, [recipe]);
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
					<CardMedia image={image} style={{ height: '50vh' }}>
						<Paper
							style={{
								backgroundColor: 'rgba(255,255,255,.8)',
								color: 'rgba(0, 0, 0, 0.54)',
								borderRadius: '4px',
								margin: '16px',
								position: 'absolute',
								display: 'flex',
								alignItems: 'center',
								padding: '4px 16px 4px 12px',
							}}
							elevation={0}
						>
							{icon}
							<Typography variant='body1' color='textSecondary'>
								{recipe.category}
							</Typography>
						</Paper>
						<Paper
							style={{
								backgroundColor: 'rgba(255,255,255,.8)',
								margin: '16px',
								position: 'absolute',
								right: '0',
								borderRadius: '100px',
								display: 'flex',
								alignItems: 'center',
								flexDirection: 'column',
								width: '20px',
								padding: '8px',
							}}
							elevation={0}
						>
							{recipe.views > props.spicyViews ? (
								<Icon
									path={mdiStarShooting}
									style={{
										height: '100% !important',
										width: '100% !important',
										color: '#2979ff',
									}}
								/>
							) : (
								<Icon
									path={mdiEye}
									style={{
										height: '100% !important',
										width: '100% !important',
										color: 'black',
										opacity: '.5',
									}}
								/>
							)}
							<Typography variant='subtitle2' color='textSecondary'>
								{recipe.views}
							</Typography>
						</Paper>
					</CardMedia>
					<StopWatchApp cookTime={recipe.cook_time} />
				</Card>
			</Grid>

			<Grid item xs={7}>
				<Box>
					<RecipeTitle recipeName={recipe.recipe_name} chef={recipe.chef} />
				</Box>

				<Box
					display='flex'
					flexDirection='column'
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

						{recipe.ingredients ? (
							<Typography variant='subtitle1' color='textPrimary'>
								{' '}
								{recipe.ingredients.length} items{' '}
							</Typography>
						) : null}
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

				<CheckboxList
					ingredients={recipe.ingredients ? recipe.ingredients : ['']}
				/>
				<Directions directions={recipe.directions} />
			</Grid>
		</Grid>
	);
}

export default SingleRecipe;
