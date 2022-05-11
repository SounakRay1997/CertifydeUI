import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
//import { connect } from 'react-redux';

import LandingPage from './components/pages/LandingPage'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import HomePage from './components/pages/HomePage'
import CourseStatusUpdatePage from './components/pages/CourseStatusUpdatePage'

import { AuthProvider } from "./context";

import './App.css'


export default function App() {

    useEffect(() => { document.body.style.backgroundColor = 'lightblue' }, [])
    
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={ LandingPage } />
                        <Route path="/login" component={ LoginPage } />
                        <Route path="/register" component={ RegisterPage } />
                        <Route exact path="/home" component={ HomePage } />
                        <Route exact path="/course_update_status" component={ CourseStatusUpdatePage } />
                        <Redirect from="*" to= "/" />
                    </Switch>
                </div>
            </Router>
        </AuthProvider>
    )
}


