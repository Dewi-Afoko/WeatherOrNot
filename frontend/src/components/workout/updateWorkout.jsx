import { useState } from "react";
import { update_workout } from "../../services/addDetails";
import { useNavigate } from "react-router-dom";

export function UpdateWorkout(props) {
    const [loading, setLoading] = useState(['']);  
    const [reps, setReps] = useState(['']); 
    const navigate = useNavigate();
      
    async function handleSubmit(event) {
        event.preventDefault(); 
        try {
            const workout = { 
                exercise: props.exercise,  
                loading:loading,  
                reps:reps   
                };  
            console.log(workout)   
            await update_workout(workout);
            props.close()
            //navigate(0); 
        } catch (err) {
            console.error(err);  
            navigate("/login");  
        }
    }

    function handleRepsChange(index, value) {
        const newReps = [...reps];
        newReps[index] = value;  
        setReps(newReps);
        console.log(reps)  
    }

    function handleLoadingChange(index, value) {
        const newLoadings = [...loading];
        newLoadings[index] = value;  
        setLoading(newLoadings);  
        console.log(loading)
    }

    function addRepField() {
        setReps([...reps, '']); 
        setLoading([...loading, '']); 
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {reps.map((rep, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <label htmlFor={`loading-${index}`}>Loading (kg):</label>
                        <input
                            placeholder="Input Loading here"
                            id={`loading-${index}`}
                            type="number"
                            value={loading[index] || ''}
                            onChange={(e) => handleLoadingChange(index, e.target.value)}
                        />
                        
                        <label htmlFor={`reps-${index}`}>Reps:</label>
                        <input
                            placeholder="Input reps here"
                            id={`reps-${index}`}
                            type="number"
                            value={rep || ''}
                            onChange={(e) => handleRepsChange(index, e.target.value)}
                        />
                    </div>
                ))}
                
                <button type="button" onClick={addRepField}>
                    Add another set?
                </button>
                
                <input role="submit-button" id="submit" type="submit" value="Add reps and loading to current workout" />
            </form>
        </>
    );
}

