import React, { useState } from 'react';
import {
	FormControl,
	Input,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@material-ui/core';

const Test = () => {
	const [recipeName, setRecipeName] = useState('');
	const [catagory, setCatagory] = useState('');

	const handleSubmit = () => {
		console.log(recipeName);
		console.log(catagory);
	};

	// <FormControl>
	//   <InputLabel htmlFor="recipe-name-input"> Recipe Name </InputLabel>
	//   <Input
	//     name="recipe-name"
	//     value={recipeName}
	//     aria-describedby="enter-recipe-name-here"
	//     onChange={(e) => setRecipeName(e.target.value)}
	//   />
	// </FormControl>;

	return (
		<>
			<form onSubmit={handleSubmit}>
				<TextField
					id='nmae'
					label='Recipe Name'
					name='Recipe Name'
					value={recipeName}
					onChange={(e) => setRecipeName(e.target.value)}
				/>
				<FormControl>
					<Select
						value={catagory}
						displayEmpty
						onChange={(e) => setCatagory(e.target.value)}
					>
						<MenuItem value='' disabled>
							Select
						</MenuItem>
						<MenuItem value='Breakfast'>Breakfast</MenuItem>
						<MenuItem value='Lunch'>Lunch</MenuItem>
						<MenuItem value='Dinner'>Dinner</MenuItem>
						<MenuItem value='Dessert'>Dessert</MenuItem>
					</Select>
				</FormControl>
				<button type='submit'> Submit </button>
			</form>
		</>
	);
};

export default Test;

// import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Modal from '@material-ui/core/Modal';
// import TextField from '@material-ui/core/TextField';
// import TextareaAutosize from '@material-ui/core/TextareaAutosize';
// import Button from '@material-ui/core/Button';

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
//   const top = 50 + rand();
//   const left = 50 + rand();

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//   },
//   paper: {
//     position: 'absolute',
//     width: 225,
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
//   body: {
//     margin: 'auto',
//   },
// }));

// const RecipeEdit = (props) => {
//   const classes = useStyles();
//   // getModalStyle is not a pure function, we roll the style only on the first render
//   const [modalStyle] = useState(getModalStyle);
//   const [open, setOpen] = useState(true);
//   const [recipeName, setRecipeName] = useState('');
//   const [catagory, setCatagory] = useState('');
//   const [directions, setDirections] = useState('');
//   const [cookTime, setCookTime] = useState(0);
//   const [servings, setServings] = useState(0);
//   const [createdBy, setCreatedBy] = useState('');

//   const recipeUpdate = (event) => {
//     event.preventDefault();
//     props.updateOff();
//     setOpen(false);
//   };

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSubmit = () => {
//     console.log(recipeName);
//     console.log(catagory);
//     console.log(directions);
//     console.log(cookTime);
//     console.log(servings);
//     console.log(createdBy);
//   };

//   const body = (
//     <div style={modalStyle} className={classes.paper}>
//       <form
//         onSubmit={handleSubmit}
//         className={classes.root}
//         noValidate
//         autoComplete="off"
//       >
//         <h2> Form: Edit Recipe </h2>
//         <TextField
//           id="name"
//           label="Recipe Name"
//           name="Recipe Name"
//           value={recipeName}
//           onChange={(e) => setRecipeName(e.target.value)}
//         />
//         <br />
//         <TextField
//           id="catagory"
//           label="Catagory"
//           name="catagory"
//           value={catagory}
//           onChange={(e) => setCatagory(e.target.value)}
//         />
//         <br />
//         <br />
//         <TextareaAutosize
//           aria-label="minimum height"
//           rowsMin={4}
//           placeholder="Directions"
//           value={directions}
//           onChange={(e) => setDirections(e.target.value)}
//         />
//         <TextField
//           id="time"
//           label="Cook Time"
//           value={cookTime}
//           onChange={(e) => setCookTime(e.target.value)}
//         />
//         <TextField
//           id="serves"
//           label="Servings"
//           value={servings}
//           onChange={(e) => setServings(e.target.value)}
//         />
//         <TextField
//           id="creator"
//           label="Created by"
//           value={createdBy}
//           onChange={(e) => setCreatedBy(e.target.value)}
//         />
//       </form>
//       <br />
//       <Button type="submit" onClick={recipeUpdate} variant="contained">
//         Submit
//       </Button>
//     </div>
//   );

//   return (
//     <div>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="simple-modal-title"
//         aria-describedby="simple-modal-description"
//       >
//         {body}
//       </Modal>
//     </div>
//   );
// };

// export default RecipeEdit;

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	TextField,
	MenuItem,
	TextareaAutosize,
	CssBaseline,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
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
	const [ingredient, setIngredient] = useState('');
	const [ingredients, setIngredients] = useState([]);
	const [directions, setDirections] = useState('');
	const [cookTime, setCookTime] = useState(0);
	const [servings, setServings] = useState(0);

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch('http://localhost:3000/recipe/create', {
			method: 'POST',
			body: JSON.stringify({
				recipe: {
					recipe_name: recipeName,
					category: category,
					ingredients: ingredients,
					directions: directions,
					cook_time: cookTime,
					servings: servings,
				},
			}),
			headers: new Headers({
				'Content-Type': 'application/json',
				Authorization: props.token,
			}),
		})
			.then((res) => res.json())
			.then((logData) => {
				console.log(logData);
				setRecipeName('');
				setCategory('');
				setIngredient('');
				setIngredients([]);
				setDirections('');
				setCookTime(0);
				setServings(0);
				props.fetchRecipes();
			});
	};

	const handleClick = () => {
		setIngredients((ingredients) => [...ingredients, ingredient]);
		setIngredient('');
		console.log(ingredients);
	};

	const updateIngredient = ({ target }) => {
		setIngredient(target.value);
	};

	const keyPressed = ({ key }) => {
		if (key === 'Enter') {
			handleClick();
		}
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component='h2' variant='h5'>
					Create Recipe
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid conatainer spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								type='text'
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
								helperText='Seperate ingredients with a ,'
								autoFocus
								value={ingredient}
								onChange={updateIngredient}
								onKeyPress={keyPressed}
							/>
						</Grid>
						<br />
						<Grid item xs={12}>
							<TextareaAutosize
								rowsMin={4}
								rowsMax={8}
								variant='outlined'
								required
								fullWidth
								type='text'
								id='directions'
								placeholder='Directions'
								autoFocus
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
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}
						>
							Create
						</Button>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default RecipeCreate;
