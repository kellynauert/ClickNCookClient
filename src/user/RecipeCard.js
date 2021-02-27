import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  btn: {
    width: '30%',
  },
  position: {
    margin: '15px 20px',
  },
}));

const RecipeCard = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
            <CardActions>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Button
                className={classes.btn}
                color="primary"
                variant="contained"
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
                variant="contained"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  deleteRecipe(recipe);
                }}
              >
                Delete
              </Button>
            </Collapse>
          </Card>
        </Grid>
      );
    });
  };

  return <div>{recipeMapper()}</div>;
};

export default RecipeCard;
