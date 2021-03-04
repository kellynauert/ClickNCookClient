import {
	Card,
	CardContent,
	Typography,
	Box,
	Grid,
	CardMedia,
} from '@material-ui/core/';
import {
	mdiClockTimeTwoOutline,
	mdiBasketOutline,
	mdiBowlMixOutline,
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

	return (
		<Grid item xs={12} md={6} lg={4}>
			<Link
				to={`./singlerecipe/${props.recipe.id}`}
				style={{ textDecoration: 'none' }}
			>
				<Card elevation={2}>
					<CardMedia image={image} style={{ height: '20vh' }} />
					<CardContent>
						<RecipeCardTitle
							recipeName={props.recipe.recipe_name}
							chef={props.recipe.chef}
							category={props.recipe.category}
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
