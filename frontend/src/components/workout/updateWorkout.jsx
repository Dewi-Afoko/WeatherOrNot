import { useState } from "react";
import { update_workout } from "../../services/addDetails";
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';

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
        <div key={index} className="mb-3">
            <Form.Group controlId={`loading-${index}`}>
                <Form.Label>Loading (kg):</Form.Label>
                <Form.Control
                    placeholder="Input Loading here"
                    type="number"
                    value={loading[index] || ''}
                    onChange={(e) => handleLoadingChange(index, e.target.value)}
                />
            </Form.Group>
            
            <Form.Group controlId={`reps-${index}`}>
                <Form.Label>Reps:</Form.Label>
                <Form.Control
                    placeholder="Input reps here"
                    type="number"
                    value={rep || ''}
                    onChange={(e) => handleRepsChange(index, e.target.value)}
                />
            </Form.Group>
        </div>
    ))}
    
    <Button variant="secondary" onClick={addRepField} className="mb-3">
        Add another set?
    </Button>
    
    <Button type="submit" variant="primary">
        Add reps and loading to current workout
    </Button>
</form>
        </>
    );
}

