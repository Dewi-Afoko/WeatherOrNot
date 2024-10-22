import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './userdetails.css'
import { add_workout } from "../services/addDetails";
//import BackgroundAnimation from "../../components/BackgroundAnimation";

export function CreateWorkout() {
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await add_workout();
      navigate(0);
    } catch (err) {
      console.error(err);
    //   navigate("/login");
    }
  }


  return (<>
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="FirstName">Exercise JSON</label>
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
      </div>
    </>
  );
}

