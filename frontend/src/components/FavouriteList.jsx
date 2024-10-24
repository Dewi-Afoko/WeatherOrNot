import { useEffect, useState } from "react";
import { getFavourites } from '../services/exercises';
import './FavouriteList.css'
import { Card } from 'react-bootstrap';

function FavouriteList() {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token")
        const username = localStorage.getItem("username")
  
        if (!token) {
            console.error("Token not found in localStorage");
            return;
        }
            getFavourites(token, username)
                .then((favourites) => {
                    setFavourites(favourites);
                })
    }, []); 

    return (
        <>
            <Card className="p-4 shadow bg-dark text-white">
            <Card.Body>
                <Card.Title className="display-6">My Favorites</Card.Title>
                <hr className="text-white" />
                <div className="favorites-list">
                    {favourites.map((favorite, index) => (
                        <div key={index}>
                            <p className="mb-2">{favorite}</p>
                            {index < favourites.length - 1 && <hr className="text-white" />} {/* Line separator */}
                        </div>
                    ))}
                </div>
            </Card.Body>
        </Card>
        </>

        // <div className="favourite-container">
        //     <h3>Favourite List</h3>
        //     <ul>
        //         {favourites.map((favourite, index) => (
        //             <li key={index}>{favourite}</li>
        //         ))}
        //     </ul>
        // </div>
    );
}

export default FavouriteList;
