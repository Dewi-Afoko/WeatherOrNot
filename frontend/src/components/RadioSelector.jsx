function RadioSelector(props) {

    return (
      <>
        <input
          type="radio"
          id={props.id}
          name="muscle_group"
          value={props.value}
          />
        <label htmlFor={props.id}>
          {props.value}
        </label>      
      </>
    )
  }
  
  export default RadioSelector;