import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Appbar from '@material-ui/core/Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

const Sitebar = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Appbar position="static">
        <Toolbar>
          <Button onClick={props.clearToken} variant="outlined">
            Logout
          </Button>
        </Toolbar>
      </Appbar>
    </div>
  );
};

export default Sitebar;
