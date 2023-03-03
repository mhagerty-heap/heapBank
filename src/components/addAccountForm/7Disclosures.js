import React from "react";
import { RadioButton } from 'primereact/radiobutton';

function Disclosures({ formData, setFormData }) {

  return (

    <div className="personal-info-container">

    <div className="grid p-fluid">
      <div className="col-12">
        <p>
        This Deposit Agreement and Disclosures, the applicable Schedule of Fees, the signature card and
        other account opening documents for your account are part of the binding contract between you and
        us (this “Agreement”) for your deposit account and your deposit relationship with us. They contain
        the terms of our agreement with you. Please read all of these documents carefully.
        This Deposit Agreement and Disclosures also summarizes certain laws and regulations that apply to
        common transactions, provides some disclosures for deposit accounts required by federal law, and
        establishes terms that cover some transactions or situations that the law either does not cover or
        allows us to change by this contract.
        </p>
      </div>
      <div className="col-12 lg:col-6">
        <h5> Do you agree with these disclosures?</h5>
        <div className="field-radiobutton">
          <RadioButton inputId="checkingDisclosureYes" name="checkingAccountDisclosure" value="Yes" onChange={(event) => setFormData({ ...formData, wizardAccountDisclosure: event.value } )} checked={formData.wizardAccountDisclosure === 'Yes'} />
          <label htmlFor="individual">Yes</label>
        </div>
        <div className="field-radiobutton">
          <RadioButton inputId="checkingDisclosureNo" name="checkingAccountDisclosure" value="No" onChange={(event) => setFormData({ ...formData, wizardAccountDisclosure: event.value } )} checked={formData.wizardAccountDisclosure === 'No'} />
          <label htmlFor="joint">No</label>
        </div>


      </div>
    </div>


    </div>

  );
}

export default Disclosures;
