import RadioSelector from "./RadioSelector";
// import { useEffect } from "react";

function ChooseMuscle() {

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

  const formattedMuscles = muscleOptions.map(
    (muscle) => muscle.replace('_', ' ') // removes underscores
  ).map(
    (muscle) => muscle.replace(muscle[0], muscle[0].toUpperCase() //changes to title-case
  ))


  return (
    <div>
      <form>
        {formattedMuscles.map((muscle, index) => {
          return (
            <RadioSelector
              key={index}
              id={muscle}
              value={muscle}
            />
          )
        })}
      </form>
    </div>
  );
}
  
export default ChooseMuscle;