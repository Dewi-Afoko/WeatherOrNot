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
        <Container fluid className="mt-5">

            <Row>
        <Col lg={5} className="p-3 text-end">
            <h1 className="display-6 mb-0">Welcome {username}</h1>
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
