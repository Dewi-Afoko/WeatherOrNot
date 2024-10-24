import { Button } from 'react-bootstrap';
import './GenerateButton.css'; // Importing custom styles

function GenerateButton() {
  return (
    <>
      <Button variant="success" size="lg" type="submit" className="generate-button fw-bold">
        GENERATE
      </Button>
    </>
  );
}

export default GenerateButton;