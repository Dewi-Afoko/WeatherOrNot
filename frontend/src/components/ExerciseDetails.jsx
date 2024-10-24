import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card } from 'react-bootstrap';

function ExerciseDetails() {

    const location = useLocation();  // Access the location object which links in wth naviagte
    const { name, type, muscle, equipment, difficulty, instructions } = location.state || {};

    const formatDisplayOutput = (output) => {
        return output
            .replace('_', ' ') // removes underscores
            .replace(output[0], output[0].toUpperCase()); //changes to title-case
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title className="text-center">
                                <h2>{formatDisplayOutput(name)}</h2>
                            </Card.Title>
                            <Card.Text>
                                <ul className="list-unstyled">
                                    <li><strong>Type:</strong> {formatDisplayOutput(type)}</li>
                                    <li><strong>Muscle:</strong> {formatDisplayOutput(muscle)}</li>
                                    <li><strong>Equipment:</strong> {formatDisplayOutput(equipment)}</li>
                                    <li><strong>Difficulty:</strong> {formatDisplayOutput(difficulty)}</li>
                                    <li><strong>Instructions:</strong> {formatDisplayOutput(instructions)}</li>
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default ExerciseDetails;