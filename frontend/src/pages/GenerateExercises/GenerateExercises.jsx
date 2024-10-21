// import { useState } from "react";
import GenerateButton from "../../components/GenerateButton";
import ChooseMuscle from "../../components/ChooseMuscle";
import ChooseDifficulty from "../../components/ChooseDifficulty";
import Exercise from "../../components/Exercise";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNewExercises, getbackEndExercises } from "../../services/exercises";

export function GenerateExercises() {

    const exerciseTypes = [
        'cardio',
        'olympic_weightlifting',
        'plyometrics',
        'powerlifting',
        'strength',
        'stretching',
        'strongman'
    ]

    // A function to be passed down to each component - used to correctly format display for user
    // const formatDisplayOutput = (output) => {
    //     return output
    //         .replace('_', ' ') // removes underscores
    //         .replace(output[0], output[0].toUpperCase()); //changes to title-case
    // };

    const navigate = useNavigate();

    // Managin state for exercises output
    const [exercises, setExercises] = useState([])

    // managing state for form inputs
    const [muscle, setMuscle] = useState("")
    const [difficulty, setDifficulty] = useState("")
    // const [equipment, setEquipment] = useState([])
    // const [type, setType] = useState("")


    // USING API
    const handleSubmit = (event) => {
        event.preventDefault();
        setExercises([]);
        const token = localStorage.getItem("token");
    
        // setDifficulty(localStorage.getItem("difficulty")); // set difficulty to users preference in local storage    
        if (!token) {
            console.error("Please ensure you're logged in.");
            navigate("/login");
            return;
        }
        if (muscle || difficulty) {
            // setType(exerciseTypes[(Math.floor(Math.random() * exerciseTypes.length))]) // sets type to random choice from array of types
            // getNewExercises(token, muscle, difficulty, type) // includes type for randomising results
            getNewExercises(token, muscle, difficulty)
            .then((data) => {
                setExercises(data);
                setMuscle(""); //reset value
                setDifficulty(""); //reset value
            })
            .catch((err) => {
                console.error(err)
            })

        } else {
            console.error("Please select a filter and ensure you're logged in.");
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <h1>Choose a Muscle</h1>
                    <ChooseMuscle
                        muscle={muscle}
                        setMuscle={setMuscle}
                        // formatDisplayOutput={formatDisplayOutput}
                    />
                </div>
                <div>
                    <h1>Choose Difficulty</h1>
                    <ChooseDifficulty
                        difficulty={difficulty}
                        setDifficulty={setDifficulty}
                        // formatDisplayOutput={formatDisplayOutput}
                    />
                </div>
                <div>
                    <GenerateButton/>
                </div>
            </form>

            {exercises.length > 0 &&
            <div>
                <h1>Try these exercises:</h1>
                {exercises.map((exercise, index) => {
                    console.log('exercise', exercise);
                    return(
                        <Exercise
                            key={index}
                            name={exercise.name}
                            type={exercise.type}
                            muscle={exercise.muscle}
                            equipment={exercise.equipment}
                            difficulty={exercise.difficulty}
                            instructions={exercise.instructions}
                            // formatDisplayOutput={formatDisplayOutput}
                        />
                    )
                })}
            </div>}
        </>
    )
}