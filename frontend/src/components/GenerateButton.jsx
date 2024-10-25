import { Button } from 'react-bootstrap';
import './GenerateButton.css'; // Importing custom styles

function GenerateButton() {
  return (
    <>
      <Button variant="primary" size="lg" type="submit" className="generate-button fw-bold btn-primary">
        -GENERATE-
      </Button>
    </>
  );
}

export default GenerateButton;