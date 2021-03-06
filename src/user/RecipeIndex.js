import React, { useState, useEffect } from 'react';
import {
	Button,
	Box,
	TextField,
	MenuItem,
	Grid,
	Typography,
} from '@material-ui/core/';
import RecipeCard from './RecipeCard';
import RecipeEdit from './RecipeEdit';
import RecipeCreate from './RecipeCreate';
import APIURL from '../helpers/environment';
const RecipeIndex = (props) => {
	const [buttonText, setButtonText] = useState('Create Recipe');
	const [show, setShow] = useState(false);
	const [updateActive, setUpdateActive] = useState(false);
	const [recipes, setRecipes] = useState([]);
	const [recipeToUpdate, setRecipeToUpdate] = useState({});

	const fetchRecipes = () => {
		fetch(`${APIURL}/recipe/user`, {
			method: 'GET',
			headers: new Headers({
				'Content-Type': 'application/json',
				Authorization: props.token,
			}),
		})
			.then((res) => res.json())
			.then((logData) => {
				console.log(logData);
				setRecipes(logData);
			});
	};

	const editUpdateRecipe = (recipe) => {
		setRecipeToUpdate(recipe);
		console.log(recipe);
	};

	const updateOn = () => {
		setUpdateActive(true);
	};

	const updateOff = () => {
		setUpdateActive(false);
	};

	const handleClick = () => {
		setShow(!show);
		if (show) {
			setButtonText('Create Recipe');
		}

		if (!show) {
			setButtonText('Close Form');
		}
	};

	useEffect(() => {
		fetchRecipes();
	}, []);

	return (
		<div>
			<Box
				display='flex'
				flexDirection='row'
				alignItems='center'
				justifyContent='space-between'
			>
				<Box>
					<Typography variant='h2' color='textPrimary'>
						My Recipes
					</Typography>
				</Box>
				<Box>
					<Button
						variant='contained'
						color='primary'
						style={{ backgroundColor: '#FF8F00' }}
						onClick={handleClick}
					>
						{buttonText}
					</Button>
					{show ? (
						<RecipeCreate fetchRecipes={fetchRecipes} token={props.token} />
					) : (
						<></>
					)}
				</Box>
			</Box>
			<Grid container direction='row' spacing={2}>
				<RecipeCard
					recipes={recipes}
					editUpdateRecipe={editUpdateRecipe}
					updateOn={updateOn}
					fetchRecipes={fetchRecipes}
					token={props.token}
				/>

				{updateActive ? (
					<RecipeEdit
						recipeToUpdate={recipeToUpdate}
						updateOff={updateOff}
						fetchRecipes={fetchRecipes}
						token={props.token}
					/>
				) : (
					<></>
				)}
			</Grid>
		</div>
	);
};

export default RecipeIndex;
