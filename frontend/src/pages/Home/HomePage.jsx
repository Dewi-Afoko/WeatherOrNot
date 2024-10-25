import { Link } from "react-router-dom";
import RotatingText from "./title3";
import "./HomePage.css";
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

export function HomePage() {
  return (
    <div>
      {/* Full-width header */}
      <header className="text-center py-5">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col xs={12} md={8}>
              <h1 className="display-4 text-center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WeatherOrNot</h1>
              <RotatingText/>
              <div className="mt-4 d-flex justify-content-center">
                <Button variant="secondary " className="me-2"><Link className="no-link" to="/login">Log In</Link></Button>
                <Button variant="outline-secondary"><Link className="no-link" to="/signup" >Sign Up</Link></Button>
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      {/* Feature cards */}
      <Container className="mt-5 pb-5">
        <Row>
          <h1 className="display-4 mb-4">Features</h1>
          <Col md={4}>
            <Card className="text-center shadow">
              <Card.Body>
                <Card.Title>Save favourite exercises</Card.Title>
                <Card.Text>
                A user can favourite (and unfavourite) a generated exercise and then see a list of favourited exercises on the dashboard
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow">
              <Card.Body>
                <Card.Title>Visual Charts</Card.Title>
                <Card.Text>
                  A visual chart and gauge displays users weight.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow">
              <Card.Body>
                <Card.Title>Workout tracker</Card.Title>
                <Card.Text>
                A user can log generated exercises along with loading and reps to create a workout plan
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    // <div className="home">
    //   <h6>Weather Or Not!</h6>
    //   <RotatingText/>
    //   <Link to="/signup" className="button">Sign Up</Link>
    //   <Link to="/login" className="button">Log In</Link>
    // </div>
  );
}
