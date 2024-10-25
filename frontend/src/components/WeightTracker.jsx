import { Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { weight_details } from '../services/addDetails';
import './weightdetails.css'

export function WeightTracker() {
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


    

    return (
        <>    
            <Card className="p-4 shadow " border="0">
                <Card.Body>
                    <Card.Title className="display-6 pb-2">Weight Tracker</Card.Title>
                        <hr/>
                        <p>Your current weight: {currentWeight !== null ? currentWeight : 'Loading...'}kg</p>
                        <hr/>
                        <p>Your average weight: {averageWeight !== null ? averageWeight : 'Loading...'}kg</p>
                        <hr/>
                        <p>Weight difference since 1st input: {weightDifference !== null ? weightDifference : 'Loading...'}kg</p>
                        <hr/>
                        <p>Max weight: {maxWeight !== null ? maxWeight : 'Loading...'}kg</p>
                        <hr/>
                        <p>Min weight: {minWeight !== null ? minWeight : 'Loading...'}kg</p>
                        <hr/>
                </Card.Body>
            </Card>
        </>
    );
}



export default WeightTracker;