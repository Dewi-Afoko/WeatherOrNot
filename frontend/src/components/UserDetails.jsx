import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './userdetails.css'
import {addDetails} from '../services/addDetails'
import { user_details } from "../services/addDetails";
//import BackgroundAnimation from "../../components/BackgroundAnimation";

export function UserDetails() {
  const [currentFirstName, setCurrentFirstName]=useState('')
  const [firstname, setFirstName] = useState('')
  const [currentLastName, setCurrentLastName]=useState('')
  const [lastName, setLastName] = useState('')
  const [currentDob, setCurrentDob]=useState('')
  const [dob, setDob] = useState('')
  const [currentHeight, setCurrentHeight]= useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState(0)
  const [weighterror,setweighterror]=useState('')
  const [heighterror,setHeighterror]=useState('')
  const navigate = useNavigate();

  const username = localStorage.getItem("username")
  const token = localStorage.getItem("token");
  

useEffect(() => {
  async function fetchUserDetails() {
    const username = localStorage.getItem('username');
    const data = await user_details(username);
    setCurrentFirstName(data[0]);
    setCurrentLastName(data[1]);
    setCurrentDob(data[2]);
    setCurrentHeight(data[3]);
    
  } 
  fetchUserDetails();
}, []); 

if (!token) {
  navigate("/login");
  return;}


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
    const value = event.target.value
    setFirstName(value);
  }
  function handlelastnameChange(event) {
    const value = event.target.value
    setLastName(value);
  }

  function handledobChange(event) {
    const value = event.target.value
    setDob(value);
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
        <label htmlFor="FirstName">First Name: {currentFirstName}</label>
        <input
        placeholder="Update First Name"
          id="FirstName"
          type="text"
          value={firstname}
          onChange={handlefirstnameChange}
        />
        <label htmlFor="lastname">Last Name: {currentLastName}</label>
        <input
        placeholder="Update Last Name"
          id="lastname"
          type="text"
          value={lastName}
          onChange={handlelastnameChange}
        />
        <label htmlFor="dob">Date of Birth: {currentDob}<br></br>(Update DoB below)</label>
        <input
      
          placeholder="Update date of birth(dd/mm/yyyy)"
          id="dob"
          type="date"
          value={dob}
          onChange={handledobChange}
        />
        <label htmlFor="height">Height: {currentHeight}<br></br>(Update Weight below)</label>
        <input
          placeholder="Update height(cm)"
          id="height"
          type="number"
          value={height}
          onChange={handleHeightChange}
        />
        <label htmlFor="weight">Weight(kg):<br></br>(Update Weight below)</label>
        <input
          placeholder="Update weight(kg)"
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

