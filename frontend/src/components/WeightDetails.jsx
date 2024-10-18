import React, { useState, useEffect } from 'react';
import { weight_details } from "../services/adddetails";
import GaugeComponent from 'react-gauge-component';

export function WeightLog() {
    const [currentWeight, setCurrentWeight] = useState(null);
    const [averageWeight, setAverageWeight] = useState(null);
    const [weightDifference, setWeightDifference] = useState(null);
    const [maxWeight, setMaxWeight] = useState(null);
    const [minWeight, setMinWeight] = useState(null);
    const maxGauge = (maxWeight*1.5)
    const minGauge = (minWeight*0.5)

    useEffect(() => {
        async function fetchWeightDetails() {
            const username = localStorage.getItem('username');
            const data = await weight_details(username);
            setCurrentWeight(data[0]);
            setAverageWeight(data[1]);
            setWeightDifference(data[2]);
            setMaxWeight(data[3]);
            setMinWeight(data[4]);

        }

        fetchWeightDetails();
    }, []); 



    return (
        <>
            <h3>Current: {currentWeight !== null ? currentWeight : 'Loading...'}</h3>
            <h3>Average: {averageWeight !== null ? averageWeight : 'Loading...'}</h3>
            <h3>Difference: {weightDifference !== null ? weightDifference : 'Loading...'}</h3>
            <h3>Min: {minWeight !== null ? minWeight : 'Loading...'}</h3>
            <h3>Max: {maxWeight !== null ? maxWeight : 'Loading...'}</h3>

            <GaugeComponent
    arc={{
    subArcs: [
        {
        length: 0,
        color: '#F5CD19',
        showTick: true
        },
        {
        length: 20,
        color: '#F58B19',
        showTick: true
        },
        {
        length: 40,
        color: '#F5CD19',
        showTick: true
        },
        {
        length: 60,
        color: '#F58B19',
        showTick: true
        },
        {
        length: 80,
        color: '#F5CD19',
        showTick: true
        },
        {
        length: 100,
        color: '#F58B19',
        showTick: true
        },
    ]
    }}
    minValue={minGauge}
    maxValue={maxGauge}
    value={currentWeight}
/>

        </>
    );
}

export default WeightLog;