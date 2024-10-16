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