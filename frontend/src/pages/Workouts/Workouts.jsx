//import { CreateWorkout } from "../../components/workout/CreateWorkout"
import { get_workout } from "../../services/addDetails"
import { useEffect, useState } from "react"
// import Exercise from "../../components/Exercise"
import { Card, Container, Row, Col } from 'react-bootstrap';


export function Workouts() {
   const workoutOpen = localStorage.getItem('WorkoutOpen')
   const [workouts_list, setWorkoutsList] = useState([])

   useEffect(() => {
      async function get_workouts() {
         const data = await get_workout()
         console.log(data)
         setWorkoutsList(data)
         localStorage.setItem('test', data)
      }
      get_workouts();
   }, []);

   console.log(workouts_list)

   return (
      <>
         <Container className="mt-5">
            <Row>
            <h1 className="text-center">Workout Log</h1>
            </Row>
            <br />
            {workouts_list.map((exercise, index) => { 
                const hasValidExercise = exercise.exercise_list.some(
                    (ex) => ex.exercise && ex.exercise.name
                );

                if (hasValidExercise) {
                    return ( 
                        <div key={index} className="mb-4">
                            <h3 className="text-center">{exercise.date}</h3>
                            <Row>
                                {exercise.exercise_list.map((exercise, index) => (
                                    <Col key={index} md={4} className="mb-3">
                                        <Card className="bg-light shadow">
                                            <Card.Body className="">
                                                <Card.Title>Exercise: {exercise.exercise['name']}</Card.Title>
                                                <Card.Text>
                                                    <b>Reps:</b> {exercise['reps'].map(Number).join(", ")}
                                                </Card.Text>
                                                <Card.Text>
                                                    <b>Loading:</b> {exercise['loading'].map(val => `${Number(val)}kg`).join(", ")}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                            <hr />  
                        </div> 
                    ); 
                }
                return null;
            })}
        </Container>
      </>
   )
}
