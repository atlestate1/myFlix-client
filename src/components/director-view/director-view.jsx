import React from 'react';
import PropTypes from 'prop-types';

import { Button, Col, Container, Row } from 'react-bootstrap';


export class DirectorView extends React.Component {
    render() {
        const { director, onBackClick } = this.props;

        return (
            <Container className="director-view">
                <Row>
                    <Col className="label">Director: </Col>
                    <Col className="value">{director.Name}</Col>
                </Row>
                <Row className="mt-3">
                    <Col className="label">Bio: </Col>
                    <Col className="value">{director.Bio}</Col>
                </Row>
                <Row className="mt-3">
                    <Col className="label">Birth: </Col>
                    <Col className="value">{director.Birth}</Col>
                </Row>
                <Button onClick={() => { onBackClick(null); }}>Back</Button>
            </Container>
        )
    }
}

DirectorView.propTypes = {
    director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birthday: PropTypes.string.isRequired,
        Death: PropTypes.string
    }).isRequired
};