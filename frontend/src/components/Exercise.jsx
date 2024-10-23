// import { handleAddFavouriteClick, handleDeleteFavouriteClick } from "../handlers/exercises.js";
// import { handleAddFavouriteClick } from "../handlers/exercises.js";
// import { useState, useEffect } from "react";
// import { user_workout_list } from "../services/exercises.js";
import { useEffect, useState } from "react";
import { addFavourite, deleteFavourite, getFavourites } from "../services/exercises";

function Exercise(props) {
    const [like, setLike] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            console.error("Token not found in localStorage");
            return;
        }
        getFavourites(token, props.user)
        .then((data) => {
            // console.log("DATA: " ,data)
            if (data.includes(props.name)) {
                setLike(true)
            } else {
                setLike(false)
            }
        })
    }, [])

    const handleAddFavouriteClick = async () => {
        try {
            if (!like) {
                await addFavourite(props.user, props.name);
                setLike(true); // Set like to true
            } else {
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
            <button onClick={handleAddFavouriteClick}>
                    {like ? "UnFavourite" : "Favourite"}
                </button>
            </ul>
    </div>
);
}

export default Exercise;
