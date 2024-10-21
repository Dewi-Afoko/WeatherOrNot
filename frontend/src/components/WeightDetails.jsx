
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


    const maxGauge = maxWeight ? (maxWeight * 1.5) : 100; 
    const minGauge = minWeight ? (minWeight * 0.5) : 0;    
    
    // Ensure valid sub-arc limits
    const subArcBaseLimit = maxWeight && minWeight ? (((maxWeight * 1.5) - (minWeight * 5)) / 5) : 20;  // Default to 20 if invalid
    

    return (
<>     <div className='weightRule'>
       { currentWeight &&( <GaugeComponent
          type="semicircle"
          arc={{
            width: 0.2,
            padding: 0.005,
            cornerRadius: 1,
            subArcs: [
              {
                limit: subArcBaseLimit,
                color: '#EA4228',
                showTick: true,
                tooltip: { text: 'Too low weight!' },
              },
              {
                limit: subArcBaseLimit * 2,
                color: '#F5CD19',
                showTick: true,
                tooltip: { text: 'Low weight!' }
              },
              {
                limit: subArcBaseLimit * 3,
                color: '#5BE12C',
                showTick: true,
                tooltip: { text: 'OK weight!' }
              },
              {
                limit: subArcBaseLimit * 4,
                color: '#F5CD19',
                showTick: true,
                tooltip: { text: 'High weight!' }
              },
              {
                color: '#EA4228',
                tooltip: { text: 'Too high weight!' }
              }
            ]
          }}
          pointer={{
            color: '#345243',
            length: 0.80,
            width: 15,
          }}
          labels={{
            valueLabel: { formatTextValue: value => value + 'Kg' },
            tickLabels: {
              type: 'outer',
              valueConfig: { formatTextValue: value => value + 'Kg', fontSize: 10 },
              
            }
          }}
          value={currentWeight}
          minValue={minGauge}
          maxValue={maxGauge}
        />)}</div>
        <div className="stats-container">
        <h4>WEIGHT TRACKER</h4>
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

