// docs: https://vitejs.dev/guide/env-and-mode.html

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// const API_URL = 'https://api.api-ninjas.com/v1/exercises'

export async function getNewExercises(token, muscle) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, //currently makes no difference if token included or not...
      'Content-Type': 'application/json' //need to make sure correct content type here
    },
  };
  const response = await fetch(`${BACKEND_URL}/get_new_exercises?muscle=${muscle}`, requestOptions);
  if (response.status !== 200) {
    throw new Error("Unable to fetch exercises from API");
  }
  const data = await response.json();
  return data;
}


// GET for exercises stored in DB (rather than API)
export async function getbackEndExercises(token, muscle) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  };
  const response = await fetch(`${BACKEND_URL}/get_exercises?muscle=${muscle}`, requestOptions);
  if (response.status !== 200) {
    throw new Error("Unable to fetch exercises from backend");
  }
  const data = await response.json();
  return data;
}




///////////// add and delete likes /////////////

export async function addFavourite(user, name) {
  const payload = { user: user, name: name };
  console.log(payload)
  const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,

      },
      body: JSON.stringify(payload),
  };
// console.log(requestOptions)
  const response = await fetch(`${BACKEND_URL}/add_favourite`, requestOptions);
  if (response.status !== 201) {
      throw new Error("Unable to add favourite exercise");
  }

  const data = await response.json();
  return data;
}

export async function deleteFavourite(user, name) {
  const payload = { user: user, name: name };
  console.log(payload)
  const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,

      },
      body: JSON.stringify(payload),
  };
// console.log(requestOptions)
  const response = await fetch(`${BACKEND_URL}/delete_favourite`, requestOptions);
  if (response.status !== 201) {
      throw new Error("Unable to add favourite exercise");
  }

  const data = await response.json();
  return data;
}


// export async function deleteLike(token, exercise_list) {
//   const requestOptions = {
//     method: "DELETE",
//     headers: {      
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`
// },
//   };
//   const newUrl = new URL(`${BACKEND_URL}/add_favourite'${exercise_list}`);
//   const response = await fetch(newUrl.toString(), requestOptions);
  
//   const data = await response.json()
//   return data;
// }


// export async function user_workout_list(token, username) {
//   const payload = {
//     username: username,
//   };

//   const requestOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`
//     },
//     body: JSON.stringify(payload),
//   };

//   const response = await fetch(`${BACKEND_URL}/users_workout_list`, requestOptions);

//   if (response.status !== 201) {
//     throw new Error("Unable to load user details");
//   }

//   const data = await response.json();
//   return data;
// }