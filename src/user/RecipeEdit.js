import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TextField, TextareaAutosize, MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  paper: {
    position: 'absolute',
    width: 225,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  body: {
    margin: 'auto',
  },
}));

const RecipeEdit = (props) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(true);
  const [editRecipeName, setEditRecipeName] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editIngredient, setEditIngredient] = useState('');
  const [editIngredients, setEditIngredients] = useState([]);
  const [editDirections, setEditDirections] = useState('');
  const [editCookTime, setEditCookTime] = useState(0);
  const [editServings, setEditServings] = useState(0);

  const recipeUpdate = (e, recipe) => {
    e.preventDefault();
    fetch(`http://localhost:3000/recipe/${props.recipeToUpdate.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        recipe: {
          recipe_name: editRecipeName,
          category: editCategory,
          ingredients: editIngredients,
          directions: editDirections,
          servings: editServings,
          cook_time: editCookTime,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: props.token,
      }),
    }).then((res) => {
      props.fetchRecipes();
      props.updateOff();
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const split = ({ target }) => {
    setEditIngredient(target.value);
    let result = editIngredient.split(',');
    setEditIngredients(result);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form
        onSubmit={recipeUpdate}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <h2> Form: Edit Recipe </h2>
        <TextField
          type="text"
          id="name"
          label="Recipe Name"
          value={editRecipeName}
          onChange={(e) => setEditRecipeName(e.target.value)}
        />
        <br />
        <TextField
          id="category"
          select
          label="Category"
          value={editCategory}
          onChange={(e) => setEditCategory(e.target.value)}
        >
          <MenuItem value="" disabled>
            Select
          </MenuItem>
          <MenuItem value="breakfast">Breakfast</MenuItem>
          <MenuItem value="lunch">Lunch</MenuItem>
          <MenuItem value="dinner">Dinner</MenuItem>
          <MenuItem value="dessert">Dessert</MenuItem>
        </TextField>
        <br />
        <TextField
          id="ingredients"
          label="Ingredients"
          helperText="Seperate ingredients with a ,"
          value={editIngredient}
          onChange={split}
        />
        <br />
        <br />
        <TextareaAutosize
          aria-label="minimum height"
          rowsMin={4}
          placeholder="Directions"
          value={editDirections}
          onChange={(e) => setEditDirections(e.target.value)}
        />
        <TextField
          id="time"
          type="number"
          label="Cook Time"
          value={editCookTime}
          onChange={(e) => setEditCookTime(e.target.value)}
        />
        <TextField
          id="serves"
          type="number"
          label="Servings"
          value={editServings}
          onChange={(e) => setEditServings(e.target.value)}
        />
        <br />
        <Button type="submit" onClick={recipeUpdate} variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default RecipeEdit;
