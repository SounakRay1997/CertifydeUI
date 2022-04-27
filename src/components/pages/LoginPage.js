import React from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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

export default function SignInPage() {
    return (
        <><ButtonAppBar /><div className="text-center m-5-auto">
            <h2>Sign in to Certifyde</h2>
            <form action="/home">
                <p>
                    <label>Email address</label><br />
                    <input type="text" name="first_name" required />
                </p>
                <p>
                    <label>Password</label>
                    <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                    <br />
                    <input type="password" name="password" required />
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
