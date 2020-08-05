import React, { useState } from 'react';


import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AboutPage = () => {

    const [about, setAbout] = useState({
        title: 'About Me'
    })

    return (

        <Container>
            <Row>
                <Col xs={12} md={8}>  <div className="center">
                    <p>Tony Mak born in Belize, home to the Mayan culture. Made his way to the United States... to study the way of the code. I'm Tony Mak a upcoming senior graduate at University of Central Florida for Computer Engineering. I have classroom experience in Java, C, C#, and python,
                    but my goal is to become a full stack engineer. So I taught myself how to do web development, I have experience in React, JavaScript, Node JS, Firebase, HTML and CSS. This website
                    is still under improvements as I continue to learn more web development.
                </p>
                    <p>My dream is to one day start my own business and become an entrepreneur, it excites me to think about the future!</p>

                </div></Col>
                <Col xs={6} md={4}>
                    <div>Projects:
                    
                    </div>

                </Col>
            </Row>
        </Container>



    )


}

export default AboutPage;

