import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
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
  const [views, setViews] = useState(0);
  const [imgUrl, setImgUrl] = useState('');

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
      .then((logData) => {
        console.log(logData);
        setRecipeName('');
        setCategory('');
        setIngredient('');
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
    setIngredient(target.value);
    let result = ingredient.split(',');
    setIngredients(result);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h2" variant="h5">
          Create Recipe
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid conatainer spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="recipe-name"
                label="Recipe Name"
                autoFocus
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextField
                select
                variant="outlined"
                required
                fullWidth
                id="catecgory"
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="" disabled>
                  select
                </MenuItem>
                <MenuItem value="breakfast">Breakfast</MenuItem>
                <MenuItem value="lunch">Lunch</MenuItem>
                <MenuItem value="dinner">Dinner</MenuItem>
                <MenuItem value="dessert">Dessert</MenuItem>
              </TextField>
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="ingredients"
                label="Ingredients"
                helperText="Seperate ingredients with a , and after last ingredient"
                autoFocus
                value={ingredient}
                onChange={split}
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextareaAutosize
                rowsMin={5}
                rowsMax={10}
                variant="outlined"
                required
                fullWidth
                id="directions"
                placeholder="Directions*"
                value={directions}
                onChange={(e) => setDirections(e.target.value)}
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="number"
                id="cook-time"
                label="Cook Time"
                autoFocus
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="number"
                id="servings"
                label="Servings"
                autoFocus
                value={servings}
                onChange={(e) => setServings(e.target.value)}
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="image"
                label="Image URL"
                helperText="Enter URL of image"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
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
