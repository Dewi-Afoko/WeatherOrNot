import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PreferenceTest from "../../components/preferencesTest";
import './userpage.css'
import { weight_details } from "../../services/adddetails";

import { addDetails } from "../../services/adddetails";


import { UserDetails } from "../../components/UserDetails";

import LogoutButton from "../../components/LogoutButton";
import BackgroundAnimation from "../../components/BackgroundAnimation";
import WeightLog from "../../components/WeightDetails";


export function UserPage() {
  const [ test, settest]= useState(false)
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }
  const handleclick = ()=>{
    settest(true)
  }
  const handleClose = () => {
    settest(false);
  };

  return (
    <div className="main-container">
      <UserDetails />
      <WeightLog />
      <button className='test-button' onClick={handleclick}>Workout Preferences Test </button>
      {test && (<PreferenceTest onClose={handleClose}/>)}
      <LogoutButton />
    </div>
  );
}
