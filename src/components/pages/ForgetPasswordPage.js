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

export default function ForgetPasswordPage() {
    return (
        <><ButtonAppBar /><div className="text-center m-5-auto">
            <h2>Reset your password</h2>
            <h5>Enter your email address and we will send you a new password</h5>
            <form action="/login">
                <p>
                    <label id="reset_pass_lbl">Email address</label><br />
                    <input type="email" name="email" required />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Send password reset email</button>
                </p>
            </form>
            <footer>
                <p>First time?<Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div></>
    )
}
