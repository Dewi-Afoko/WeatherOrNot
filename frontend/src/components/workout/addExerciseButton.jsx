import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { UpdateWorkout } from './updateWorkout';

function AddExerciseButton(props) {
  const [detailsOn, setDetailsOn] = useState(false);

  const handleClick = () => {
    setDetailsOn(true);
  };

  const handleClose = () => {
    setDetailsOn(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleClick}>
        Add to current workout
      </Button>
      <Modal show={detailsOn} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Exercise details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateWorkout close={handleClose} exercise={props.exercise} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddExerciseButton;