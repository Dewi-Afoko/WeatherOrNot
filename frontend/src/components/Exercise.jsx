import AddExerciseButton from "./workout/addExerciseButton";


function Exercise(props) {

    const formatDisplayOutput = (output) => {
        return output
            .replace('_', ' ') // removes underscores
            .replace(output[0], output[0].toUpperCase()); //changes to title-case
    };

    return (
        <div>
            <a href="">
                <h2>{formatDisplayOutput(props.name)}</h2>
            </a>
            <ul>
                <li>Type: {formatDisplayOutput(props.type)}</li>
                <li>Muscle: {formatDisplayOutput(props.muscle)}</li>
                <li>Equipment: {formatDisplayOutput(props.equipment)}</li>
                <li>Difficulty: {formatDisplayOutput(props.difficulty)}</li>
                {/* <li>Instructions: {props.instructions}</li> */}
            <AddExerciseButton exercise={props.exercise}/>
            </ul>
        </div>
    )
}

export default Exercise;
