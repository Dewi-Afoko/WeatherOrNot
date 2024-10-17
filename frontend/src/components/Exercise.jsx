function Exercise(props) {

    return (
        <div>
            <h2>name:{props.exercise.name}</h2>
            <ul>
                <li>Type:</li>
                <li>Muscle:</li>
                <li>Equipment:</li>
                <li>Difficulty:</li>
                <li>Instructions:</li>
            </ul>
        </div>
    )
}

export default Exercise;
