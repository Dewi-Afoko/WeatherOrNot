function RadioSelector(props) {

    return (
      <>
        <input
          type="radio"
          id={props.id}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          />
        <label htmlFor={props.id}>
          {props.value}
        </label>      
      </>
    )
  }
  
  export default RadioSelector;