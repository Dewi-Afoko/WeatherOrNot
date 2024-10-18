import { useState, useEffect } from 'react';
import { weight_details } from "../services/adddetails";

import GaugeComponent from 'react-gauge-component';


import './weightdetails.css'

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

    const getValueColor = (value) => {
        const range = maxGauge - minGauge;
        const sectionSize = range / 5; 
    
        if (value <= minGauge + sectionSize) {
        return '#F58B19'; 
        } else if (value <= minGauge + sectionSize * 2) {
        return '#F5CD19'; 
        } else if (value <= minGauge + sectionSize * 3) {
        return '#00FF00'; 
        } else if (value <= minGauge + sectionSize * 4) {
        return '#F5CD19'; 
        } else {
        return '#F58B19'; 
        }
    };


    return (

        <>
<div style={{ position: 'relative', display: 'inline-block' }}>
<GaugeComponent
value={currentWeight}
type="radial"
minValue={minGauge}
maxValue={maxGauge}


labels={{
    tickLabels: {
    type: "outer",
    ticks: [
        {label: 'Low' },    
        {label: 'Moderate' },  
        {label: 'Optimal' },   
        {label: 'Moderate' },  
        {label: 'High' }    
    ]
    }
}}


arc={{
    subArcs: [
    {
        length: 20, 
        color: '#F58B19', 
        showTick: true
    },
    {
        length: 20, 
        color: '#F5CD19', 
        showTick: true
    },
    {
        length: 20, 
        color: '#00FF00', 
        showTick: true
    },
    {
        length: 20, 
        color: '#F5CD19', 
        showTick: true
    },
    {
        length: 20, 
        color: '#F58B19', 
        showTick: true
    }
    ],
    padding: 0.02, 
    width: 0.3 
}}


pointer={{
    type: 'arrow', 
    color: getValueColor(currentWeight), 
    baseColor: '#464A4F', 
    length: 0.7, 
    animate: true, 
    elastic: true, 
    width: 20, 
    animationDuration: 3000, 
    animationDelay: 100 
}}
/>
</div>

<div style={{ position: 'absolute', top: '60%', left: '40%', color: '#F58B19', fontSize: '14px' }}>Low</div>
<div style={{ position: 'absolute', top: '40%', left: '38%', color: '#F5CD19', fontSize: '14px' }}>Moderate</div>
<div style={{ position: 'absolute', top: '50%', left: '48.25%', color: '#00FF00', fontSize: '14px'}}>Optimal</div>
<div style={{ position: 'absolute', top: '40%', left: '58%', color: '#F5CD19', fontSize: '14px' }}>Moderate</div>
<div style={{ position: 'absolute', top: '60%', left: '58%', color: '#F58B19', fontSize: '14px' }}>High</div>
        <div className="stats-container">
        <h3>Your current weight: {currentWeight !== null ? currentWeight : 'Loading...'}kg</h3>
        <h3>Your average weight: {averageWeight !== null ? averageWeight : 'Loading...'}kg</h3>
        <h3>Weight difference since 1st input: {weightDifference !== null ? weightDifference : 'Loading...'}kg</h3>
        <h3>Max weight: {maxWeight !== null ? maxWeight : 'Loading...'}kg</h3>
        <h3>Min weight: {minWeight !== null ? minWeight : 'Loading...'}kg</h3>
        </div>

        </>
    );
}




export default WeightLog;