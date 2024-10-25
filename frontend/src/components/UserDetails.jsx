import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './userdetails.css'
import {addDetails} from '../services/addDetails'
import { user_details } from "../services/addDetails";
import { Card } from 'react-bootstrap';


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
    const token = localStorage.getItem("token");
    const data = await user_details(token,username);
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

  return (
    <>
            <Card className="p-2 shadow " border="0">
                <Card.Body>
                <Card.Title className="display-6 pb-2 text-center">User Details</Card.Title>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="FirstName" className="form-label">First Name: {currentFirstName}</label>
                            <input
                                placeholder="Update First Name"
                                id="FirstName"
                                type="text"
                                className="form-control"
                                value={firstname}
                                onChange={handlefirstnameChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastname" className="form-label">Last Name: {currentLastName}</label>
                            <input
                                placeholder="Update Last Name"
                                id="lastname"
                                type="text"
                                className="form-control"
                                value={lastName}
                                onChange={handlelastnameChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dob" className="form-label">Date of Birth: {currentDob}</label>
                            <input
                                placeholder="Update date of birth (dd/mm/yyyy)"
                                id="dob"
                                type="date"
                                className="form-control"
                                value={dob}
                                onChange={handledobChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="height" className="form-label">Height (cm): {currentHeight}</label>
                            <input
                                placeholder="Update height (cm)"
                                id="height"
                                type="number"
                                className="form-control"
                                value={height}
                                onChange={handleHeightChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="weight" className="form-label">Weight (kg):<br/>(Update Weight below)</label>
                            <input
                                placeholder="Update weight (kg)"
                                id="weight"
                                type="number"
                                className="form-control"
                                value={weight}
                                onChange={handleWeightChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                    </form>
                </Card.Body>
            </Card>
    {weighterror && (weighterror)}
    {heighterror && (heighterror)}
    </>
  );
}


{/* <div className="form-container">
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
  <label htmlFor="dob">Date of Birth: {currentDob}</label>
  <input
    placeholder="Update date of birth(dd/mm/yyyy)"
    id="dob"
    type="date"
    value={dob}
    onChange={handledobChange}
  />
  <label htmlFor="height">Height: {currentHeight}</label>
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
</div> */}
