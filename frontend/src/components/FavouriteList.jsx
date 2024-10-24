import { useEffect, useState } from "react";
import { getFavourites } from '../services/exercises';
import './FavouriteList.css'

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

        <div className="favourite-container">
            <h3>Favourite List</h3>
            <ul>
                {favourites.map((favourite, index) => (
                    <li key={index}>{favourite}</li>
                ))}
            </ul>
        </div>
    );
}

export default FavouriteList;
