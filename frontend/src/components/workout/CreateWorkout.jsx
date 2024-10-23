//import { useNavigate } from "react-router-dom";
import { add_workout } from "../../services/addDetails";
//import AddExerciseButton from "./addExerciseButton";
import { useState , useEffect} from "react";
import './createworkout.css';
import { get_workout } from "../../services/addDetails";

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
            {isWorkoutOpen ? "Create Workout( start to add exercises)" : `Finish Workout (${exerciseCount} already added it)`}
          </label>
        </button>
      </div>
    </>
  );
}




