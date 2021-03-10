import { Grid, Chip, Box, Typography } from '@material-ui/core';
import Icon from '@mdi/react';
import { spacing } from '@material-ui/system';
import React, { useEffect, useState } from 'react';

function RecipeCardTitle(props) {
	return (
		<Grid container direction='row' className='RecipeHeaderBits'>
			<Box style={{ width: '100%' }}>
				<Box
					paddingRight={4}
					marginBottom='0px'
					style={{
						display: 'flex',
						alignItems: 'center',
						position: 'relative',
					}}
				>
					<Typography
						variant='h5'
						color='textPrimary'
						component='h2'
						style={{
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
					>
						{props.recipeName}
					</Typography>
				</Box>
				<Box className='username'>
					<Typography variant='subtitle1' color='textSecondary'>
						By {props.chef}
					</Typography>
				</Box>
			</Box>
		</Grid>
	);
}
export default RecipeCardTitle;
