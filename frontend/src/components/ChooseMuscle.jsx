import RadioSelector from "./RadioSelector";
import { Form, Row, Col } from "react-bootstrap"; // Bootstrap components

function ChooseMuscle(props) {

  const muscleOptions = [
    'abdominals', 
    'abductors',
    'adductors',
    'biceps',
    'calves',
    'chest',
    'forearms',
    'glutes',
    'hamstrings',
    'lats',
    'lower_back',
    'middle_back',
    'neck',
    'quadriceps',
    'shoulders',
    'traps',
    'triceps'
  ];

  const handleChange = (event) => {
    props.setMuscle(event.target.value);
  };

  return (
    <Form.Group>
      <Row className="">
        {muscleOptions.map((muscleOption, index) => {
          return (
            <Col xs={6} md={4} className="text-center" key={index}> {/* Adjust column size and spacing */}
              <RadioSelector
                id={muscleOption}
                value={muscleOption}
                name="muscle_group"
                checked={props.muscle === muscleOption}
                onChange={handleChange}
              />
            </Col>
          );
        })}
      </Row>
    </Form.Group>
  );
}

export default ChooseMuscle;
