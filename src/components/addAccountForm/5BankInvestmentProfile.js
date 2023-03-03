import React from "react";
import { Dropdown } from 'primereact/dropdown';

function BankInvestmentProfile({ formData, setFormData }) {

  const savingsSelectAnnualIncomeItems = [
    {label: '0-50k', value: '0-50k'},
    {label: '50k-100k', value: '50k-100k'},
    {label: '100k-250k', value: '100k-250k'},
    {label: '250k-1mil', value: '250k-1mil'},
    {label: '1mil+', value: '1mil+'}
  ];

  const savingsSelectNetWorthItems = [
    {label: '0-50k', value: '0-50k'},
    {label: '50k-100k', value: '50k-100k'},
    {label: '100k-250k', value: '100k-250k'},
    {label: '250k-1mil', value: '250k-1mil'},
    {label: '1mil+', value: '1mil+'}
  ];

  return (

    <div className="personal-info-container">
      <div className="grid p-fluid">

        <div className="col-12 lg:col-6">
          <h6>Annual Income</h6>
          <Dropdown value={formData.wizardSelectAnnualIncome} options={savingsSelectAnnualIncomeItems} onChange={(event) => setFormData({ ...formData, wizardSelectAnnualIncome: event.value } )} placeholder="Select an Answer"/>
        </div>
        <div className="col-12 lg:col-6">
          <h6>Total Net Worth</h6>
          <Dropdown value={formData.wizardSelectNetWorth} options={savingsSelectAnnualIncomeItems} onChange={(event) => setFormData({ ...formData, wizardSelectNetWorth: event.value } )} placeholder="Select an Answer"/>
        </div>

      </div>
    </div>

  );
}

export default BankInvestmentProfile;
