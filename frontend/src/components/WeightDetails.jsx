import { Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { weight_details } from '../services/addDetails';
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
            const token = localStorage.getItem('token');
            const data = await weight_details(token,username);
            setCurrentWeight(data[2]);
            setAverageWeight(data[3]);
            setWeightDifference(data[4]);
            setMaxWeight(data[5]);
            setMinWeight(data[6]);

        }

        fetchWeightDetails();
    }, []); 


    const maxGauge = maxWeight ? (maxWeight * 1.5) : 100; 
    const minGauge = minWeight ? (minWeight * 0.5) : 0;    
    
    // Ensure valid sub-arc limits
    const subArcBaseLimit = maxWeight && minWeight ? (((maxWeight * 1.5) - (minWeight * 0.5)) / 5) : 20;  // Default to 20 if invalid
    

    return (
      <>    
        <Card className="p-4 shadow " border="0">
          <Card.Body className="">
            <Card.Title className="display-6 pb-2">Weight Gauge</Card.Title>

      { currentWeight &&( <GaugeComponent
          type="semicircle"
          arc={{
            width: 0.2,
            padding: 0.005,
            cornerRadius: 1,
            subArcs: [
              {
                limit: subArcBaseLimit+minGauge,
                color: '#FF6E00',
                showTick: true,
                tooltip: { text: 'Suggestion: Eat a burger!' },
              },
              {
                limit: (subArcBaseLimit * 2)+minGauge,
                color: '#F5CD19',
                showTick: true,
                tooltip: { text: 'Below your average weight' }
              },
              {
                limit: (subArcBaseLimit * 3)+minGauge,
                color: '#5BE12C',
                showTick: true,
                tooltip: { text: 'Within your average weight range' }
              },
              {
                limit: (subArcBaseLimit * 4)+minGauge,
                color: '#F5CD19',
                showTick: true,
                tooltip: { text: 'Above your average weight' }
              },
              {limit: (subArcBaseLimit * 5)+minGauge,
                color: '#FF6E00',
                tooltip: { text: 'You bulking? Cos you thicc!' }
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
        />)}
        {/* <div className="stats-container">

        <h4>Weight Tracker</h4>

        <h3>Your current weight: {currentWeight !== null ? currentWeight : 'Loading...'}kg</h3>
        <h3>Your average weight: {averageWeight !== null ? averageWeight : 'Loading...'}kg</h3>
        <h3>Weight difference since 1st input: {weightDifference !== null ? weightDifference : 'Loading...'}kg</h3>
        <h3>Max weight: {maxWeight !== null ? maxWeight : 'Loading...'}kg</h3>
        <h3>Min weight: {minWeight !== null ? minWeight : 'Loading...'}kg</h3>
        </div> */}
</Card.Body>
</Card>
        </>
    );
}



export default WeightLog;

