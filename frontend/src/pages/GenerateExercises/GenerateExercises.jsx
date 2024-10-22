// import { useState } from "react";
import GenerateButton from "../../components/GenerateButton";
import ChooseMuscle from "../../components/ChooseMuscle";
import Exercise from "../../components/Exercise";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { getNewExercises, getbackEndExercises } from "../../services/exercises";
import { getNewExercises } from "../../services/exercises";

export function GenerateExercises() {

    const navigate = useNavigate();
    const [muscle, setMuscle] = useState("")
    const [exercises, setExercises] = useState([])
    const user = localStorage.getItem("username")

    // USING API
    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        if (muscle && token) {  // Make sure both muslce and token are set
            getNewExercises(token, muscle)
            .then((data) => {
                setExercises(data);  // Set exercises to ones fetched from API
                localStorage.setItem("exercise_list", JSON.stringify(data)); // Convert data to a JSON string
                // const name = localStorage.getItem("exercise_list");
                // const exerciseList = JSON.parse(name); // Parse it back to an object/array
                // console.log(exerciseList);    
            
            })
            .catch((err) => {
                console.error(err);
                navigate("/login");
            });
        } else {
            console.error("Please select a muscle group and ensure you're logged in.");
        }
    };

    // USING DB
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const token = localStorage.getItem("token");
    
    //     if (muscle && token) {  // Make sure both muslce and token are set
    //         getbackEndExercises(token, muscle)
    //         .then((data) => {
    //             setExercises(data);  // Set exercises to onesfetched from API
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //             navigate("/login");
    //         });
    //     } else {
    //         console.error("Please select a muscle group and ensure you're logged in.");
    //     }
    // };




    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <h1>Choose a Muscle</h1>
                    <ChooseMuscle
                        setMuscle={setMuscle}
                    />
                </div>
                <div>
                    <GenerateButton/>
                </div>
            </form>
            {/* {if (exercises) {
                return (
                    
                )
            }} */}
            <div>
                <h1>Try these exercises:</h1>
                {exercises.map((exercise, index) => {
                    // console.log('exercise', exercise);
                    return(
                        <Exercise
                            key={index}
                            name={exercise.name}
                            type={exercise.type}
                            muscle={exercise.muscle}
                            equipment={exercise.equipment}
                            difficulty={exercise.difficulty}
                            instructions={exercise.instructions}
                            user = {user}
                            exercise = {exercise}
                        />
                    )
                })}
            </div>
        </>
    )
}