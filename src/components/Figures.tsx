import React from 'react';
import Figure from 'react-bootstrap/Figure'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Figures = () => {

    return (
        <Figure>
            <Figure.Image
                width={171}
                height={180}
                alt="171x180"
                src="holder.js/171x180"
            />
        </Figure>
    )
}

export default Figures;