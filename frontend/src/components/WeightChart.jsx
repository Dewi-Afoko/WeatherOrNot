import { useState, useEffect } from 'react';

import { weight_details } from "../services/adddetails";
import { VictoryChart, VictoryScatter, VictoryTheme, VictoryTooltip, VictoryAnimation } from 'victory';
import { Card } from 'react-bootstrap';

import './weightdetails.css';

export function WeightChart() {

    const [maxWeight, setMaxWeight] = useState(0);
    const [minWeight, setMinWeight] = useState(0);
    const [graphData, SetGraphData] = useState([]);
    //const [dateArray, setDateArray] = useState([]);
    const [weightArray, setWeightArray] = useState([]);

    useEffect(() => {
        async function fetchWeightDetails() {
            try {
                const username = localStorage.getItem('username');
                const token = localStorage.getItem('token')
                const data = await weight_details(token, username);
                const weightArray = data[0];
                const dateArray = data[1];
            
                setWeightArray(weightArray);
                //setDateArray(dateArray);

                const graphDataJSON = dateArray.map((date, index) => ({
                    x: date,  
                    y: weightArray[index] 
                }));
                SetGraphData(graphDataJSON);
                setMaxWeight(data[5]);
                setMinWeight(data[6]);
                console.log(weightArray)
            } catch (error) {
                console.error('Error fetching weight details:', error);
            }
        }

        fetchWeightDetails();
    }, []); 

    return (
        <>
        <Card className="p-4 shadow " border="0">
            <Card.Body>
                <Card.Title className="display-6 pb-2">Weight Chart</Card.Title>
                {graphData.length > 0 && (
                    <VictoryChart
                        theme={VictoryTheme.material}
                        domain={{ x: [0, weightArray.length], y: [minWeight - 25, maxWeight + 25] }}
                        style={{
                            parent: { backgroundColor: "#cfcfcf" } // Set background for the chart
                        }}
                    >
                        <VictoryScatter
                            animate={{
                                duration: 2000,
                                onLoad: { duration: 1000 }
                            }}
                            style={{ data: { fill: "#c43a31" } }}
                            size={9}
                            data={graphData} 
                            labels={({ datum }) => `Weight: ${datum.y} kg, Date: ${datum.x}`} 
                            labelComponent={<VictoryTooltip flyoutStyle={{ fill: "black" }} />}
                        />
                    </VictoryChart>
                )}
                {graphData.length === 0 && (
                    <p>No data available to display the chart.</p>
                )}
            </Card.Body>
        </Card>
        </>
    );
}

export default WeightChart;
