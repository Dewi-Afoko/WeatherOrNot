import React, { useState, useEffect } from 'react';
import { weight_details } from "../services/adddetails";

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
        <>
            <h3>Average: {averageWeight !== null ? averageWeight : 'Loading...'}</h3>
            <h3>Difference: {weightDifference !== null ? weightDifference : 'Loading...'}</h3>
            <h3>Max: {maxWeight !== null ? maxWeight : 'Loading...'}</h3>
            <h3>Min: {minWeight !== null ? minWeight : 'Loading...'}</h3>
        </>
    );
}

export default WeightLog;