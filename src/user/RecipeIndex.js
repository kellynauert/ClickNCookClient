import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RecipeCard from './RecipeCard';
import RecipeEdit from './RecipeEdit';
import RecipeCreate from './RecipeCreate';

const useStyles = makeStyles({
  gridConatiner: {
    paddingLeft: '25px',
    paddingRight: '25px',
    paddingTop: '10px',
  },
  text: {
    textAlign: 'center',
  },
  btn: {
    marginTop: '10px',
    marginLeft: '15px',
  },
});

const ReceipeIndex = (props) => {
  const classes = useStyles();
  const [buttonText, setButtonText] = useState('Create Recipe');
  const [show, setShow] = useState(false);
  const [updateActive, setUpdateActive] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [recipeToUpdate, setRecipeToUpdate] = useState({});

  const fetchRecipes = () => {
    fetch('http://localhost:3000/recipe/user', {
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
      <Button
        className={classes.btn}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        {buttonText}
      </Button>
      {show ? (
        <RecipeCreate fetchRecipes={fetchRecipes} token={props.token} />
      ) : (
        <></>
      )}
      <Grid>
        <h1 className={classes.text}>My Recipes</h1>
      </Grid>
      <hr />
      <Grid
        container
        spacing={4}
        direction="row"
        justify="center"
        alignItems="flex-start"
        className={classes.gridConatiner}
      >
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

export default ReceipeIndex;
