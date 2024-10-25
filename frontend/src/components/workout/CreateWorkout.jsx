//import { useNavigate } from "react-router-dom";
import { add_workout } from "../../services/addDetails";
//import AddExerciseButton from "./addExerciseButton";
import { useState , useEffect} from "react";
import './createworkout.css';
import { Button } from 'react-bootstrap';
import { get_workout } from "../../services/addDetails";

// TODO: Switch so that button says "Start a new workout" or "Currently adding to workout: {id/name/date}" as function of button automatically adds exercise to most recently created in DB.

// TODO: Decided how to handle that adding workout with none open adds to latest workout for user in DB

// TODO: Only allow one workout to be created per day? (argue more than one is a "premium/subscriber feature" 😂)

// TODO: Create workout deletion backend and frontend button

// TODO: Return user weight when workout created if available?

export function CreateWorkout() {
  const [isWorkoutOpen, setIsWorkoutOpen] = useState(localStorage.getItem('WorkoutOpen'));
  // const [exerciseCount, setExerciseCount]= useState(localStorage.getItem('counterEx'))
  const [errorMessage, setErrorMessage] = useState('')

  // if (localStorage.getItem('WorkoutOpen')) {
  //   setIsWorkoutOpen(localStorage.getItem('WorkoutOpen'))
  // } else {
  //   setIsWorkoutOpen(localStorage.setItem('WorkoutOpen', true))
  // }

  // if local storage has workoutOpen and is set to true
  // render the button 'Currently building workout' - don't do anything - creates empty workout
  // else
  // render Create workout button

  async function createWorkout() {
    console.log('Creating workout...');
    try {
      const message = await add_workout(); 
      if (message === "Workout creation already in progress") {
        setErrorMessage(alert(message))
        localStorage.setItem('WorkoutOpen', true)
        setIsWorkoutOpen(localStorage.getItem('WorkoutOpen'))
      }
      localStorage.setItem('WorkoutOpen', true)
      setIsWorkoutOpen(localStorage.getItem('WorkoutOpen'))
      console.log('Workout created successfully');

    } catch (err) {
      console.error('Error creating workout:', err);
    }
  }

  // async function finishWorkout() {
  //   const data = await get_workout()
  //   localStorage.setItem('WorkoutOpen', false)
  //   //localStorage.setItem('counterEx',0)
  //   console.log(data);
  //   console.log('Workout finished successfully');
  // }

  
  async function handleButtonClick(event) {
    console.log('Button clicked'); 
    event.preventDefault();
    console.log(localStorage.getItem('WorkoutOpen'))
    if (localStorage.getItem('WorkoutOpen')) {
      createWorkout(); 
    } else {
      createWorkout(); 
      alert('Workout already created')
    }

    
    // setIsWorkoutOpen((prev) => {
    //   console.log('Previous state:', prev); 
    //   return !prev; 
    // });
  }

  // useEffect(() => {
  //   const updateExerciseCount = () => {
  //     setExerciseCount(localStorage.getItem('counterEx') || 0);
  //   };
  //   window.addEventListener('storage', updateExerciseCount);
  //   updateExerciseCount();
  //   return () => {
  //     window.removeEventListener('storage', updateExerciseCount);
  //   }
  // }, []);

  return (
    <>
      <div className="form-container2">
  <Button type="button" size="sm" onClick={handleButtonClick}>
    {isWorkoutOpen ? `Status: Currently Building Workout` : "Create Workout"}
  </Button>
</div>

      {/* <div className="form-container2">
        <button type="button" onClick={handleButtonClick}>
          <label htmlFor={isWorkoutOpen ? "Create Workout" : "In progress"}>
            {isWorkoutOpen ? `Status: Currently Building Workout` : "Create Workout"}
          </label>
        </button>
      </div> */}
      {errorMessage && (errorMessage)}
    </>
  );
}




