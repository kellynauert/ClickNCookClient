import { Box, Typography } from '@material-ui/core';

function Directions(props) {
	return (
		<Box mt={3}>
			<Typography variant='h4' color='textPrimary'>
				Directions
			</Typography>

			<Typography
				variant='body1'
				color='textPrimary'
				className='content'
				dangerouslySetInnerHTML={{ __html: props.directions }}
			></Typography>
		</Box>
	);
}
export default Directions;
