import { useState, useEffect } from 'react';
import { weight_details } from "../services/adddetails";
import { VictoryChart, VictoryScatter, VictoryTheme, VictoryTooltip, VictoryAnimation } from 'victory';

import './weightdetails.css';

export function WeightChart() {

    const [maxWeight, setMaxWeight] = useState(0);
    const [minWeight, setMinWeight] = useState(0);
    const [graphData, SetGraphData] = useState([]);
    const [dateArray, setDateArray] = useState([]);
    const [weightArray, setWeightArray] = useState([]);

    useEffect(() => {
        async function fetchWeightDetails() {
            try {
                const username = localStorage.getItem('username');
                const data = await weight_details(username);
                const weightArray = data[0];
                const dateArray = data[1];
            
                setWeightArray(weightArray);
                setDateArray(dateArray);

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
        {graphData.length > 0 && (
            <VictoryChart
                theme={VictoryTheme.material}
                domain={{ x: [0, weightArray.length], y: [minWeight, maxWeight] }}
                style={{
                    parent: { backgroundColor: "#000" }  // Set black background for the chart
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
                labels={({ datum }) => `${datum.y} kg, 
                Weigh in number: ${datum.x}`} 
                labelComponent={<VictoryTooltip flyoutStyle={{ fill: "white" }}/>}
                />
            </VictoryChart>
        )}
        </>
    );
}

export default WeightChart;
