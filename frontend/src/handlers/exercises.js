// import { addFavourite, deleteLike } from "../services/exercises";
// import { addFavourite } from "../services/exercises";



// export async function handleAddFavouriteClick(exercise) {
//   const token = localStorage.getItem("token"); // getting the token from browser storage
//   const loggedIn = token !== null;
//   if (loggedIn) {
//     try {
//       const data = await addFavourite(token, exercise);
//       localStorage.setItem("token", data.token);
//       // console.log(exercise)
//       // updateState(!state)
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }

// export async function handleDeleteFavouriteClick(exercise) {
//   const token = localStorage.getItem("token"); // getting the token from browser storage
//   const loggedIn = token !== null;
//   if (loggedIn) {
//     try {
//       const data = await deleteLike(token, exercise);
//       localStorage.setItem("token", data.token);
//       // updateState(!state)
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }



