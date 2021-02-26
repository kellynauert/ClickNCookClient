import React, {useEffect, useState} from 'react';
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

function AllRecipes() {
            
    let [recipe, setRecipe] = useState([]);
            
        useEffect(() => {
            getAllRecipes();
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
            setRecipe(res.recipes);
            console.log(recipe)
        }); 
    }

    const recipeMapper = () => {
        return recipe.map((recipe, index) => {
          return (
            <Grid item md={4} key={index}>
              <Card key={index}>
                <Box display="flex">
                  <Box>Views {recipe.views}</Box>
                </Box>
                <CardHeader
                  title={recipe.recipe_name}
                  subheader={recipe.category}
                />
                <CardContent>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="h6"
                    component="h5"
                  >
                    Directions:
                    <br />
                    {recipe.directions}
                  </Typography>
                  <Typography>
                    Cook Time: {recipe.cook_time}
                    <br />
                    Serves: {recipe.servings}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            // <>
            // </>
          );
        });
      };

       return(
           <>
            {recipeMapper()}
           </>
    )
}


export default AllRecipes;