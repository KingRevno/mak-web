import React from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Hero(props){

    return(
    <Jumbotron fluid className="bg-transparent" >
        <Container fluid={true}>
            <Row className="justify-content-center py=5">
                <Col md={8}>
                    {/* obtaining data from props in app.js */}
                    {props.title && <div className="lead font-weight-light text-muted ">{props.title}</div>}
                    {props.title && <div className="display-1">{props.subTitle}</div>}
                    <Row>
                        <Col className="center-150">{props.title && <div className="text-dark">{props.text}</div>}</Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    </Jumbotron>
    );
};

export default Hero;