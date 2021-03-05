import React from 'react';
import Signup from './Signup';
import Login from './Login';
import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';

const Auth = (props) => {
  return (
    <Container>
      <Grid>
        <Signup updateToken={props.updateToken} updateUser={props.updateUser} />
      </Grid>
      <Grid>
        <Login updateToken={props.updateToken} />
      </Grid>
    </Container>
  );
};

export default Auth;
