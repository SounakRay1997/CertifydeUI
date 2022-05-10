import React from 'react'
import { useState, useLayoutEffect} from 'react';
import { useAuthDispatch, logout, useAuthState } from '../../context'
//import styles from './dashboard.module.css'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ExploreSection from "../common/exploreSection";
import { Link } from 'react-router-dom'

import '../../App.css'


const LogoutButton = () => {
    const dispatch = useAuthDispatch()
    const handleLogout = () => {
        logout(dispatch) 
        window.location.href = "/login";
    }
    return <Button className="header-link" color="inherit" onClick={handleLogout}>Logout</Button>;
  }

function ButtonAppBar(group) {
  if (group['group']==="Recruiter") {
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
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <a className="header-link" href="/home" color="inherit">CERTIFYDE</a>
            </Typography>
            <Link className="header-link" color="inherit" to="/course_update_status">
                <Button className="header-link" color="inherit">Update Course Status</Button>
            </Link>
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
    const [group, setGroup] = useState('');
    const [completed_courses, setListOfCompletedCourses] = useState([]);
    const [ongoing_courses, setListOfOngoingCourses] = useState([]);
    const [searchedCourses, setSearchedCourses] = useState([]);
    const [candidates_with_same_preferences, setCandidatesWithSamePreferences] = useState([])

    useLayoutEffect(() => {

      fetch('https://4dnsufx1d2.execute-api.us-east-1.amazonaws.com/test/user?email='+email, {
          method: 'GET', 
          headers:{
            Accept: 'application/json',
          }
        })
        .then(response => response.json())
        .then(json => {
            var body = json['body']
            setGroup(JSON.parse(body)['group'])
            var completed_courses_id = JSON.parse(body)['courses_completed']
            var ongoing_courses_id = JSON.parse(body)['ongoing_courses']
            setName(JSON.parse(body)['full_name'])
            var course_preferences_json = JSON.parse(body)['course_preferences']
            for (let i=0;i<completed_courses_id.length;i++){
              console.log(completed_courses_id[i])
              fetch('https://4dnsufx1d2.execute-api.us-east-1.amazonaws.com/test/course?courseid='+completed_courses_id[i], {
                method: 'GET', 
                headers:{
                  Accept: 'application/json',
                }
              })
              .then(response => response.json())
              .then(json => {
                var body = json['body']
                setListOfCompletedCourses((oldArray) => [...oldArray, JSON.parse(body)]);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
            }
            for (let i=0;i<ongoing_courses_id.length;i++){
              fetch('https://4dnsufx1d2.execute-api.us-east-1.amazonaws.com/test/course?courseid='+ongoing_courses_id[i], {
                method: 'GET', 
                headers:{
                  Accept: 'application/json',
                }
              })
              .then(response => response.json())
              .then(json => {
                var body = json['body']
                setListOfOngoingCourses((oldArray) => [...oldArray, JSON.parse(body)]);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
            }
            if (JSON.parse(body)['group']==='Recruiter') {
              for (let i=0;i<course_preferences_json.length;i++) {
                  fetch('https://4dnsufx1d2.execute-api.us-east-1.amazonaws.com/test/user/'+course_preferences_json[i], {
                      method: 'GET', 
                      headers:{
                        Accept: 'application/json',
                      }
                    })
                    .then(response => response.json())
                    .then(json => {
                        var body = json['body']
                        if (body){
                          setCandidatesWithSamePreferences((oldArray) => [...oldArray, [course_preferences_json[i], body]]);
                        }
                        else {
                          setCandidatesWithSamePreferences((oldArray) => [...oldArray, [course_preferences_json[i], []]]);
                        }
                      })
                    .catch((error) => {
                      console.error('Error:', error);
                      setCandidatesWithSamePreferences((oldArray) => [...oldArray, [course_preferences_json[i], []]]);
                    });
                }
            } 
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, [email]);

    const [searchVal, setSearch] = useState('');
    const [searchPressed, setPressed] = useState('');

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
            setPressed('1');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
    
    if (group==='Recruiter') {
      return (
        <><ButtonAppBar group={group}/>
        <div>
          <div className="text-center m-5-auto">
          <Row>
            <Col><div className="welcome_header">Welcome {name} ({group})</div></Col>
          </Row>
          <div className="max-width explore-section">
              {candidates_with_same_preferences.map((preference) => {
              return (<div>
                <Row>
                <h3 className="collection-title">{preference[0]}</h3>
                {preference[1].map((candidate) => {
                  return (
                  <div className="collection-title">
                    {candidate.full_name} {candidate.email_address}
                  </div>
                  )
                })}                  
                </Row>
                <br/><br/><br/> </div>
              )
              })}
          </div>
          </div>
        </div>
        </>
      )
    }

    if(searchPressed==='1'){
      return (
        <><ButtonAppBar />
        <div className="text-center m-5-auto">
        <Row>
        <Col><div className="welcome_header">Welcome {name} ({group})</div></Col>
        <Col><form className='d-flex' onSubmit={handleCourseSearch}>
                <label id="search_label">Search Courses:</label>
                <input type="text" id="search" name="text" value={searchVal} onChange={event => setSearch(event.target.value)} required />
                <button id="sub_btn_search" type="submit">Search</button>
            </form>
        </Col>
        </Row>

        <ExploreSection
            courses={searchedCourses}
            collectionName="Search Results"
          />
        </div></>
      )   
    }
    return (
        <><ButtonAppBar />
        <div>
          <div className="text-center m-5-auto">
          <Row>
            <Col><div className="welcome_header">Welcome {name} ({group})</div></Col>
            <Col id="search_form"> <form className='d-flex' onSubmit={handleCourseSearch}>
                  <label id="search_label">Search Courses:</label>
                  <input type="text" id="search" name="text" value={searchVal} onChange={event => setSearch(event.target.value)} required />
                  <button id="sub_btn_search" type="submit">Search</button>
                  </form>
            </Col>
          </Row>
          <ExploreSection
            courses={completed_courses}
            collectionName="Completed Courses"
          />  
          <ExploreSection
            courses={ongoing_courses}
            collectionName="Ongoing Courses"
          />
          <ExploreSection
            courses={ongoing_courses}
            collectionName="Recommended Courses"
          />    
          </div>
          </div>
          </>
    )
}
 
export default HomePage
