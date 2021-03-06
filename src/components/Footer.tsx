import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => {

    return (
        <footer className="mt-5 footer">
            <Container className="footer-container" fluid={true}>
                <Row className="border-top justify-content-between p=3">
                    <Col className="p=0" md={3} sm={12} >
                        Tony Mak
                </Col>
                    <Col className="p=0 d-flex justify-content-end" md={3}>
                        <div>&copy;{new Date().getFullYear()} Tony Mak </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
export default Footer;
