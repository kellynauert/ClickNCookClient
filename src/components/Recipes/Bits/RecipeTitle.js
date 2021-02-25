import { Grid, Chip, Box, Typography } from '@material-ui/core';
import Icon from '@mdi/react';
import { spacing } from '@material-ui/system';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch,
} from 'react-router-dom';

import { mdiCupcake, mdiHamburger, mdiPizza, mdiCoffee } from '@mdi/js';
import React, { useEffect, useState } from 'react';
function RecipeTitle(props) {
	const [icon, setIcon] = useState();
	useEffect(() => {
		if (props.category == 'Dessert') {
			setIcon(<Icon path={mdiCupcake} size={1} />);
		} else if (props.category == 'Dinner') {
			setIcon(<Icon path={mdiHamburger} size={1} />);
		} else if (props.category == 'Breakfast') {
			setIcon(<Icon path={mdiCoffee} size={1} />);
		} else if (props.category == 'Lunch') {
			setIcon(<Icon path={mdiPizza} size={1} />);
		}
	}, [props.category]);

	return (
		<Grid container direction='row' className='RecipeHeaderBits'>
			<Box>
				<Grid container direction='row' alignItems='center'>
					<Box paddingRight={4} marginBottom='0px'>
						<Typography variant='h2' color='textPrimary' component='h2'>
							{props.recipeName}
						</Typography>
					</Box>
					<Box>
						<Chip icon={icon} color='secondary' label={props.category} />
					</Box>
				</Grid>
				<Box className='username'>
					<Link
						to={'/chefrecipes'}
						style={{ color: 'white', textDecoration: 'none' }}
					>
						<Typography variant='subtitle1' color='textSecondary'>
							{props.creator}
						</Typography>
					</Link>
				</Box>
			</Box>
		</Grid>
	);
}
export default RecipeTitle;
