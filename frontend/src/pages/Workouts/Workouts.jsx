//import { CreateWorkout } from "../../components/workout/CreateWorkout"
import { get_workout } from "../../services/addDetails"
import { useEffect, useState } from "react"
// import Exercise from "../../components/Exercise"
import DeleteExerciseButton from "../../components/workout/deleteWorkoutButton"

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
         <h1>Workout Log</h1>
         <br></br>
         <br></br>
         {workouts_list.map((exercise, index) => { 
            const hasValidExercise = exercise.exercise_list.some(
               (ex) => ex.exercise && ex.exercise.name
            );

            if (hasValidExercise) {
               return ( 
                  <div key={index}>
                     <br></br>
                     <h3>{exercise.date}</h3> 
                     <DeleteExerciseButton id={exercise.id}/>
                     {/* <p>Complete: {JSON.stringify(exercise.complete)}</p>  */}
                     {/* <p>User: {exercise.username}</p>  */}
                     <br></br>

                     
                     <ul>
                        {exercise.exercise_list.map((exercise, index) => {
                           return (
                              <div key={index}>
                                 <h4>Exercise: {exercise.exercise['name']}</h4>
                                 <p><b>Reps:</b> {exercise['reps'].map(Number).join(", ")}</p>
                                 <p><b>Loading:</b> {exercise['loading'].map(val => `${Number(val)}kg`).join(", ")}</p>
                                 <br></br>
                              </div>
                           )
                        })}
                     </ul>
                        
                     <hr />  
                  </div> 
               ); 
            }
            return null;
         })}
      </>
   )
}
