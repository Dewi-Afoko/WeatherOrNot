import RadioSelector from "./RadioSelector";

function ChooseEquipment(props) {

  const equipmentOptions = [
    'barbell',
    'dumbbell',
    'machine',
    'other'

  ]

  const handleChange = (event) => {
    props.setEquipment(event.target.value)
  }

  return (
    <div>
      {/* <form> */}
        {equipmentOptions.map((equipmentOption, index) => {
          return (
            <RadioSelector
              key={index}
              id={equipmentOption}
              value={equipmentOption}
              name="equipment_group"
              checked={props.equipment === equipmentOption}
              onChange={handleChange}
            />
          )
        })}
      {/* </form> */}
    </div>
  );
}
  
export default ChooseEquipment;