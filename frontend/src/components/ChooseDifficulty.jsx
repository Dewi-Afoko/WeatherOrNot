import RadioSelector from "./RadioSelector";

function ChooseDifficulty(props) {

  const difficultyOptions = [
    'beginner',
    'intermediate',
    'expert'
  ]

  const handleChange = (event) => {
    props.setMuscle(event.target.value)
  }

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
              onChange={handleChange}
            />
          )
        })}
      {/* </form> */}
    </div>
  );
}
  
export default ChooseDifficulty;