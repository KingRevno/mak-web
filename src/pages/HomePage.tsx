import React from 'react';
import Hero from '../components/Hero';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AboutPage from '../components/AboutPage';
import Footer from '../components/Footer';



const HomePage = () => {

    return (
        <Container>
            <Row className="border-top justify-content-between">
                <Col>
                    <Hero />
                </Col>
            </Row>
            <Row>
                <Col>
                    <AboutPage />
                </Col>
            </Row>
            <Row>
                <Footer />
            </Row>
        </Container>
    )

}

export default HomePage;