import RadioSelector from "./RadioSelector";

function ChooseDifficulty(props) {

  const difficultyOptions = [
    'beginner',
    'intermediate',
    'expert'
  ]

  const handleChange = (event) => {
    props.setDifficulty(event.target.value)
  }

  return (
    <div>
      {/* <form> */}
        {difficultyOptions.map((difficultyOption, index) => {
          return (
            <RadioSelector
              key={index}
              id={difficultyOption}
              value={difficultyOption}
              name="difficulty_group"
              checked={props.difficulty === difficultyOption}
              onChange={handleChange}
            />
          )
        })}
      {/* </form> */}
    </div>
  );
}
  
export default ChooseDifficulty;