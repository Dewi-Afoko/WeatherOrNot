import RadioSelector from "./RadioSelector";
import { Form, Row, Col } from "react-bootstrap";

function ChooseEquipment(props) {

  const equipmentOptions = [
    'barbell',
    'dumbbell',
    'machine',
    'other'
  ];

  const handleChange = (event) => {
    props.setEquipment(event.target.value);
  };

  return (
    <Form.Group>
      <Row className="">
        {equipmentOptions.map((equipmentOption, index) => {
          return (
            <Col xs={6} md={4} className="m-2" key={index}>
              <RadioSelector
                id={equipmentOption}
                value={equipmentOption}
                name="equipment_group"
                checked={props.equipment === equipmentOption}
                onChange={handleChange}
              />
            </Col>
          );
        })}
      </Row>
    </Form.Group>
  );
}

export default ChooseEquipment;