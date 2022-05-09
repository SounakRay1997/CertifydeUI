import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Select from 'react-dropdown-select';
import UserPool from '../../UserPool';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';


// import it from db later
const areas = [
               {label: "Software Engineering", value: "Software Engineering"}, 
               {label: "Machine Learning & Data Science", value: "Machine Learning & Data Science"}, 
               {label: "Business Analytics", value: "Business Analytics"}, 
               {label: "Health", value: "Health"}, 
               {label: "Social Sciences", value: "Social Sciences"}, 
               {label: "Personal Development", value: "Personal Development"}, 
               {label: "Arts & Humanities", value: "Arts & Humanities"}, 
               {label: "Physical Science and Engineering", value: "Physical Science and Engineering"}, 
               {label: "Language Learning", value: "Language Learning"}, 
               {label: "Math & Logic", value: "Math & Logic"}
            ];





const account_types = [
               {label: "Candidate", value: "Candidate"}, 
               {label: "Recruiter", value: "Recruiter"}
];

// const values = ['Software Engineering', 'Machine Learning & Data Science', 'Business Analytics', 'Health', 'Social Sciences', 'Personal Development', 'Arts & Humanities', 'Physical Science and Engineering', 'Language Learning', 'Math & Logic'];

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

  


  
export default function SignUpPage() {
    const textInput = React.useRef();
    const textInput1 = React.useRef();
    const textInput2 = React.useRef();

    const [courses,setListOfCourses] = useState( [
                                                    {label : 'Foundation Data, Data, Everywhere - Coursera',  value : 'Foundation Data, Data, Everywhere - Coursera'},
                                                    {label : 'Data Engineer Nanodegree - Udacity', value : 'Data Engineer Nanodegree - Udacity'},
                                                    {label : 'Learn Python: The Complete Python Programming Course - Udemy', value : 'Learn Python: The Complete Python Programming Course - Udemy'}
                                                ]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [preferences, setPreferences] = useState('');
    const [courses_completed, setCourses] = useState('');
    const [group, setGroup] = useState('');

    useEffect(() => {

      fetch('https://4dnsufx1d2.execute-api.us-east-1.amazonaws.com/test/courses', {
        //mode:{mode:"no-cors"},
          method: 'GET', // or 'PUT'
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
            //setCourses(user_list)
            //console.log('parsed json', json['body']) // access json.body here
            setListOfCourses(user_list)
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  },[]);

    const attributes =[
        new CognitoUserAttribute({Name: 'name', Value: name}),
        new CognitoUserAttribute({Name: 'email', Value: email}),
        new CognitoUserAttribute({Name: 'custom:preferences', Value: JSON.stringify(preferences)}),
        new CognitoUserAttribute({Name: 'custom:courses_completed', Value: JSON.stringify(courses_completed)}),
        new CognitoUserAttribute({Name: 'custom:group', Value: JSON.stringify(group)})
    ];

    const onSubmit = event => {
        event.preventDefault();
        console.log(name,' ',email,' ',password)
        console.log(attributes)
        UserPool.signUp(email, password, attributes, null, (err, data) => {
          if (err){
            alert("Error! Please try again and make sure you don't have an account already.")
          }
          else {
            alert("Registration Successful! Please confirm your email to login.")
            window.location.href = "/login";
          }
        });
    };
    
    useEffect(() =>{
      console.log(courses_completed)
    },[courses_completed])

    return (
        <><ButtonAppBar /><div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form onSubmit={onSubmit}>
                <p>
                    <label>Type of Account</label><br />
                    <Select
                        className='multi-select-class'
                        options={account_types}
                        values={[]}
                        onChange={(values) => setGroup(values)}
                        clearable={true}
                    />
                </p>
                <p>
                    <label>Full Name</label><br />
                    <input ref={textInput} type="text" name="name" value={name} onChange={event => setName(event.target.value)} required />
                </p>
                <p>
                    <label>Email address</label><br />
                    <input ref={textInput1} type="email" name="email" value={email} onChange={event => setEmail(event.target.value)} required />
                </p>
                <p>
                    <label>Password</label><br />
                    <input ref={textInput2} type="password" name="password" value={password} onChange={event => setPassword(event.target.value)} required />
                </p>
                <p>
                    <label>Areas of Preference</label><br />
                    <Select
                        className='multi-select-class'
                        multi
                        options={areas}
                        values={[]}
                        onChange={(values) => setPreferences(values)}
                        clearable={true}
                    />
                </p>
                <p>
                    <label>Courses Completed</label><br />
                    <Select
                        className='multi-select-class'
                        multi
                        options={courses}
                        values={[]}
                        onChange={(values) => setCourses(values)}
                        clearable={true}
                    />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Register</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link></p>
            </footer>
        </div></>
    )

}

