import React from 'react';
import Hero from '../components/Hero';
import Cards from '../components/Cards'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AccordCard from '../components/AccordCard';



const HomePage = () => {

    return (
        <div>
            <Hero />
            <Container>
                <Row>
                    <Col>
                        <AccordCard />
                    </Col>
                </Row>
            </Container>

        </div>

    )

}

export default HomePage;