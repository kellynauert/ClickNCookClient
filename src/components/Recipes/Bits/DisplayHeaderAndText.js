import { Grid, Box, Typography } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import React from 'react';

function DisplayHeaderAndText(props) {
	return (
		<Grid container item direction='row' alignItems='center'>
			<Grid item xs={3}>
				<Typography variant='subtitle1' color='textPrimary'>
					{props.header}
				</Typography>
			</Grid>
			<Grid item>
				<Typography variant='body1' color='textPrimary'>
					{props.value}
				</Typography>
			</Grid>
		</Grid>
	);
}

export default DisplayHeaderAndText;
