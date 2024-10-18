import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


import { weight_details } from "../../services/adddetails";
import { addDetails } from "../../services/adddetails";


import { UserDetails } from "../../components/UserDetails";

import LogoutButton from "../../components/LogoutButton";
import BackgroundAnimation from "../../components/BackgroundAnimation";
import WeightLog from "../../components/WeightDetails";

export function UserPage() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }
  

  return (
    <div className="main-container">
      <UserDetails />
      <WeightLog />
      <LogoutButton />
    </div>
  );
}
