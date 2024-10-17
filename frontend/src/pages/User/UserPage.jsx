import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { addDetails } from "../../services/adddetails";
import LogoutButton from "../../components/LogoutButton";
import BackgroundAnimation from "../../components/BackgroundAnimation";

export function UserPage() {
  const [firstname, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState('')
  const navigate = useNavigate();

  const username = localStorage.getItem("username")
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await addDetails(token, username, firstname, lastName, dob);
      navigate("/user");
    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  }

  function handlefirstnameChange(event) {
    setFirstName(event.target.value);
  }
  function handlelastnameChange(event) {
    setLastName(event.target.value);
  }

  function handledobChange(event) {
    setDob(event.target.value);
  }

  return (
    <>
      <h2>USER PROFILE DETAILS</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="First Name">First Name:</label>
        <input
          id="FirstName"
          type="text"
          value={firstname}
          onChange={handlefirstnameChange}
        />
        <label htmlFor="lastname">lastname:</label>
        <input
          id="lastname"
          type="text"
          value={lastName}
          onChange={handlelastnameChange}
        />
        <label htmlFor="dob">Dob:</label>
        <input
          placeholder="dob"
          id="dob"
          type="dob"
          value={dob}
          onChange={handledobChange}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
      <LogoutButton/>
    </>
  );
}
