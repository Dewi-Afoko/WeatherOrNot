import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Questions from './questions';

function PreferenceTest({ onClose, show }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Preference Test</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Questions />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PreferenceTest;