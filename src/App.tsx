import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';



import './App.css';
import HomePage from './pages/HomePage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';





const App = () => {

  return (
    < Router >
      <Container className="p-0 background-color-div fill-window" fluid={true}>
        <Navbar bg="light" expand="sm" className="border-bottom">
          <Navbar.Brand>Tony Mak</Navbar.Brand>

          <Navbar.Toggle className="border=0" aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link eventKey={2} href="https://github.com/KingRevno">
                <FontAwesomeIcon icon={faGithub} />
              </Nav.Link>
              <Nav.Link eventKey={2} href="https://www.linkedin.com/in/maktony/">
                <FontAwesomeIcon icon={faLinkedin} />
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link eventKey={2} href="https://www.reddit.com/r/dankmemes/">
                Dank memes
                  </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route exact={true} path="/" component={HomePage} />
        </Switch>



      </Container>

    </Router >


  );

}

export default App;
