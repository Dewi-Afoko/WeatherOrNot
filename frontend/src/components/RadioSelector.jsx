function RadioSelector(props) {

  const formatDisplayOutput = (output) => {
    return output
        .replace('_', ' ') // removes underscores
        .replace(output[0], output[0].toUpperCase()); //changes to title-case
  };

    return (
      <>
        <input
          type="radio"
          id={props.id}
          name={props.name}
          value={props.value}
          checked={props.checked}
          onChange={props.onChange}
        />
        <label htmlFor={props.id}>
          {formatDisplayOutput(props.value)}
        </label>      
      </>
    )
  }
  
  export default RadioSelector;