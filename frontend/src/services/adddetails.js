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
