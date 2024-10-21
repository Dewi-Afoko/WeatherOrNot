import RadioSelector from "./RadioSelector";

function ChooseDifficulty(props) {

  const difficultyOptions = [
    'beginner',
    'intermediate',
    'expert'
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
  
export default ChooseDifficulty;