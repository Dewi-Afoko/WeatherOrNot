function Exercise(props) {

    return (
        <div>
            <h2>name: {props.name}</h2>
            <ul>
                <li>Type: {props.type}</li>
                <li>Muscle: {props.muscle}</li>
                <li>Equipment: {props.equipment}</li>
                <li>Difficulty: {props.difficulty}</li>
                <li>Instructions: {props.instructions}</li>
            </ul>
        </div>
    )
}

export default Exercise;
