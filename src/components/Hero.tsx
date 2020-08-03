import React, { useState } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




const Hero = () => {

    const [home, setHome] = useState({
        title: 'Hi, my name is',
        subTitle: 'Tony Mak',
        text: 'a college senior at University of Central Florida.'
    })

    return (
        <Jumbotron className="bg-transparent" >
            <Container fluid={true}>
                <Row className="justify-content-center py=5">
                    <Col md={8}>
                        {home && <div className="lead font-weight-light text-muted ">{home.title}</div>}
                        {home && <div className="display-1">{home.subTitle}</div>}
                        <Row>
                            <Col className="center-150">{home && <div className="text-dark">{home.text}</div>}</Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    );
};

export default Hero;