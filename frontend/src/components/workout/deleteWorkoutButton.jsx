import  { useState} from 'react';
import { delete_workout } from '../../services/addDetails';
import { useNavigate } from 'react-router-dom';


function DeleteExerciseButton(props) {

    const navigate = useNavigate()

  const handleClick = () => {
    delete_workout(props.id)
    localStorage.removeItem('WorkoutOpen')
    navigate(0)
  };

  return (
    <>
      <button className='test-button1' onClick={handleClick}>DELETE WORKOUT</button>
    </>
  );
}

export default DeleteExerciseButton;