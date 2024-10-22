
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import GfGWeatherApp from "../../components/weather/weather";
import PreferenceTest from "../../components/preferencesTest";
import './userpage.css'
//import { weight_details } from "../../services/adddetails";




import { UserDetails } from "../../components/UserDetails";

import LogoutButton from "../../components/LogoutButton";

import WeightLog from "../../components/WeightDetails";
import WeightChart from "../../components/WeightChart";


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
      <div className="weightChart"><WeightChart/></div>
      <button className='test-button' onClick={handleclick}>Workout Preferences Test </button>
      {test && (<PreferenceTest onClose={handleClose}/>)}
      <LogoutButton />
      <div className="weatherbox">
      <GfGWeatherApp/>
      </div>
    </div>
  );
}
