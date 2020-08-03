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


class App extends React.Component{

  /*trying to pass info from parent to chill using props of info*/
  constructor(props) {
    super(props);
    this.state = {
      title: 'Tony Mak',
      headerLinks: [
        { title: 'Home', path: '/' },
        { title: 'About', path: '/about' },
        { title: 'Contact', path: '/contact' }
      ],
      home: {
        title: 'Hi, my name is',
        subTitle: 'Tony Mak',
        text: 'a college senior at University of Central Florida.'
      },
      about: {
        title: 'About Me'
      },
      contact: {
        title: 'Let\'s Talk'
      }
    }
  }


  render() {
    return (
    <Router>
      <Container className="p-0" fluid={true}>
        <Navbar bg="light" expand="lg" className="border-bottom">
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
        
      {/* we are calling from the constructor using state and props */}
     <Route path="/" exact render={() => <HomePage title={this.state.home.title} subTitle={this.state.home.subTitle} text={this.state.home.text} />} /> 
     <Route path="/about" render={() => <AboutPage title={this.state.about.title} />} />
     <Route path="/contact" render={() => <ContactPage title={this.state.contact.title} />} />
        
        <Footer/>
      </Container>

    </Router>

  );
  }
}

export default App;
