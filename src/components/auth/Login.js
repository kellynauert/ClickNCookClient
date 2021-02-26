import React, { useState } from 'react';  
import { Button, TextField, Grid, Paper, Typography, Link} from '@material-ui/core';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');

    const handleSubmit=(event) => {
        event.preventDefault();
        fetch('http://localhost:3000/user/login', {
            method: 'POST',
            body: JSON.stringify({username: username, email: email, password:password}),
            headers: new Headers ({
                'Content-Type' : 'application/json'
            })
        }) .then ((response) => response.json())
        .then((data) => {
            props.updateToken(data.sessionToken);
        })
    }
    return ( 
       <div>
           <br/>
           <br/>
           <br/>
           
          <Grid container spacing={12} justify="center" direction="row">
<Grid item>
<Grid
container
direction="column"
justify="center"
spacing={2}
className="login-form"
>
<Paper
variant="elevation"
elevation={2}
className="login-background"
>
<Grid item>
<Typography component="h1" variant="h5">
Log In
</Typography>
</Grid>
<Grid item>
<form onSubmit={handleSubmit}>
<Grid container direction="column" spacing={2}>
<Grid item>
<TextField
type="username"
placeholder="Username"
fullWidth
name="username"
variant="outlined"
value={username}
onChange={(e) =>
setUsername(e.target.value)}
required
autoFocus
/>
</Grid>
<Grid item>
<TextField
type="email"
placeholder="Email"
fullWidth
name="email"
variant="outlined"
value={email}
onChange={(e) =>
setEmail(e.target.value)}
required
/>
</Grid>
<Grid item>
<TextField
type="password"
placeholder="Password"
fullWidth
name="password"
variant="outlined"
value={password}
onChange={(e) =>
setPassword(e.target.value)}
required
/>
</Grid>
<Grid item>
<Button
variant="contained"
color="black"
type="submit"
className="button-block"
>
Submit
</Button>
</Grid>
</Grid>
</form>
</Grid>
<Grid item>
<Link href="#" variant="body2">
Forgot Password?
</Link>
</Grid>
</Paper>
</Grid>
</Grid>
</Grid>
          
        </div>
        
     );
}

 
export default Login;