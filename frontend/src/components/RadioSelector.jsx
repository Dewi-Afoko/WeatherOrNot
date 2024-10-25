import { Form } from 'react-bootstrap';
import './RadioSelector.css'; // Custom styles

function RadioSelector(props) {
  
  const formatDisplayOutput = (output) => {
    return output
      .replace('_', ' ') // removes underscores
      .replace(output[0], output[0].toUpperCase()); // capitalizes the first letter
  };

  return (
    <Form.Check 
      type="radio"
      id={props.id}
      name={props.name}
      value={props.value}
      checked={props.checked}
      onChange={props.onChange}
      label={formatDisplayOutput(props.value)} // Format the label output
      className="custom-radio text-center"
    />
  );
}

export default RadioSelector;
