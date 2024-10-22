import { handleAddFavouriteClick, handleDeleteFavouriteClick } from "../handlers/exercises.js";
import { useState } from "react";
// import { addFavourite } from "../services/exercises.js";

export function FavouriteButton(props) {

const [isLiked, setisLiked] = useState(false);
// const [isExercise, setIsExercise] = useState(false);
const name = localStorage.getItem("exercise_list");
// console.log(name)
const exerciseList = JSON.parse(name); // Parse it back to an object/array
// console.log(exerciseList[0].name);

// useEffect(() => {
  // console.log("likes", props.username)
  // console.log("userid", props.userId)

  for (let i = 0; i < exerciseList.length; i++)
  { 
  console.log(name[0])
  // console.log(exerciseList[0])
  if(name?.includes(exerciseList[0])) {
    setisLiked(true);
  } else {
    setisLiked(false)
  }
}
 
  // [name, []]
// })

  return (
    <>
    {isLiked && (<button onClick={() => handleDeleteFavouriteClick(props.exercise_list)}>Remove Favourite</button>)}
    {!isLiked && (<button onClick={() => handleAddFavouriteClick(props.exercise_list)}>Favourite</button>)}
    </>
  )
} 
