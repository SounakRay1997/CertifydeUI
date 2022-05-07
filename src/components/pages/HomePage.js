import React from 'react'
import { useAuthDispatch, logout, useAuthState } from '../../context'
//import styles from './dashboard.module.css'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function ButtonAppBar() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <a className="header-link" href="/home" color="inherit">CERTIFYDE</a>
            </Typography>
            <Link className="header-link" color="inherit" to="/login">
                <Button className="header-link" color="inherit" id="logout_button">Logout</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
 
function HomePage(props) {
    const dispatch = useAuthDispatch() // read dispatch method from context
    const userDetails = useAuthState() //read user details from context
    const email = userDetails.userDetails.email;
    console.log(email)
 
    // const handleLogout = () => {
       
    // }
    React.useEffect(() => {
      var element = document.getElementById("logout_button")
      element.addEventListener("onClick", (event) => {
        logout(dispatch) //call the logout action
        
        props.history.push('/login') //navigate to logout page on logout
      })
    }, []);
    return (
        <><ButtonAppBar /><div className="text-center m-5-auto">
            <h2>Welcome {userDetails.userDetails.email}</h2>
        </div></>
    )
}
 
export default HomePage