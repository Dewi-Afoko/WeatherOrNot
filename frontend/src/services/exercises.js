// docs: https://vitejs.dev/guide/env-and-mode.html

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_URL = 'https://api.api-ninjas.com/v1/exercises'


export async function getExercise(token, muscle) {

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };

  // const response = await fetch(`${API_URL}/muscle`, requestOptions);
  const response = await fetch(`${API_URL}?muscle=${muscle}`, requestOptions);


  if (response.status !== 200) {
    throw new Error("Unable to fetch exercises");
  }

  const data = await response.json();
  return data;
}
