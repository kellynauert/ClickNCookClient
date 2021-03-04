import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    backgroundColor: 'lightgray',
    marginBottom: '5px',
  },
  text: {
    textAlign: 'center',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  btn: {
    width: '30%',
    marginLeft: '38px',
  },
  position: {
    margin: '15px 20px',
  },
}));

const RecipeCard = (props) => {
  const classes = useStyles();

  const deleteRecipe = (recipe) => {
    fetch(`http://localhost:3000/recipe/delete/${recipe.id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: props.token,
      }),
    }).then(() => props.fetchRecipes());
  };

  const recipeMapper = () => {
    return props.recipes.map((recipe, index) => {
      return (
        <Grid item md={4} key={index}>
          <Card className={classes.root} key={index}>
            <Box display="flex">
              <Box className={classes.position}>Views {recipe.views}</Box>
            </Box>
            <img src={recipe.photo_url} alt="" />
            <CardHeader
              title={recipe.recipe_name}
              subheader={recipe.category}
              className={classes.text}
            />
            <CardContent>
              <Typography
                className={(classes.title, classes.text)}
                color="textSecondary"
                gutterBottom
                variant="h6"
                component="h5"
              >
                Directions:
                <br />
                {recipe.directions}
              </Typography>
              <Typography className={classes.text}>
                Cook Time: {recipe.cook_time}
                <br />
                Serves: {recipe.servings}
              </Typography>
            </CardContent>
            <Button
              className={classes.btn}
              color="primary"
              variant="outlined"
              onClick={() => {
                props.editUpdateRecipe(recipe);
                props.updateOn();
              }}
            >
              Edit
            </Button>

            <Button
              className={classes.btn}
              color="secondary"
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => {
                deleteRecipe(recipe);
              }}
            >
              Delete
            </Button>
          </Card>
        </Grid>
      );
    });
  };

  return <div>{recipeMapper()}</div>;
};

export default RecipeCard;
