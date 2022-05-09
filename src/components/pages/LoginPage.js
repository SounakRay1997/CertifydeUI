import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { AuthenticationDetails } from 'amazon-cognito-identity-js';
// import { CognitoUser } from 'amazon-cognito-identity-js';
import { loginUser,  useAuthDispatch } from '../../context' 

import '../../App.css'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import UserPool from '../../UserPool';

function ButtonAppBar() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <a className="header-link" href="/" color="inherit">CERTIFYDE</a>
            </Typography>
            <Link className="header-link" color="inherit" to="/login">
                <Button className="header-link" color="inherit">Login</Button>
            </Link>
            <Link className="header-link" color="inherit" to="/register">
                <Button className="header-link" color="inherit">Sign up</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }

export default function LoginPage(props) {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const authenticationData = {
    //   Username: email,
    //   Password: password,
    // };
    
    // console.log(authenticationData)

    // const authenticationDetails = new AuthenticationDetails(authenticationData)

    // const userData = {
    //   Username: email,
    //   Pool: UserPool,
    // };
    
    const dispatch = useAuthDispatch()
    //const { loading, errorMessage } = useAuthState()

    // const cognitoUser = new CognitoUser(userData);
  
    // const onSubmit = event => {
    //     event.preventDefault();
    //     cognitoUser.authenticateUser(authenticationDetails, {
    //       onSuccess: function(result) {
    //         console.log(result)
    //         var accessToken = result.getAccessToken().getJwtToken();
    //         console.log(accessToken)
    //         alert("Logged In!")
    //         window.location.href = "/home";
    //       },
    //       onFailure: function(err) {
    //         alert("Please check your email and password. Also make sure that your email address is confirmed!")
    //       }
    //     });
    // };

    const handleLogin = async (e) => {
      e.preventDefault()
      let payload = [email, password]
      try {
          let response = await loginUser(dispatch, payload) //loginUser action makes the request and handles all the neccessary state changes
          console.log(response)
          console.log(response.user.email)
          if (!response.user.email) {
            alert("Please check your email and password. Also make sure that your email address is confirmed!")
            return
          }
            props.history.push('/home') //navigate to dashboard on success
      } catch (error) {
          console.log(error)
      }
    }
    
    return (
        <><ButtonAppBar /><div className="text-center m-5-auto">
            <h2>Sign in to Certifyde</h2>
            <form className="multi_forms" onSubmit={handleLogin}>
                <p>
                    <label>Email address</label><br />
                    <input type="email" name="email" value={email} onChange={event => setEmail(event.target.value)} required />
                </p>
                <p>
                    <label>Password</label><br />
                    <input type="password" name="password" value={password} onChange={event => setPassword(event.target.value)} required />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>
            </form>
            <footer>
                <p>First time?<Link to="/register">Create an account</Link></p>
                <p><Link to="/">Back to Homepage</Link></p>
            </footer>
        </div></>
    )
}

