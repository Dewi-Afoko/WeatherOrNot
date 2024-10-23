//import { CreateWorkout } from "../../components/workout/CreateWorkout"
import { get_workout } from "../../services/addDetails"
import { useEffect, useState } from "react"
import Exercise from "../../components/Exercise"
export function Workouts() {
   const workoutOpen = localStorage.getItem('WorkoutOpen')
   const [workouts_list , setWorkoutsList] = useState('')
   
   useEffect(() =>{
      async function get_workouts() {
         const data = await get_workout()
         setWorkoutsList(data)
      }; get_workouts()

      },[])

return (
   <>
   
   </>
)
}
