//import { useNavigate } from "react-router-dom";
import { add_workout } from "../../services/addDetails";
//import AddExerciseButton from "./addExerciseButton";
import { useState , useEffect} from "react";
import './createworkout.css';
import { get_workout } from "../../services/addDetails";

// TODO: Switch so that button says "Start a new workout" or "Currently adding to workout: {id/name/date}" as function of button automatically adds exercise to most recently created in DB.

// TODO: Decided how to handle that adding workout with none open adds to latest workout for user in DB

// TODO: Only allow one workout to be created per day? (argue more than one is a "premium/subscriber feature" 😂)

// TODO: Create workout deletion backend and frontend button

// TODO: Return user weight when workout created if available?

export function CreateWorkout() {
  const [isWorkoutOpen, setIsWorkoutOpen] = useState(true);
  const [exerciseCount, setExerciseCount]= useState(localStorage.getItem('counterEx'))

  async function createWorkout() {
    console.log('Creating workout...');
    try {
      await add_workout(); 
      localStorage.setItem('WorkoutOpen',isWorkoutOpen)
      console.log('Workout created successfully');

    } catch (err) {
      console.error('Error creating workout:', err);
    }
  }

  async function finishWorkout() {
    const data = await get_workout()
    localStorage.setItem('WorkoutOpen',isWorkoutOpen)
    localStorage.setItem('counterEx',0)
    console.log(data);
    console.log('Workout finished successfully');
  }

  
  async function handleButtonClick(event) {
    console.log('Button clicked'); 
    event.preventDefault();
    if (isWorkoutOpen) {
      createWorkout(); 
    } else {
     finishWorkout(); 
    }

    
    setIsWorkoutOpen((prev) => {
      console.log('Previous state:', prev); 
      return !prev; 
    });
  }

  useEffect(() => {
    const updateExerciseCount = () => {
      setExerciseCount(localStorage.getItem('counterEx') || 0);
    };
    window.addEventListener('storage', updateExerciseCount);
    updateExerciseCount();
    return () => {
      window.removeEventListener('storage', updateExerciseCount);
    }
  }, []);
  return (
    <>

      <div className="form-container2">
        <button type="button" onClick={handleButtonClick}>
          <label htmlFor={isWorkoutOpen ? "CreateWorkout" : "FinishWorkout"}>
            {isWorkoutOpen ? "Create Workout (click to add exercises!)" : `Currently Building Workout... (${exerciseCount} already added it)`}
          </label>
        </button>
      </div>
    </>
  );
}




