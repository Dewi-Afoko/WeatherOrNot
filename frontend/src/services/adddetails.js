// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function addDetails(token, username, firstname, lastname, dob, height, weight) {
  const payload = {
    username: username,
    first_name: firstname,
    last_name: lastname,
    dob : dob,
    height: height,
    weight: weight 
  };

  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${BACKEND_URL}/users`, requestOptions);

  if (response.status !== 201) {
    throw new Error("Unable to change details");
  }

  const data = await response.json();
  return data;
}


export async function weight_details(username) {
  const payload = {
    username: username,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}` #TODO Integrate tokens
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${BACKEND_URL}/users`, requestOptions);

  if (response.status !== 201) {
    throw new Error("Unable to change details");
  }

  const data = await response.json();
  return data;
}

export async function user_details(username) {
  const payload = {
    username: username,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}` #TODO Integrate tokens
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${BACKEND_URL}/users_details`, requestOptions);

  if (response.status !== 201) {
    throw new Error("Unable to load user details");
  }

  const data = await response.json();
  return data;
}

// Add a workout
export async function add_workout() {
  const username = localStorage.getItem('username')
  const payload = {
    user_username: username,
    complete: false,
  };
console.log(payload)
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}` #TODO Integrate tokens
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${BACKEND_URL}/workouts`, requestOptions);

  if (response.status !== 201) {
    throw new Error("Unable to add workout");
  }

  const data = await response.json();
  return data;
}

// Update a workout
// export async function update_workout() {
//   const payload = {
//     user_username: 'Testy',
//     date: "2024/03/01",
//     exercise_list: '{}',
//     complete: 'False',
//   };

//   const requestOptions = {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       // Authorization: `Bearer ${token}` #TODO Integrate tokens
//     },
//     body: JSON.stringify(payload),
//   };

//   const response = await fetch(`${BACKEND_URL}/workouts`, requestOptions);

//   if (response.status !== 201) {
//     throw new Error("Unable to add workout");
//   }

//   const data = await response.json();
//   return data;
// }