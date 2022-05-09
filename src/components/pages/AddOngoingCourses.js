import React from 'react'
import { useState } from 'react';
import { useAuthDispatch, logout, useAuthState } from '../../context'
//import styles from './dashboard.module.css'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../../App.css'

const LogoutButton = () => {
    const dispatch = useAuthDispatch()
    const handleLogout = () => {
        logout(dispatch) 
        window.location.href = "/login";
    }
    return <Button className="header-link" color="inherit" onClick={handleLogout}>Logout</Button>;
  }

function ButtonAppBar() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <a className="header-link" href="/home" color="inherit">CERTIFYDE</a>
            </Typography>
            <LogoutButton />
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
 
function HomePage(props) {
    //const dispatch = useAuthDispatch()  read dispatch method from context
    const userDetails = useAuthState() //read user details from context
    const email = userDetails.userDetails.email;
    console.log(email)

    const [searchVal, setSearch] = useState('');

    const handleCourseSearch = event => {
        event.preventDefault();
        console.log()
    }

    return (
        <><ButtonAppBar />
        <div className="text-center m-5-auto">
        <Row>
        <Col><div class="welcome_header">Welcome {userDetails.userDetails.email}</div></Col>
        <Col><form className='d-flex' onSubmit={handleCourseSearch}>
                <label id="search_label">Search Courses:</label>
                <input type="text" id="search" name="text" value={searchVal} onChange={event => setSearch(event.target.value)} required />
                <button id="sub_btn_search" type="submit">Search</button>
            </form>
        </Col>
        </Row>
        </div></>
    )
}
 
export default HomePage
