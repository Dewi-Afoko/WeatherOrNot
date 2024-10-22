// docs: https://vitejs.dev/guide/env-and-mode.html

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// const API_URL = 'https://api.api-ninjas.com/v1/exercises'

export async function getNewExercises(token, muscle, difficulty, equipment) {
// export async function getNewExercises(token, muscle, difficulty, type) { //includes type for randomising 

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json' //need to make sure correct content type here
    },
  };

  // let queryParams = "";

  // let route;
  // if (muscle && difficulty) {
  //   route = `muscle=${muscle}&difficulty=${difficulty}`
  // } else if (muscle) {
  //   route = `muscle=${muscle}`
  // } else if (difficulty) {
  //   route = `difficulty=${difficulty}`
  // } else if (equipment) {
  //   route = `equipment=${equipment}`
  // }

  // if (muscle) {
  //   queryParams += `muscle=${muscle}`
  // }
  // if (difficulty) {
  //   queryParams += `difficulty=${difficulty}`
  // }
  // if (equipment) {
  //   queryParams += `equipment=${equipment}`
  // }



    // const response = await fetch(`${BACKEND_URL}/get_new_exercises?${queryParams}` , requestOptions);
    const response = await fetch(`${BACKEND_URL}/get_new_exercises?muscle=${muscle}&difficulty=${difficulty}&equipment=${equipment}` , requestOptions);
    // const response = await fetch(`${BACKEND_URL}/get_new_exercises?${route}`, requestOptions);
    // const response = await fetch(`${BACKEND_URL}/get_new_exercises?${route}&type=${type}`, requestOptions); //includes type for randomising 



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
  // console.log(payload)
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
  // console.log(payload)
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