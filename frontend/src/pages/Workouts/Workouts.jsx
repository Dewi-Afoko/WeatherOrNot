//import { CreateWorkout } from "../../components/workout/CreateWorkout"
import { get_workout } from "../../services/addDetails"
import { useEffect, useState } from "react"
// import Exercise from "../../components/Exercise"

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
   <h1>Workouts List</h1>
   {workouts_list.map((exercise, index) => { 
      return ( 
      <div key={index}>
          <h4>{exercise.date}</h4> 
          <p>complete: {JSON.stringify(exercise.complete)}</p> 
          <p>user: {exercise.username}</p> 
          
            <ul>{exercise.exercise_list.map((exercise, index) => {
               return (
                  <div key={index}>
                     <p>name: {exercise.exercise['name']}</p>
                     <p>Reps: {JSON.stringify(exercise['reps'].map(Number))}</p>
                     <p>loading: {JSON.stringify(exercise['loading'].map(Number))}</p>
                  </div>
               )
            })}
          </ul>

          <hr />  
          </div> 
          ); 
         })}
   
   </>
)
}
