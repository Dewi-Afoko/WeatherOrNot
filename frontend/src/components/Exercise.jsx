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
        getFavourites(token)
        .then((data) => {
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
                    // console.log("LIKE STATUS 13:", like);
                // If not liked, add to favourites                
                await addFavourite(props.user, props.name);
                setLike(true); // Set like to true
                    // console.log("LIKE STATUS 18:", like);
            } else {
                    // console.log("LIKE STATUS 21:", like);
                // If already liked, remove from favourites
                await deleteFavourite(props.user, props.name);
                setLike(false); // Set like to false
                    // console.log("LIKE STATUS 26:", like);
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
        <Card className="mb-4 shadow-sm" style={{ cursor: 'pointer' }} onClick={props.onClick}>
            <Card.Body>

                <Card.Title className="text-primary" style={{ fontSize: '1.5rem' }}>
                    {formatDisplayOutput(props.name)}
                </Card.Title>
                
                <Card.Text>
                    <ul className="list-unstyled">
                        <li><strong>Muscle:</strong> {formatDisplayOutput(props.muscle)}</li>
                        <li><strong>Difficulty:</strong> {formatDisplayOutput(props.difficulty)}</li>
                        <li><strong>Equipment:</strong> {formatDisplayOutput(props.equipment)}</li>
                    </ul>
                </Card.Text>

                <div className="d-flex justify-content-center">
                    <Button 
                        variant="light" 
                        onClick={handleAddFavouriteClick}
                        className="d-flex align-items-center" 
                    >
                        <FontAwesomeIcon
                            icon={faHeart}
                            style={{ color: like ? 'pink' : 'grey', marginRight: '5px' }}
                        />
                        {like ? "Unfavourite" : "Favourite"}
                    </Button>
                </div>

            </Card.Body>
        </Card>
    );
}

export default Exercise;
