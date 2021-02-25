import React, { useEffect, useState } from 'react';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Checkbox,
	Box,
	Typography,
} from '@material-ui/core/';

function CheckboxList(props) {
	const [checked, setChecked] = React.useState('');

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	return (
		<Box mt={4}>
			<Typography variant='h4' color='textPrimary'>
				Ingredients
			</Typography>

			<List>
				{props.ingredients.map((value) => {
					const labelId = `checkbox-list-label-${value}`;

					return (
						<ListItem
							key={value}
							role={undefined}
							button
							onClick={handleToggle(value)}
						>
							<ListItemIcon>
								<Checkbox
									edge='start'
									checked={checked.indexOf(value) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{ 'aria-labelledby': labelId }}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={value} />
						</ListItem>
					);
				})}
			</List>
		</Box>
	);
}
export default CheckboxList;
