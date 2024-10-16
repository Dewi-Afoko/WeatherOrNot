function ChooseMuscle() {

  const muscle_options = [
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
    'traps',
    'triceps'
  ]

    return (
      <div>
        <h1>Muscle Options</h1>
        <form>
          {muscle_options.map(muscle => 
          <div>
            <input type="radio" id={muscle} name="muscle_group" value={muscle}></input>
            <label htmlFor={muscle}>{muscle}</label></div>)}
        </form>
        </div>
    );
  };
  
  export default ChooseMuscle;