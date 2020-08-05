import React, { useState } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Me from '../me.jpg';




const Hero = () => {

    const [home, setHome] = useState({
        title: 'Hey, I\'m',
        subTitle: 'Tony Mak',
        text: 'aspiring Front-End Engineer based in Austin, Tx'
    })

    return (
        <Jumbotron className="bg-transparent" >
            <Container fluid={true}>
                <Row className="justify-content-center py=5">
                    <Col md={8} >
                        <img className="img fade-in" src={Me} />
                        {home && <div className="lead font-weight-light text-muted fade-in ">{home.title}</div>}
                        {home && <div className="display-1 fade-in">{home.subTitle}</div>}
                        <Row>
                            <Col className="center-150">{home && <div className="text-dark fade-in delayed">{home.text}</div>}</Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    );
};

export default Hero;