import React from 'react'
import { useState, useEffect, useLayoutEffect} from 'react';
import { useAuthDispatch, logout, useAuthState } from '../../context'
//import styles from './dashboard.module.css'
import { Link } from 'react-router-dom'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Row from 'react-bootstrap/Row';
import Select from 'react-dropdown-select';

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
          <Link className="header-link" color="inherit" to="/home">
                <Button className="header-link" color="inherit">Home </Button>
            </Link>
          <LogoutButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
 
function CourseStatusUpdatePage(props) {
  //const dispatch = useAuthDispatch()  read dispatch method from context
  const userDetails = useAuthState() //read user details from context
  const email = userDetails.userDetails.email;
  const [name, setName] = useState('');
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

  const [courses,setListOfCourses] = useState( []);
  const [select_to_ongoing_courses, setSelectToOngoingCourses] = useState([]);
  const [select_to_completed_courses, setSelectToCompletedCourses] = useState([]);

  useEffect(() => {
    fetch('https://4dnsufx1d2.execute-api.us-east-1.amazonaws.com/test/courses', {
        method: 'GET', 
        headers:{
          Accept: 'application/json',
        }
      })
      .then(response => response.json())
      .then(json => {
          var user_list = []
          var data_1 = json['body']
          console.log(data_1)
          for (let i=0;i<data_1.length;i++){
              user_list.push({'label':data_1[i].title,'value':data_1[i].id})
          }
          setListOfCourses(user_list)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  },[]);

  const onSubmitToOngoing = event => {
    event.preventDefault();
    console.log(select_to_ongoing_courses)
    for (var c in select_to_ongoing_courses){
      fetch('https://4dnsufx1d2.execute-api.us-east-1.amazonaws.com/test/course/'+select_to_ongoing_courses[c]+'/'+email+'/ongoing', {
        method: 'POST', 
        headers:{
          Accept: 'application/json',
        }
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
      })
      .catch((error) => {
        console.error('Error:', error);
      });  
    }
    alert("Course Status has been updated!")
    window.location.reload()
  };

  const onSubmitToCompleted = event => {
    event.preventDefault();
    console.log(select_to_completed_courses)
    for (var c in select_to_completed_courses){
      fetch('https://4dnsufx1d2.execute-api.us-east-1.amazonaws.com/test/course/'+select_to_completed_courses[c]+'/'+email+'/completed', {
        method: 'POST', 
        headers:{
          Accept: 'application/json',
        }
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
    alert("Course Status has been updated!")
    window.location.reload()
  };

  return (
    <><ButtonAppBar />
    <div className="text-center m-5-auto">
      <div className="welcome_header">
        Welcome {name}
      </div>
      <div className="modify_courses_row">
      <Row>
         <form onSubmit={onSubmitToOngoing}> 
          <label>Courses Added to Ongoing:</label><br/>
          <Select
            className='multi-select-class'
            multi
            options={courses}
            values={[]}
            onChange={(e) => {setSelectToOngoingCourses(Array.isArray(e) ? e.map(x => x.value) : [])}}
            clearable={true}
          />
          <br/>
          <button id="sub_btn_search" type="submit">Add to Ongoing</button>
        </form>
        </Row>
        </div>
        <div className="modify_courses_row">
        <Row> <form onSubmit={onSubmitToCompleted}> 
          <label>Courses Added to Completed:</label><br />
          <Select
            className='multi-select-class'
            multi
            options={courses}
            values={[]}
            onChange={(e) => {setSelectToCompletedCourses(Array.isArray(e) ? e.map(x => x.value) : [])}}
            clearable={true}
          />
          <br/>
          <button id="sub_btn_search" type="submit">Add to Completed</button>
        </form>
      </Row>
      </div>
    </div></>
  )
}
 
export default CourseStatusUpdatePage
