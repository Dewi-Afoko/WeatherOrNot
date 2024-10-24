import  { useState } from 'react';
import './addExerciseButton.css';
import { UpdateWorkout } from './updateWorkout';

function AddExerciseButton(props) {
  const [detailsOn, setDetailsOn] = useState(false);

  const handleClick = () => {
    setDetailsOn(true);
  };

  const handleClose = () => {
    setDetailsOn(false);
  };

  return (
    <>
      <button className='test-button1' onClick={handleClick}>Add exercise to current workout</button>
      {detailsOn && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleClose}>&times;</span>
            <h3>Exercise details</h3>
            {/* Directly pass the string value of exercise to UpdateWorkout */}
            <UpdateWorkout close={handleClose} exercise={props.exercise}/>
          </div>
        </div>
      )}
    </>
  );
}

export default AddExerciseButton;
