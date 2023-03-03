import React from "react";
import { InputText } from 'primereact/inputtext';

function ContactInformation({ formData, setFormData }) {

  return (

    <div className="personal-info-container">
      <div className="grid p-fluid">
        <div className="col-12 lg:col-6">
          <h6>First Name</h6>
          <InputText value={formData.wizardFirstName} onChange={(event) => setFormData({ ...formData, wizardFirstName: event.target.value } )} />
        </div>
        <div className="col-12 lg:col-6">
          <h6>Last Name</h6>
          <InputText value={formData.wizardLastName} onChange={(event) => setFormData({ ...formData, wizardLastName: event.target.value } )} />
        </div>
        <div className="col-12 lg:col-6">
          <h6>Middle Initial</h6>
          <InputText value={formData.wizardMiddleInitial} onChange={(event) => setFormData({ ...formData, wizardMiddleInitial: event.target.value } )} />
        </div>
        <div className="col-12 lg:col-6">
          <h6>Phone Number</h6>
          <InputText value={formData.wizardPhoneNumber} onChange={(event) => setFormData({ ...formData, wizardPhoneNumber: event.target.value } )} />
        </div>
        <div className="col-12 lg:col-6">
          <h6>Email Address</h6>
          <InputText value={formData.wizardEmailAddress} onChange={(event) => setFormData({ ...formData, wizardEmailAddress: event.target.value } )} />
        </div>
    </div>
  </div>
  );
}

export default ContactInformation;
