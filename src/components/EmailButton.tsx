import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useForm } from "react-hook-form";



const EmailButton = () => {

    const [email] = useState({
        title: 'Let\'s Talk',

    })

    type FormData = {
        name: "",
        email: "",
        message: "",
        emailSend: Boolean,
    };


    const { register, setValue, handleSubmit, errors } = useForm<FormData>();
    const onSubmit = handleSubmit(({ name, email, message, emailSend }) => {
        console.log(name, email, message);
    });


    return (
        <Container>
            <Row>
                <Col>
                    <h3 className="h3nopad">{email.title}</h3>
                </Col>
            </Row>
            <Row>
                <div>
                    <Form onSubmit={onSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="full-name">Full Name</Form.Label>
                            <Form.Control id="full-name" name="name" type="text" ref={register} />
                        </Form.Group>


                        <Form.Group>
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control id="email" name="email" type="email" ref={register} />
                        </Form.Group>


                        <Form.Group>
                            <Form.Label htmlFor="message">Message</Form.Label>
                            <Form.Control id="message" name="message" as="textarea" ref={register} />
                        </Form.Group>


                        <Button className="d-inline-block" variant="primary" type="submit" >
                            Send
                        </Button>

                        {/* {{ emailSent } === true && <p className="d-inline success-msg">Email Sent</p>}
                        {{ emailSent } === false && <p className="d-inline err-msg">Email Not Sent</p>} */}

                    </Form>
                </div>
            </Row>
        </Container >
    );
}

export default EmailButton;