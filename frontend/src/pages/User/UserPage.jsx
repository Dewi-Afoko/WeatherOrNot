import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GfGWeatherApp from "../../components/weather/weather";
import { UserDetails } from "../../components/UserDetails";
import WeightLog from "../../components/WeightDetails";
import './userpage.css';
import { Container, Row, Col } from 'react-bootstrap';

import WeightChart from "../../components/WeightChart";
import FavouriteList from "../../components/FavouriteList";


export function UserPage() {
  // const [ test, settest]= useState(false)
  // const navigate = useNavigate();

  // const token = localStorage.getItem("token");
  // if (!token) {
  //   navigate("/login");
  //   return;
  // }
  // const handleclick = ()=>{
  //   settest(true)
  // }
  // const handleClose = () => {
  //   settest(false);
  // };

  return (
    <>
        
    
        <div className="">
      <FavouriteList />
      <UserDetails />
      <WeightLog />
      <WeightChart/>
      <div className="weightChart">
      {/* <button className='test-button' onClick={handleclick}>Workout Preferences Test </button>
      {test && (<PreferenceTest onClose={handleClose}/>)}
      <div className="weatherbox"> */}
      <GfGWeatherApp/>
      </div>
      
    </div>
    
    </>
  );
}
