import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';



import './App.css';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';


const App = () => {

  return (

    < Router >
      <Container className="p-0" fluid={true}>
        <Navbar bg="light" expand="sm" className="border-bottom">
          <Navbar.Brand>Tony Mak</Navbar.Brand>

          <Navbar.Toggle className="border=0" aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/about">About</Link>
              <Link className="nav-link" to="/contact">Contact</Link>
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
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
        </Switch>

        <Footer />

      </Container>

    </Router >


  );

}

export default App;
