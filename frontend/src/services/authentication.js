// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function login(username, password) {
  const payload = {
    username: username,
    password: password,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${BACKEND_URL}/login`, requestOptions);
  console.log(response.status)
  // docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
  if (response.status === 201) {
    let data = await response.json();
    return data.token;
  } else if (response.status === 400){
    const errormessage = await response.json()
    throw new Error(
      errormessage.message
    );
  }
  else {
    throw new Error(
      `Received status ${response.status} when logging in. Expected 201`
    );
  }
}

export async function signup(username, password) {
  const payload = {
    username: username,
    password: password,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  let response = await fetch(`${BACKEND_URL}/signup`, requestOptions);

  // docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
  if (response.status === 201) {
    return;
  } else if (response.status === 400){
    const errormessage = await response.json()
    throw new Error(
      errormessage.message
    );
  }
  else {
    throw new Error(
      `Received status ${response.status} when signing up. Expected 201`
    );
  }
}
