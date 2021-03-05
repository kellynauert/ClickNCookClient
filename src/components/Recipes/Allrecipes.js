import React, { useEffect, useState } from 'react';
import {
	Typography,
	Box,
	Grid,
	MenuItem,
	makeStyles,
	TextField,
  Button,
} from '@material-ui/core/';
import RecipeCard from './Bits/RecipeCard';
import StarRateIcon from '@material-ui/icons/StarRate';
const useStyles = makeStyles({
	filter: {
		width: '190px',
	},
});



function AllRecipes() {
  const classes = useStyles();
  const [recipe, setRecipe] = useState([]);
  const [spicy, setSpicy] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');


  useEffect(() => {
    getAllRecipes();
    // console.log(recipe);
  }, []);

	function getAllRecipes() {
		fetch(`http://localhost:3000/recipe/`, {
			method: 'GET',
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				setRecipe(res);
				console.log(recipe);
			});
	}

	const RecipeMapper = () => {
		return recipe
			.filter(
				(recipe) => filterCategory === recipe.category || filterCategory === ''
			)
			.map((recipe, index) => {
				return <RecipeCard key={index} recipe={recipe} />;
			});
	};

  function compare(a, b) {
    // console.log(recipe)
  
    const recipeA = a.views
    const recipeB = b.views
  
    let comparison = 0
    if (recipeA > recipeB) {
        comparison = 1
      } else if (recipeA < recipeB) {
          comparison = -1
        }
        // console.log(comparison)
        return comparison * -1
      
      }
      
function sortByViews() {
// debugger
let RecipeObject = [...recipe];
let recipeSort = RecipeObject.sort(compare)
console.log(recipeSort)
setRecipe (recipeSort)
}

useEffect(() => {
if (spicy) {
  sortByViews();
}
}, [spicy]);

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
						All Recipes
					</Typography>
				</Box>
				<Box>
					<TextField
						className={classes.filter}
						select
						variant='outlined'
						id='category'
						label='Recipes by Category'
						value={filterCategory}
						onChange={(e) => setFilterCategory(e.target.value)}
					>
						<MenuItem value=''>All Recipes</MenuItem>
						<MenuItem value='Breakfast'>Breakfast</MenuItem>
						<MenuItem value='Lunch'>Lunch</MenuItem>
						<MenuItem value='Dinner'>Dinner</MenuItem>
						<MenuItem value='Dessert'>Dessert</MenuItem>
					</TextField>
				</Box>

        {/* ###  Sort By Views Button  ### */}
        <Button 
        variant="outlined"
        color="secondary"
        className={classes.button}
        startIcon={<StarRateIcon />}
        onClick={() => setSpicy(!spicy)}
        >Spicy Recipes
        </Button>

			</Box>
			<Grid container direction='row' spacing={2}>
				{RecipeMapper()}
			</Grid>
		</div>
	);
}

export default AllRecipes;
