import  { useState} from 'react';
import { delete_workout } from '../../services/addDetails';
import { useNavigate } from 'react-router-dom';


function DeleteExerciseButton(props) {

    const navigate = useNavigate()

    const handleClick = () => {
      const date = new Date();
      let dateString = date.toLocaleDateString().split("/").reverse().join("/");
      delete_workout(props.id)
      console.log(`This line:${dateString}`)
      console.log(`This line:${props.date}`)
      if (props.date === dateString)
      {localStorage.removeItem('WorkoutOpen')}
      navigate(0)
    };

  return (
    <>
      <button className='test-button1' onClick={handleClick}>DELETE WORKOUT</button>
    </>
  );
}

export default DeleteExerciseButton;


