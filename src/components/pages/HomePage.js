import React from 'react'
import { Link } from 'react-router-dom'

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
              <a className="header-link" href="/home" color="inherit">CERTIFYDE</a>
            </Typography>
            <Link className="header-link" color="inherit" to="/">
                <Button className="header-link" color="inherit">Logout</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }


export default function HomePage() {
    return (
        <><ButtonAppBar /><div className="text-center">
            <h1 className="main-title home-page-title">Hello!</h1>
        </div></>
    )
}
