// docs: https://vitejs.dev/guide/env-and-mode.html

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// const API_URL = 'https://api.api-ninjas.com/v1/exercises'

export async function getNewExercises(token, muscle, difficulty, equipment) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json' //need to make sure correct content type here
    },
  };
  const response = await fetch(`${BACKEND_URL}/get_new_exercises?muscle=${muscle}&difficulty=${difficulty}&equipment=${equipment}` , requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch exercises from API");
  }
  const data = await response.json();
  return data;
}

// GET request for single exercise
export async function getExerciseDetails(token, exerciseName) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  };
  const response = await fetch(`${BACKEND_URL}/exercise?name=${exerciseName}`, requestOptions);
  if (response.status !== 200) {
    throw new Error("Unable to fetch exercise from API");
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



/////////////GET Likes list////////////
export async function getFavourites(token, username) {
  const requestOptions = {
      method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  };
  const response = await fetch(`${BACKEND_URL}/get_favourites?username=${username}`, requestOptions);
  if (response.status !== 200) {
      throw new Error("Unable getFavourite exercises");
  }
  const data = await response.json();
  return data;
}


///////////// Add Favourite /////////////
export async function addFavourite(user,name) {
  const payload = { user: user, name: name };
  const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,

      },
      body: JSON.stringify(payload),
  };
  const response = await fetch(`${BACKEND_URL}/add_favourite`, requestOptions);
    if (response.status !== 201) {
      throw new Error("Unable to add favourite exercise");
  }

  const data = await response.json();
  return data;
}


///////////// Delete Favourite /////////////
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
  const response = await fetch(`${BACKEND_URL}/delete_favourite`, requestOptions);
  if (response.status !== 200) {
      throw new Error("Unable to add favourite exercise");
  }

  const data = await response.json();
  return data;
}

