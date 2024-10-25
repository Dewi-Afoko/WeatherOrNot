import { Container, Row, Col, Form, Card } from "react-bootstrap"; // Import Bootstrap components
import GenerateButton from "../../components/GenerateButton";
import ChooseMuscle from "../../components/ChooseMuscle";
import ChooseDifficulty from "../../components/ChooseDifficulty";
import ChooseEquipment from "../../components/ChooseEquipment";
import Exercise from "../../components/Exercise";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNewExercises } from "../../services/exercises";



export function GenerateExercises() {
    const navigate = useNavigate();

    const [choices, setChoices] = useState({'muscle': "", 'difficulty': "", 'equipment': ""})

    // Managing state for exercises output
    const [exercises, setExercises] = useState([]);
    const [muscle, setMuscle] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [equipment, setEquipment] = useState([]);

    const user = localStorage.getItem("username");

    const handleSubmit = (event) => {
        event.preventDefault();
        setExercises([]);
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("Please ensure you're logged in.");
            navigate("/login");
            return;
        }
        if (muscle || difficulty || equipment) {
            getNewExercises(token, muscle, difficulty, equipment)
            .then((data) => {
                if (data.length > 3) {
                    const shuffledExercises = data.sort(() => 0.5 - Math.random()); //shuffles the exercises randomly
                    setExercises(shuffledExercises.slice(0, 3)); //slices the first 3 exercises from the shuffled arrray
                } else {
                    setExercises(data); // returns all the exercises if less than 4 available
                }
                localStorage.setItem("exercise_list", JSON.stringify(exercises)); // stores only the exercises displayed to user (rather than full data array)
                setMuscle(""); 
                setDifficulty(""); 
                setEquipment("");
            })
            .catch((err) => {
                console.error(err);
            });
        } else {
            console.error("Please select a filter and ensure you're logged in.");
        }
    };

    const handleViewExerciseDetails = (exercise) => {
        navigate('/exercise', {
            state: { ...exercise },
        });
    };

    const formatDisplayOutput = (output) => {
        return output
            .replace('_', ' ') // removes underscores
            .replace(output[0], output[0].toUpperCase()); // capitalizes the first letter
    };

    return (
        <Container className="justify-content-center">
            <div className="text-center my-4">
                <h1 className="display-4  text-primary">Workout Generator</h1>
            </div>
            <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '500px' }}>
  <Row className="mb-3 text-center flex-column">
    <Col xs={12} className="mb-2"> {/* Add margin between cards */}
      <Card>
        <Card.Body>
          <Card.Title className="fw-bold pb-2 text-secondary text-center">Choose Difficulty</Card.Title>
          <ChooseDifficulty
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        </Card.Body>
      </Card>
    </Col>
    {/* <Col xs={12} className="mb-2">
      <Card>
        <Card.Body>
          <Card.Title className="fw-bold pb-2 text-secondary text-center">Choose Equipment</Card.Title>
          <ChooseEquipment
            equipment={equipment}
            setEquipment={setEquipment}
          />
        </Card.Body>
      </Card>
    </Col> */}
    <Col xs={12} className="mb-2">
      <Card>
        <Card.Body>
          <Card.Title className="fw-bold pb-2 text-secondary text-center">Choose Muscle</Card.Title>
          <ChooseMuscle
            muscle={muscle}
            setMuscle={setMuscle}
          />
        </Card.Body>
      </Card>
    </Col>
  </Row>
  <div className="text-center">
    <GenerateButton />
  </div>
</Form>

            <br />

            {exercises.length > 0 && (
                <div className="my-5">
                    <div className="selected-choices text-center p-3 mb-4 bg-light rounded shadow-sm">
                        <h4 className="mb-3 text-secondary">You Selected:</h4>
                        <Row>
                            <Col xs={12} md={6} className="mb-2">
                                <strong>Muscle:</strong> {formatDisplayOutput(exercises[0].muscle)}
                            </Col>
                            <Col xs={12} md={6} className="mb-2">
                                <strong>Difficulty:</strong> {formatDisplayOutput(exercises[0].difficulty)}
                            </Col>
                            {/* <Col xs={12} md={4} className="mb-2">
                                <strong>Equipment:</strong> {formatDisplayOutput(exercises[0].equipment)}
                            </Col> */}
                        </Row>
                    </div>
                    <Row>
                    <h3 className="display-6 text-center mb-4">Try these exercises:</h3>
                        {exercises.map((exercise, index) => (
                            <Col xs={12} md={6} lg={4} key={index} className="mb-4">
                                <Exercise
                                    key={index}
                                    name={exercise.name}
                                    type={exercise.type}
                                    muscle={exercise.muscle}
                                    equipment={exercise.equipment}
                                    difficulty={exercise.difficulty}
                                    instructions={exercise.instructions}
                                    user={user}
                                    exercise={exercise}
                                    onClick={() => handleViewExerciseDetails(exercise)}
                                />
                            </Col>
                        ))}
                    </Row>
                </div>
            )}
        </Container>
    );
}

