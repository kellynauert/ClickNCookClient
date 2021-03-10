import { Grid, Chip, Box, Typography } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import { Link } from 'react-router-dom';
import React from 'react';
function RecipeTitle(props) {
	return (
		<Grid container direction='row' className='RecipeHeaderBits'>
			<Box>
				<Grid container direction='row' alignItems='center'>
					<Box paddingRight={4} marginBottom='0px'>
						<Typography variant='h2' color='textPrimary' component='h2'>
							{props.recipeName}
						</Typography>
					</Box>
				</Grid>
				<Box className='username'>
					<Link to={`/chef/${props.chef}`} style={{ textDecoration: 'none' }}>
						<Typography variant='subtitle1' color='textSecondary'>
							{props.chef}
						</Typography>
					</Link>
				</Box>
			</Box>
		</Grid>
	);
}
export default RecipeTitle;
