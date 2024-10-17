import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { weight_details } from "../../services/adddetails";
import { addDetails } from "../../services/adddetails";
import LogoutButton from "../../components/LogoutButton";
import BackgroundAnimation from "../../components/BackgroundAnimation";
import WeightLog from "../../components/WeightDetails";

export function UserPage() {
  const [firstname, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
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
      await addDetails(token, username, firstname, lastName, dob, height, weight);
      const data = await weight_details(username); // TODO Actually do something with this data
      console.log(data);
      navigate(0);
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
  function handleHeightChange(event) {
    setHeight(event.target.value);
  }
  function handleWeightChange(event) {
    setWeight(event.target.value);
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
        <label htmlFor="height">Height:</label>
        <input
          id="height"
          type="text"
          value={height}
          onChange={handleHeightChange}
        /> 
        <label htmlFor="weight">Weight:</label>
        <input
          id="weight"
          type="text"
          value={weight}
          onChange={handleWeightChange}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
      <WeightLog/>
      <LogoutButton/>
    </>
  );
}
