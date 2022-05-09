import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
//import { connect } from 'react-redux';

import LandingPage from './components/pages/LandingPage'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import HomePage from './components/pages/HomePage'
import AddOngoingCourses from './components/pages/AddOngoingCourses'

import { AuthProvider } from "./context";

import './App.css'

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={ LandingPage } />
                        <Route path="/login" component={ LoginPage } />
                        <Route path="/register" component={ RegisterPage } />
                        <Route exact path="/home" component={ HomePage } />
                        <Route exact path="/add_ongoing_courses" component={ AddOngoingCourses } />
                        <Redirect from="*" to= "/" />
                    </Switch>
                </div>
            </Router>
        </AuthProvider>
    )
}


