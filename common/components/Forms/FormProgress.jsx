import React from "react";

function FormProgress({ completedJournal, completedDetails }) {
  if (completedDetails) {
    return (
      <ul className="steps">
        <li className="step step-primary">Registered</li>
        <li className="step step-primary">Complete Details</li>
        <li className="step">Completed Calorie Journal</li>
        <li className="step">Enjoy!</li>
      </ul>
    );
  } else if (completedJournal) {
    return (
      <ul className="steps">
        <li className="step step-primary">Registered</li>
        <li className="step step-primary">Completed Details</li>
        <li className="step step-primary">Completed Calorie Journal</li>
        <li className="step">Enjoy!</li>
      </ul>
    );
  } else {
    return (
      <ul className="steps">
        <li className="step step-primary">Registered</li>
        <li className="step">Completed Details</li>
        <li className="step">Completed Calorie Journal</li>
        <li className="step">Enjoy!</li>
      </ul>
    );
  }
}

export default FormProgress;
