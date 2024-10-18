import { useState} from "react";
import { useNavigate } from "react-router-dom";
import './userdetails.css'
import {addDetails} from '../services/addDetails'

//import BackgroundAnimation from "../../components/BackgroundAnimation";

export function UserDetails() {
  const [firstname, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState(0)
  const [weighterror,setweighterror]=useState('')
  const [heighterror,setHeighterror]=useState('')
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
    const value = Number(event.target.value); 
    setHeight(value);
    if (value > 240) {
      setHeight(''); 
      setHeighterror(alert('Wrong height input, be realistic')); 
    } else {
      setHeighterror(''); 
    }
  }
  function handleWeightChange(event) {
    const value = Number(event.target.value); 
    setWeight(value);
    if (value > 300) {
      setWeight(0); 
      setweighterror(alert('Wrong weight input, be realistic')); 
    } else {
      setweighterror(''); 
    }
  }

  return (<>
    <div className="form-container">
      <h2>USER PROFILE DETAILS</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="FirstName">First Name:</label>
        <input
          id="FirstName"
          type="text"
          value={firstname}
          onChange={handlefirstnameChange}
        />
        <label htmlFor="lastname">Last Name:</label>
        <input
          id="lastname"
          type="text"
          value={lastName}
          onChange={handlelastnameChange}
        />
        <label htmlFor="dob">Date of Birth:</label>
        <input
          placeholder="dd/mm/yyyy"
          id="dob"
          type="dob"
          value={dob}
          onChange={handledobChange}
        />
        <label htmlFor="height">Height:</label>
        <input
          placeholder="cm"
          id="height"
          type="number"
          value={height}
          onChange={handleHeightChange}
        />
        <label htmlFor="weight">Weight:</label>
        <input
          placeholder="kg"
          id="weight"
          type="number"
          value={weight}
          onChange={handleWeightChange}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </div>
    {weighterror && (weighterror)}
    {heighterror && (heighterror)}
    </>
  );
}

