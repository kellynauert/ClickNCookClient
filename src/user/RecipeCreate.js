import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {
	TextField,
	MenuItem,
	TextareaAutosize,
	CssBaseline,
	Box,
	Paper,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import APIURL from '../helpers/environment';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	textArea: {
		display: 'block',
	},
}));

const RecipeCreate = (props) => {
	const classes = useStyles();
	const [recipeName, setRecipeName] = useState('');
	const [category, setCategory] = useState('');
	const [ingredients, setIngredients] = useState('');
	const [directions, setDirections] = useState('');
	const [cookTime, setCookTime] = useState(0);
	const [servings, setServings] = useState(0);
	const [views, setViews] = useState(0);
	const [imgUrl, setImgUrl] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch(`${APIURL}/recipe/create`, {
			method: 'POST',
			body: JSON.stringify({
				recipe: {
					recipe_name: recipeName,
					category: category,
					ingredients: ingredients,
					directions: directions,
					cook_time: cookTime,
					servings: servings,
					views: views,
					photo_url: imgUrl,
				},
			}),
			headers: new Headers({
				'Content-Type': 'application/json',
				Authorization: props.token,
			}),
		})
			.then((res) => res.json())
			.then(() => setOpenCreate(false))

			.then((logData) => {
				console.log(logData);
				setRecipeName('');
				setCategory('');
				setIngredients([]);
				setDirections('');
				setCookTime(0);
				setServings(0);
				setViews(0);
				setImgUrl('');
				props.fetchRecipes();
			});
	};

	const split = ({ target }) => {
		setIngredients(target.value.split(','));
	};
	const [openCreate, setOpenCreate] = useState(false);
	const handleOpenCreate = () => {
		setOpenCreate(true);
	};

	return (
		<>
			<Box
				display='flex'
				flexDirection='row'
				alignItems='center'
				justifyContent='space-between'
				mb={2}
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
						onClick={handleOpenCreate}
					>
						Create Recipe
					</Button>
				</Box>
			</Box>

			<Modal
				open={openCreate}
				onBackdropClick={() => setOpenCreate(false)}
				style={{
					width: '100vw',
					height: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Grid container item md={6} xs={12} spacing={2}>
					<Paper style={{ padding: '16px' }} elevation={8}>
						<form container className={classes.form} onSubmit={handleSubmit}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Typography variant='h4'>Create Recipe</Typography>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant='outlined'
										required
										fullWidth
										id='recipe-name'
										label='Recipe Name'
										autoFocus
										value={recipeName}
										onChange={(e) => setRecipeName(e.target.value)}
									/>
								</Grid>
								<br />
								<Grid item xs={12}>
									<TextField
										select
										variant='outlined'
										required
										fullWidth
										id='catecgory'
										label='Category'
										value={category}
										onChange={(e) => setCategory(e.target.value)}
									>
										<MenuItem value='' disabled>
											select
										</MenuItem>
										<MenuItem value='Breakfast'>Breakfast</MenuItem>
										<MenuItem value='Lunch'>Lunch</MenuItem>
										<MenuItem value='Dinner'>Dinner</MenuItem>
										<MenuItem value='Dessert'>Dessert</MenuItem>
									</TextField>
								</Grid>
								<br />
								<Grid item xs={12}>
									<TextField
										variant='outlined'
										required
										fullWidth
										id='ingredients'
										label='Ingredients'
										helperText='Seperate ingredients with a , and after last ingredient'
										autoFocus
										value={ingredients}
										onChange={split}
									/>
								</Grid>
								<br />
								<Grid item xs={12}>
									<TextField
										multiline
										rows='8'
										variant='outlined'
										required
										fullWidth
										id='directions'
										placeholder='Directions*'
										value={directions}
										onChange={(e) => setDirections(e.target.value)}
									/>
								</Grid>
								<br />
								<Grid item xs={12}>
									<TextField
										variant='outlined'
										required
										fullWidth
										type='number'
										id='cook-time'
										label='Cook Time'
										autoFocus
										value={cookTime}
										onChange={(e) => setCookTime(e.target.value)}
									/>
								</Grid>
								<br />
								<Grid item xs={12}>
									<TextField
										variant='outlined'
										required
										fullWidth
										type='number'
										id='servings'
										label='Servings'
										autoFocus
										value={servings}
										onChange={(e) => setServings(e.target.value)}
									/>
								</Grid>
								<br />
								<Grid item xs={12}>
									<TextField
										variant='outlined'
										style={{ borderColor: '#FF9003 !important' }}
										fullWidth
										id='image'
										label='Image URL'
										helperText='Enter URL of image'
										value={imgUrl}
										onChange={(e) => setImgUrl(e.target.value)}
									/>
								</Grid>
								<Button
									type='submit'
									fullWidth
									variant='contained'
									style={{ backgroundColor: '#FF9003', color: 'white' }}
									className={classes.submit}
								>
									Create
								</Button>
							</Grid>
						</form>
					</Paper>
				</Grid>
			</Modal>
		</>
	);
};

export default RecipeCreate;
