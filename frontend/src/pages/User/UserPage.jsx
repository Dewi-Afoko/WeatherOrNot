import GfGWeatherApp from "../../components/weather/weather";
import { UserDetails } from "../../components/UserDetails";
import WeightLog from "../../components/WeightDetails";
import { Container, Row, Col } from 'react-bootstrap';
import WeightChart from "../../components/WeightChart";
import FavouriteList from "../../components/FavouriteList";
import WeightTracker from "../../components/WeightTracker";
import './userpage.css';

export function UserPage() {

  const username = localStorage.getItem('username')

  return (
    <>
        <Container fluid className="mt-5 bg-light">

    <Row className="text-start me-auto">
        <Col lg={5} className="bg-white w-100 text-end text-muted">
            <h4 className="mb-1 fw-light pr-5">Welcome {username}</h4>
        </Col>
    </Row>

            <Row className="mt-4 d-flex align-items-stretch">
                <Col md={4} className="text-center p-4">
                    <WeightTracker/>
                </Col>
                <Col md={4} className="text-center p-4">
                <WeightChart/>
                </Col>
                <Col md={4} className="p-4">
                <UserDetails />
                
                </Col>
            </Row>

            <Row className="mt-4 d-flex align-items-stretch">
                <Col md={4} className="text-center p-4">
                <WeightLog />
                </Col>
                <Col md={4} className="text-center p-4">
                <GfGWeatherApp/>
                </Col>
                <Col md={4} className="text-center p-4">
                <FavouriteList />
                </Col>
            </Row>
        </Container>
    
        <div className="">
      {/* <FavouriteList /> */}
      {/* <UserDetails /> */}
      {/* <WeightLog /> */}
      {/* <WeightChart/> */}
      {/* <GfGWeatherApp/> */}

      {/* <div className="weightChart"> */}
      {/* <button className='test-button' onClick={handleclick}>Workout Preferences Test </button>
      {test && (<PreferenceTest onClose={handleClose}/>)}
      <div className="weatherbox"> */}
      
      {/* </div> */}
      
    </div>
    
    </>
  );
}
