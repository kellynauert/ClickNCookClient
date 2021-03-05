import React from 'react'; 
import Login from './Login';
import Signup from './Signup';
import {Grid} from '@material-ui/core'

const Auth = (props) => {
    
    return ( 
        <Grid container spacing={12} justify= 'center' direction="row">
            <Grid item direction= "column" xs={4}>
            <Signup updateToken = {props.updateToken} setIsLoggedIn={props.setIsLoggedIn}/>
            </Grid>
            <Grid item direction = "column" xs= {4}>
            <Login updateToken= {props.updateToken} setIsLoggedIn={props.setIsLoggedIn}/>
            </Grid>
            </Grid>
     );
}
 
export default Auth;