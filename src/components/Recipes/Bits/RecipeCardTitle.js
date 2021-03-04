import { Grid, Chip, Box, Typography } from '@material-ui/core';
import Icon from '@mdi/react';
import { spacing } from '@material-ui/system';
import { mdiCupcake, mdiFoodTurkey, mdiPizza, mdiCoffee } from '@mdi/js';
import React, { useEffect, useState } from 'react';
function RecipeCardTitle(props) {
	const [icon, setIcon] = useState();
	useEffect(() => {
		if (props.category == 'Dessert') {
			setIcon(<Icon path={mdiCupcake} size={0.7} />);
		} else if (props.category == 'Dinner') {
			setIcon(<Icon path={mdiFoodTurkey} size={0.7} />);
		} else if (props.category == 'Breakfast') {
			setIcon(<Icon path={mdiCoffee} size={0.7} />);
		} else if (props.category == 'Lunch') {
			setIcon(<Icon path={mdiPizza} size={0.7} />);
		}
	}, [props.category]);

	return (
		<Grid container direction='row' className='RecipeHeaderBits'>
			<Box>
				<Box paddingRight={4} marginBottom='0px'>
					<Typography variant='h5' color='textPrimary' component='h2'>
						{props.recipeName}
					</Typography>
				</Box>

				<Chip
					size='small'
					icon={icon}
					color='secondary'
					style={{ backgroundColor: '#FF8F00' }}
					label={props.category}
				/>

				<Box className='username' mt={1}>
					<Typography variant='subtitle1' color='textSecondary'>
						By {props.chef}
					</Typography>
				</Box>
			</Box>
		</Grid>
	);
}
export default RecipeCardTitle;
