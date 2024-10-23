import { useLocation } from "react-router-dom";

function ExerciseDetails() {

    const location = useLocation();  // Access the location object
    const { name, type, muscle, equipment, difficulty, instructions } = location.state || {};

    const formatDisplayOutput = (output) => {
        return output
            .replace('_', ' ') // removes underscores
            .replace(output[0], output[0].toUpperCase()); //changes to title-case
    };

    return (
        <>
            <h2>{formatDisplayOutput(name)}</h2>
            <li>Type: {formatDisplayOutput(type)}</li>
            <li>Muscle: {formatDisplayOutput(muscle)}</li>
            <li>Equipment: {formatDisplayOutput(equipment)}</li>
            <li>Difficulty: {formatDisplayOutput(difficulty)}</li>
            <li>Instructions: {formatDisplayOutput(instructions)}</li>
        </>
    )
}

export default ExerciseDetails;