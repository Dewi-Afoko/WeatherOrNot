
import AddExerciseButton from "./workout/addExerciseButton";


// import { handleAddFavouriteClick, handleDeleteFavouriteClick } from "../handlers/exercises.js";
// import { handleAddFavouriteClick } from "../handlers/exercises.js";
// import { useState, useEffect } from "react";
// import { user_workout_list } from "../services/exercises.js";
import { useEffect, useState } from "react";
import { addFavourite, deleteFavourite, getFavourites } from "../services/exercises";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


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

    const formatDisplayOutput = (output) => {
        return output
            .replace('_', ' ') // removes underscores
            .replace(output[0], output[0].toUpperCase()); //changes to title-case
    };
    
    return (

        <Card className="mb-4 shadow-sm text-center">
            <Card.Body>

                <Card.Title className="text-primary fw-bold" style={{ cursor: 'pointer' }} onClick={props.onClick}>
                    {formatDisplayOutput(props.name)}
                </Card.Title>
                
                <Card.Text>
                    <ul className="list-unstyled">
                        <li><strong>Muscle:</strong> {formatDisplayOutput(props.muscle)}</li>
                        <li><strong>Difficulty:</strong> {formatDisplayOutput(props.difficulty)}</li>
                        <li><strong>Equipment:</strong> {formatDisplayOutput(props.equipment)}</li>
                    </ul>
                </Card.Text>


                <div className="d-flex flex-column align-items-center">
                    {/* Favourite Button */}
                    <Button 
                        variant="light" 
                        onClick={handleAddFavouriteClick}
                        className="d-flex align-items-center mb-3 btn-sm" 
                    >
                        {like ? "Remove Favourite" : "Add Favourite"}
                        <FontAwesomeIcon
                            icon={faHeart}
                            style={{ color: like ? 'pink' : 'grey', marginLeft: '5px' }}
                        />
                    </Button>

                    {/* Add to Workout Button */}
                </div>

            </Card.Body>
                <AddExerciseButton exercise={props.exercise} />
        </Card>
    );

}

export default Exercise;
