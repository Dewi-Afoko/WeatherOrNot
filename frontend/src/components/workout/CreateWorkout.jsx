//import { useNavigate } from "react-router-dom";
import { add_workout } from "../../services/addDetails";
import AddExerciseButton from "./addExerciseButton";
import { useState } from "react";
import './createworkout.css';

export function CreateWorkout() {
  const [isWorkoutOpen, setIsWorkoutOpen] = useState(true);


  async function createWorkout() {
    console.log('Creating workout...');
    try {
      await add_workout(); 
      console.log('Workout created successfully');

    } catch (err) {
      console.error('Error creating workout:', err);
    }
  }

  async function finishWorkout() {
    console.log('Finishing workout...');
    console.log('Workout finished successfully');
  }

  
  async function handleButtonClick(event) {
    console.log('Button clicked'); 
    event.preventDefault();

    if (isWorkoutOpen) {
      await createWorkout(); 
    } else {
      await finishWorkout(); 
    }

    
    setIsWorkoutOpen((prev) => {
      console.log('Previous state:', prev); 
      return !prev; 
    });
  }
  const Exercises = 20
  return (
    <>
      <div className="addexercisebutton">
        <AddExerciseButton />
      </div>

      <div className="form-container2">
        <button type="button" onClick={handleButtonClick}>
          <label htmlFor={isWorkoutOpen ? "CreateWorkout" : "FinishWorkout"}>
            {isWorkoutOpen ? "Create Workout( start to add exercises)" : `Finish Workout (${Exercises} already added it)`}
          </label>
        </button>
      </div>
    </>
  );
}




