import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Multiselect from 'multiselect-react-dropdown';
import UserPool from '../../UserPool';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

// import it from db later
const courses = ['Foundation Data, Data, Everywhere - Coursera', 'Data Engineer Nanodegree - Udacity', 'Learn Python: The Complete Python Programming Course - Udemy']

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

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [preferences, setPreferences] = useState('');
    const [courses_completed, setCoursesCompleted] = useState('');

    const attributes =[
        new CognitoUserAttribute({Name: 'name', Value: name}),
        new CognitoUserAttribute({Name: 'email', Value: email}),
        new CognitoUserAttribute({Name: 'custom:preferences', Value: preferences}),
        new CognitoUserAttribute({Name: 'custom:courses_completed', Value: courses_completed}),
    ];


    const onSubmit = event => {
        console.log(preferences)
        event.preventDefault();
        
        UserPool.signUp(email, password, attributes, null, (err, data) => {
          if (err) console.error(err);
          console.log(data);
        });
    };
    

    return (
        <><ButtonAppBar /><div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form onSubmit={onSubmit}>
                <p>
                    <label>Full Name</label><br />
                    <input type="text" name="name" value={name} onChange={event => setName(event.target.value)} required />
                </p>
                <p>
                    <label>Email address</label><br />
                    <input type="email" name="email" value={email} onChange={event => setEmail(event.target.value)} required />
                </p>
                <p>
                    <label>Password</label><br />
                    <input type="password" name="password" value={password} onChange={event => setPassword(event.target.value)} requiredc />
                </p>
                <p>
                    <label>Areas of Preference</label><br />
                    <Multiselect
                        className='multi_select'
                        isObject={false}
                        caseSensitiveSearch
                        onKeyPressFn={function noRefCheck(){}}
                        onRemove={function noRefCheck(){}}
                        onSearch={function noRefCheck(){}}
                        onSelect={function noRefCheck(){}}
                        onChange={event => setPreferences(event.target.value)}
                        options={[
                            'Software Engineering',
                            'Machine Learning & Data Science',
                            'Business Analytics',
                            'Health',
                            'Social Sciences',
                            'Personal Development',
                            'Arts & Humanities',
                            'Physical Science and Engineering',
                            'Language Learning',
                            'Math & Logic'
                        ]}
                        placeholder=""
                        style={{
                            chips: {
                                background: 'blue'
                            },
                            multiselectContainer: {
                                color: 'black'
                            },
                            searchBox: {
                                'background': 'white',
                                'width': '30rem',
                                'padding': '.3rem',
                                'border-radius': '5px',
                                'outline': 'none',
                                'border': 'none'
                            }
                        }}
                    />
                </p>
                <p>
                    <label>Courses Completed</label><br />
                    <Multiselect
                        className='multi_select'
                        isObject={false}
                        caseSensitiveSearch
                        onKeyPressFn={function noRefCheck(){}}
                        onRemove={function noRefCheck(){}}
                        onSearch={function noRefCheck(){}}
                        onSelect={function noRefCheck(){}}
                        onChange={event => setCoursesCompleted(event.target.value)}
                        options={courses}
                        placeholder=""
                        style={{
                            chips: {
                                background: 'blue'
                            },
                            multiselectContainer: {
                                color: 'black'
                            },
                            searchBox: {
                                'background': 'white',
                                'width': '30rem',
                                'padding': '.3rem',
                                'border-radius': '5px',
                                'outline': 'none',
                                'border': 'none'
                            }
                        }}
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
