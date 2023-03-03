import React from "react";
import { InputText } from 'primereact/inputtext';

function EmploymentDetails({ formData, setFormData }) {

  return (

    <div className="personal-info-container">
      <div className="grid p-fluid">
        <div className="col-12 lg:col-6">
          <h6>Occupation</h6>
          <InputText value={formData.wizardOccupation} onChange={(event) => setFormData({ ...formData, wizardOccupation: event.target.value })} />
        </div>
      </div>
    </div>

  );
}

export default EmploymentDetails;
