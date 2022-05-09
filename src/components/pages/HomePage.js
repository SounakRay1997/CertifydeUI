import React from 'react'
import { useState, useEffect, useLayoutEffect} from 'react';
import { useAuthDispatch, logout, useAuthState } from '../../context'
//import styles from './dashboard.module.css'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CourseDetails from '../CourseDetailsComponent';

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
    const [name, setName] = useState('');
    console.log(email)
    const [searchedCourses, setSearchedCourses] = useState([]);

    useLayoutEffect(() => {

      fetch('https://4dnsufx1d2.execute-api.us-east-1.amazonaws.com/test/user?email='+email, {
          method: 'GET', 
          headers:{
            Accept: 'application/json',
          }
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            var body = json['body']
            var name1=JSON.parse(body)['full_name']
            console.log(name1)
            setName(name1)
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },[]);

    const [searchVal, setSearch] = useState('');

    // https://search-course-details-zkv6rm6mcpx6ifdavir5l5bcb4.us-east-1.es.amazonaws.com
    const handleCourseSearch = event => {
        event.preventDefault();
        fetch('https://4dnsufx1d2.execute-api.us-east-1.amazonaws.com/test/search-course/'+searchVal, {
              method: 'GET', 
              headers:{
                Accept: 'application/json',
              }
            })
        .then(response => response.json())
        .then(json => {
            var body = json['body']
            var courses=JSON.parse(body)
            console.log(courses)
            setSearchedCourses(courses)
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
    console.log(searchedCourses)

    return (
        <><ButtonAppBar />
        <div className="text-center m-5-auto">
        <Row>
        <Col><div className="welcome_header">Welcome {name}</div></Col>
        <Col><form className='d-flex' onSubmit={handleCourseSearch}>
                <label id="search_label">Search Courses:</label>
                <input type="text" id="search" name="text" value={searchVal} onChange={event => setSearch(event.target.value)} required />
                <button id="sub_btn_search" type="submit">Search</button>
            </form>
        </Col>
        </Row>

        <CourseDetails courses={searchedCourses} />
        </div></>
    )
}
 
export default HomePage
