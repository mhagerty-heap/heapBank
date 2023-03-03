import React from "react";
import { SelectButton } from 'primereact/selectbutton';
import { Dropdown } from 'primereact/dropdown';


function RegulatoryQuestions({ formData, setFormData }) {

  const savingsWithholdingOptions = ['No', 'Yes'];
  const savingsDisclosureAgreement = ['No', 'Yes'];

  const savingsSourceOfNetWorthOptions = [
    {label: 'Employment', value: 'Employment'},
    {label: 'Inheritance', value: 'Inheritance'},
  ];

  const savingsExpectedUseOfAccountOptions = [
    {label: 'Savings', value: 'Savings'},
    {label: 'Transfers', value: 'Transfers'},
    {label: 'Bills', value: 'Bills'},
  ];

  const savingsAccountUsageFrequencyOptions = [
    {label: '1-2 Times a Week', value: '1-2 Times a Week'},
    {label: '5-10 Times a Week', value: '5-10 Times a Week'},
    {label: 'Less than Once a Week', value: 'Less than Once a Week'},
  ];

  return (

    <div className="personal-info-container">
      <div className="grid p-fluid">

        <div className="col-12 lg:col-6">
          <h6>Backup Withholding?</h6>
          <SelectButton value={formData.wizardWithholding} options={savingsWithholdingOptions} onChange={(event) => setFormData({ ...formData, wizardWithholding: event.value } )}></SelectButton>
        </div>
        <div className="col-12 lg:col-6">
          <h6>Source of Net Worth</h6>
          <Dropdown value={formData.wizardSourceOfNetWorth} options={savingsSourceOfNetWorthOptions} onChange={(event) => setFormData({ ...formData, wizardSourceOfNetWorth: event.value } )} placeholder="Select an Answer"/>
        </div>
        <div className="col-12 lg:col-6">
          <h6>Expected Use of Account</h6>
          <Dropdown value={formData.wizardExpectedUseOfAccount} options={savingsExpectedUseOfAccountOptions} onChange={(event) => setFormData({ ...formData, wizardExpectedUseOfAccount: event.value } )} placeholder="Select an Answer"/>
        </div>
        <div className="col-12 lg:col-6">
          <h6>Account Usage Frequency</h6>
          <Dropdown value={formData.wizardAccountUsageFrequency} options={savingsAccountUsageFrequencyOptions} onChange={(event) => setFormData({ ...formData, wizardAccountUsageFrequency: event.value } )} placeholder="Select an Answer"/>
        </div>


      </div>
    </div>

  );
}

export default RegulatoryQuestions;
