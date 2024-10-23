// import { useState } from "react";
import GenerateButton from "../../components/GenerateButton";
import ChooseMuscle from "../../components/ChooseMuscle";
import ChooseDifficulty from "../../components/ChooseDifficulty";
import ChooseEquipment from "../../components/ChooseEquipment";
import Exercise from "../../components/Exercise";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNewExercises } from "../../services/exercises";
// import { getNewExercises, getbackEndExercises } from "../../services/exercises";

export function GenerateExercises() {

    // const exerciseTypes = [
    //     'cardio',
    //     'olympic_weightlifting',
    //     'plyometrics',
    //     'powerlifting',
    //     'strength',
    //     'stretching',
    //     'strongman'
    // ]

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
    const [equipment, setEquipment] = useState([])
    // const [type, setType] = useState("")


    const user = localStorage.getItem("username")

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
        if (muscle || difficulty || equipment) {
            // setType(exerciseTypes[(Math.floor(Math.random() * exerciseTypes.length))]) // sets type to random choice from array of types
            // getNewExercises(token, muscle, difficulty, type) // includes type for randomising results
            getNewExercises(token, muscle, difficulty, equipment)
            .then((data) => {
                setExercises(data);
                localStorage.setItem("exercise_list", JSON.stringify(data));
                setMuscle(""); //reset value
                setDifficulty(""); //reset value
                setEquipment("")
            })
            .catch((err) => {
                console.error(err)
            })

        } else {
            console.error("Please select a filter and ensure you're logged in.");
        }
    };

    const handleViewExerciseDetails = (exercise) => {
        navigate('/exercise', {
            state: { ...exercise },
        });
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3>Choose a Muscle</h3>
                    <ChooseMuscle
                        muscle={muscle}
                        setMuscle={setMuscle}
                        // formatDisplayOutput={formatDisplayOutput}
                    />
                </div>
                <div>
                    <h3>Choose Difficulty</h3>
                    <ChooseDifficulty
                        difficulty={difficulty}
                        setDifficulty={setDifficulty}
                        // formatDisplayOutput={formatDisplayOutput}
                    />
                </div>
                <div>
                    <h3>Choose Equipment</h3>
                    <ChooseEquipment
                        equipment={equipment}
                        setEquipment={setEquipment}
                        // formatDisplayOutput={formatDisplayOutput}
                    />
                </div>
                <br />
                <div>
                    <GenerateButton/>
                </div>
            </form>

            {exercises.length > 0 &&
            <div>
                <h3>Try these exercises:</h3>
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
                            onClick={() => handleViewExerciseDetails(exercise)}
                            // formatDisplayOutput={formatDisplayOutput}
                        />
                    )
                })}
            </div>}
        </>
    )
}