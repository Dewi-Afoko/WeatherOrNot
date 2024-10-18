import RadioSelector from "./RadioSelector";
// import { useEffect } from "react";

function ChooseMuscle(props) {

  // const useEffect()

  const difficultyOptions = [
    'beginner',
    'intermediate'
  ]


  return (
    <div>
      {/* <form> */}
        {difficultyOptions.map((difficulty, index) => {
          return (
            <RadioSelector
              key={index}
              id={difficulty}
              value={difficulty}
              name="difficulty_group"
              onChange={() => props.setDifficulty(difficulty)}
            />
          )
        })}
      {/* </form> */}
    </div>
  );
}
  
export default ChooseMuscle;