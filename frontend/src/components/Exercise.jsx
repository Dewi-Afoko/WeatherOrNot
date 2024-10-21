function Exercise(props) {

    return (
        <div>
            <a href="">
                <h2>{props.name}</h2>
            </a>
            <ul>
                <li>Type: {props.type}</li>
                <li>Muscle: {props.muscle}</li>
                <li>Equipment: {props.equipment}</li>
                {console.log("equipment = ", props.equipment)}
                <li>Difficulty: {props.difficulty}</li>
                {/* <li>Instructions: {props.instructions}</li> */}
            </ul>
        </div>
    )
}

export default Exercise;
