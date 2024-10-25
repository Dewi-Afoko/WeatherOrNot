import RadioSelector from "./RadioSelector";
import { Form, Row, Col } from "react-bootstrap";

function ChooseDifficulty(props) {

  const difficultyOptions = [
    'beginner',
    'intermediate',
    'expert'
  ];

  const handleChange = (event) => {
    props.setDifficulty(event.target.value);
  };

  return (
    <Form.Group>
      <Row className="">
        {difficultyOptions.map((difficultyOption, index) => {
          return (
            <Col xs={6} md={4} className="" key={index}>
              <RadioSelector
                id={difficultyOption}
                value={difficultyOption}
                name="difficulty_group"
                checked={props.difficulty === difficultyOption}
                onChange={handleChange}
              />
            </Col>
          );
        })}
      </Row>
    </Form.Group>
  );
}

export default ChooseDifficulty;
