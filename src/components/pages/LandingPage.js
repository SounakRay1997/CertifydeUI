import React from 'react'
import { Link } from 'react-router-dom'

import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
  

export default function LandingPage() {
    return (
        <><ButtonAppBar /><div className="App">
        <header className="App-header">
          <img src={process.env.PUBLIC_URL + '/certifyde_logo.png'} className="App-logo" alt="logo" />
          <p className="home-page-text">
            Welcome to Certifyde : The One Stop Solution for all your Certifications.
          </p>
          <p className="home-page-text">
            We verify certifications from all leading MOOCs.
          </p>
          <Container fluid="md">
            <Row>
              <Col><a href="https://www.coursera.org/" rel="noopener noreferrer" target="_blank"><img src={process.env.PUBLIC_URL + '/coursera.png'} className="mooc-logo" alt="logo" /></a></Col>
              <Col><a href="https://www.udacity.com/" rel="noopener noreferrer" target="_blank"><img src={process.env.PUBLIC_URL + '/udacity.jpeg'} className="mooc-logo" alt="logo" /></a></Col>
              <Col><a href="https://www.udemy.com/" rel="noopener noreferrer" target="_blank"><img src={process.env.PUBLIC_URL + '/udemy.png'} className="mooc-logo" alt="logo" /></a></Col>
            </Row>
          </Container>
        </header>
      </div></>
      );
    }
