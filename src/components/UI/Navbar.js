import { React, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SingleRecipe from '../Recipes/SingleRecipe';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Modal,
  Button,
} from '@material-ui/core';
import { spacing } from '@material-ui/system';
import Auth from '../auth/Auth';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import RecipeIndex from '../../user/RecipeIndex';
import AllRecipes from '../Recipes/Allrecipes';

export default function NavBar(props) {
  function Home() {
    return (
      <>
        <Typography variant="h2" color="textPrimary">
          All Recipes
          <AllRecipes />
        </Typography>
        <Link to="/singlerecipe">Single Recipe</Link>
      </>
    );
  }

  function MyRecipes() {
    return props.token ? <RecipeIndex token={props.token} /> : <>My Recipes</>;
  }

  function SingleRecipePath() {
    return <SingleRecipe recipeID={1} />;
  }
  function AuthPath() {
    return <Auth token={props.sessionToken} updateToken={props.updateToken} />;
  }
  function ChefRecipes() {
    return <Typography variant="subtitle1">Chef Recipes</Typography>;
  }
  const protectedViews = () => {
    return props.sessionToken === localStorage.getItem('token') ? (
      <RecipeIndex token={props.token} />
    ) : (
      <Auth token={props.sessionToken} updateToken={props.updateToken} />
    );
  };
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [buttonText, setButtonText] = useState('Login');
  const handleOpenLogin = () => {
    if (buttonText === 'Logout') {
      props.logout();
      setButtonText('Login');
      return null;
    }
    setOpenLogin(true);
    setButtonText('Login');
  };

  const handleOpenSignup = () => {
    setOpenSignup(true);
  };

  const handleClose = () => {
    setOpenLogin(false);
    setOpenSignup(false);
    setButtonText('Logout');
  };

  return (
    <Router>
      <AppBar position="sticky" style={{ width: '100vw' }}>
        <Box className="container">
          <Toolbar style={{ padding: '0' }}>
            <Box>
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                <Typography variant="h6">ClickNCook</Typography>
              </Link>
            </Box>
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              marginLeft={12}
            >
              <Box marginRight={4}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                  <Typography variant="subtitle1">Explore Recipes</Typography>
                </Link>
              </Box>
              <Box marginRight={4}>
                <Link
                  to="/myrecipes"
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  <Typography variant="subtitle1">My Recipes</Typography>
                </Link>
              </Box>
              <Box>
                <Link
                  to="/chefrecipes"
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  <Typography variant="subtitle1">Chef Recipes</Typography>
                </Link>
              </Box>
            </Box>
            <Box
              width="100%"
              display="flex"
              justifyContent="flex-end"
              marginLeft={12}
            >
              <Box justifySelf="right">
                <Button
                  type="button"
                  onClick={handleOpenLogin}
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  <Typography variant="subtitle1">{buttonText}</Typography>
                </Button>
                <Modal open={openLogin} onBackdropClick={handleClose}>
                  <Login token={props.token} updateToken={props.updateToken} />
                </Modal>
              </Box>
            </Box>
            <Box>
              <Box justifySelf="right">
                <Button
                  type="button"
                  onClick={handleOpenSignup}
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  <Typography variant="subtitle1">Signup</Typography>
                </Button>

                <Modal open={openSignup} onBackdropClick={handleClose}>
                  <Signup token={props.token} updateToken={props.updateToken} />
                </Modal>
              </Box>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>

      <Box className="container" marginTop={4} marginBottom={4}>
        <Switch>
          <Route path="/myrecipes">
            <MyRecipes />
          </Route>
          <Route path="/singlerecipe">
            <SingleRecipePath />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/chefrecipes">
            <ChefRecipes />
          </Route>
          <Route path="/auth">
            <AuthPath />
          </Route>
        </Switch>
      </Box>
    </Router>
  );
}
