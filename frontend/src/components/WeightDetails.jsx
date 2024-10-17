import { useState, useEffect } from 'react';
import { weight_details } from "../services/adddetails";
import './weightdetails.css'
export function WeightLog() {
    const [averageWeight, setAverageWeight] = useState(null);
    const [weightDifference, setWeightDifference] = useState(null);
    const [maxWeight, setMaxWeight] = useState(null);
    const [minWeight, setMinWeight] = useState(null);

    useEffect(() => {
        async function fetchWeightDetails() {
            const username = localStorage.getItem('username');
            const data = await weight_details(username);
            setAverageWeight(data[0]);
            setWeightDifference(data[1]);
            setMaxWeight(data[2]);
            setMinWeight(data[3]);
        }

        fetchWeightDetails();
    }, []); 

    return (
        <div className="stats-container">
          <h3>Your average weight: {averageWeight !== null ? averageWeight : 'Loading...'}kg</h3>
          <h3>Weight difference since 1st input: {weightDifference !== null ? weightDifference : 'Loading...'}kg</h3>
          <h3>Max weight: {maxWeight !== null ? maxWeight : 'Loading...'}kg</h3>
          <h3>Min weight: {minWeight !== null ? minWeight : 'Loading...'}kg</h3>
        </div>
      );}

export default WeightLog;