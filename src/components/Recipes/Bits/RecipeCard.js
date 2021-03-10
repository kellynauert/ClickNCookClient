import {
	Card,
	CardContent,
	Typography,
	Box,
	Grid,
	CardMedia,
	Chip,
	Paper,
} from '@material-ui/core/';
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
import Icon from '@mdi/react';
import { Link } from 'react-router-dom';
import RecipeCardTitle from './RecipeCardTitle';
import React, { useEffect, useState } from 'react';

function RecipeCard(props) {
	useEffect(() => {
		if (props.recipe.photo_url !== undefined) {
			setImage(props.recipe.photo_url);
		}
	}, [props.recipe.photo_url]);
	const [image, setImage] = useState(
		'http://miro.medium.com/max/1080/0*DqHGYPBA-ANwsma2.gif'
	);
	const [icon, setIcon] = useState();

	useEffect(() => {
		if (props.recipe.category == 'Dessert') {
			setIcon(
				<Icon path={mdiCupcake} size={0.8} style={{ marginRight: '8px' }} />
			);
		} else if (props.recipe.category == 'Dinner') {
			setIcon(
				<Icon path={mdiFoodTurkey} size={0.8} style={{ marginRight: '8px' }} />
			);
		} else if (props.recipe.category == 'Breakfast') {
			setIcon(
				<Icon path={mdiCoffee} size={0.8} style={{ marginRight: '8px' }} />
			);
		} else if (props.recipe.category == 'Lunch') {
			setIcon(
				<Icon path={mdiPizza} size={0.8} style={{ marginRight: '8px' }} />
			);
		}
	}, [props]);

	return (
		<Grid item xs={12} md={6} lg={4}>
			<Link
				to={`./singlerecipe/${props.recipe.id}`}
				style={{ textDecoration: 'none' }}
			>
				<Card elevation={2} style={{}}>
					<CardMedia
						image={image}
						style={{ height: '25vh', position: 'relative' }}
					>
						<Paper
							style={{
								backgroundColor: 'rgba(255,255,255,1)',
								color: '#FF8F00',
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
							<Typography variant='body1'>{props.recipe.category}</Typography>
						</Paper>
						<Paper
							style={{
								backgroundColor: 'rgba(255,255,255,.75)',
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
							{props.recipe.views > props.spicyViews ? (
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
								{props.recipe.views}
							</Typography>
						</Paper>
					</CardMedia>
					<CardContent>
						<RecipeCardTitle
							recipeName={props.recipe.recipe_name}
							chef={props.recipe.chef}
							category={props.recipe.category}
							views={props.recipe.views}
							spicyViews={props.spicyViews}
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
									{props.recipe.cook_time} min.
								</Typography>
							</Box>

							<Box alignItems='center' display='flex' flexDirection='row'>
								<Icon
									path={mdiBasketOutline}
									size={0.7}
									style={{ marginRight: '8px' }}
								/>
								<Typography variant='subtitle1' color='textPrimary'>
									{props.recipe.ingredients.length} items
								</Typography>
							</Box>
							<Box alignItems='center' display='flex' flexDirection='row'>
								<Icon
									path={mdiBowlMixOutline}
									size={0.7}
									style={{ marginRight: '8px' }}
								/>
								<Typography variant='subtitle1' color='textPrimary'>
									{props.recipe.servings} servings
								</Typography>
							</Box>
						</Box>
					</CardContent>
				</Card>
			</Link>
		</Grid>
	);
}

export default RecipeCard;
