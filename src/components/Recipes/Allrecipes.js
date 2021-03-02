import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Grid,
  MenuItem,
  makeStyles,
  TextField,
} from '@material-ui/core/';

const useStyles = makeStyles({
  filter: {
    width: '190px',
  },
});

function AllRecipes() {
  const classes = useStyles();
  let [recipe, setRecipe] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    getAllRecipes();
    console.log(recipe);
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
        return (
          <Grid item md={4} key={index}>
            <Card key={index}>
              <CardHeader
                title={recipe.recipe_name}
                subheader={recipe.category}
              />
              <CardContent>
                <Typography variant="subtitle2">
                  Views {recipe.views}
                </Typography>
                <Typography>
                  Cook Time: {recipe.cook_time}
                  <br />
                  Serves: {recipe.servings}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      });
  };

  return (
    <div>
      <Grid item xs={12}>
        <TextField
          className={classes.filter}
          select
          variant="outlined"
          id="catecgory"
          label="Recipes by Category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <MenuItem value="">All Recipes</MenuItem>
          <MenuItem value="breakfast">Breakfast</MenuItem>
          <MenuItem value="lunch">Lunch</MenuItem>
          <MenuItem value="dinner">Dinner</MenuItem>
          <MenuItem value="dessert">Dessert</MenuItem>
        </TextField>
      </Grid>
      {RecipeMapper()}
    </div>
  );
}

export default AllRecipes;
