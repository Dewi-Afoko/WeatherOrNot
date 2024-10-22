import React from 'react';
import './preferencetest.css';
import Questions from './questions';
function PreferenceTest({ onClose }) {
    
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h3>Preference Test</h3>
        <Questions/>
      </div>
    </div>
  );
}

export default PreferenceTest;