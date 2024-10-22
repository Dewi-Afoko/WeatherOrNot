// import { handleAddFavouriteClick, handleDeleteFavouriteClick } from "../handlers/exercises.js";
// import { handleAddFavouriteClick } from "../handlers/exercises.js";
// import { useState, useEffect } from "react";
// import { user_workout_list } from "../services/exercises.js";
import { useState } from "react";
import { addFavourite, deleteFavourite } from "../services/exercises";

function Exercise(props) {
    const [like, setLike] = useState(false);

    const handleAddFavouriteClick = async () => {
        try {
            if (!like) {
                // If not liked, add to favourites
                await addFavourite(props.user, props.name);
                setLike(true); // Set like to true
            } else {
                // If already liked, remove from favourites
                await deleteFavourite(props.user, props.name);
                setLike(false); // Set like to false
            }
        } catch (error) {
            console.error("Failed to update favourite:", error);
        }
    };
    
//    console.log(like)
    // console.log(props.user)
    // console.log(props.name)
    

return (
    <div>
        <h2>{props.name}</h2>
        <ul>
            <li>Type: {props.type}</li>
            <li>Muscle: {props.muscle}</li>
            <li>Equipment: {props.equipment}</li>
            <li>Difficulty: {props.difficulty}</li>
            <li>Instructions: {props.instructions}</li>
            <button onClick={handleAddFavouriteClick}>
                    {like ? "UnFavourite" : "Favourite"}
                </button>

            {/* <button onClick={() => setlike((prevState) => !prevState)}>{like ? "Favourite" : "UnFavourite"}</button> */}

            {/* {isLiked && (<button onClick={() => handleDeleteFavouriteClick(props.exercise_list)}>Remove Favourite</button>)}
            {!isLiked && (<button onClick={() => handleAddFavouriteClick(props.exercise_list)}>Favourite</button>)} */}
            </ul>
    </div>
);
}

export default Exercise;
