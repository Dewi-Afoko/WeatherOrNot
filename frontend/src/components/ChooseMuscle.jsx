import RadioSelector from "./RadioSelector";
// import { useEffect } from "react";

function ChooseMuscle(props) {

  // const useEffect()

  const muscleOptions = [
    'abdominals', 
    'abductors',
    'adductors',
    'biceps',
    'calves',
    'chest',
    'forearms',
    'glutes',
    'hamstrings',
    'lats',
    'lower_back',
    'middle_back',
    'neck',
    'quadriceps',
    'shoulders',
    'traps',
    'triceps'
  ]

    const handleChange = (event) => {
      props.setMuscle(event.target.value)
    }

  return (
    <div>
      {/* <form> */}
        {muscleOptions.map((muscleOption, index) => {
          return (
            <RadioSelector
              key={index}
              id={muscleOption}
              value={muscleOption}
              name="muscle_group"
              checked={props.muscle === muscleOption}
              onChange={handleChange}
            />
          )
        })}
      {/* </form> */}
    </div>
  );
}
  
export default ChooseMuscle;