import React from "react";
import { ListBox } from 'primereact/listbox';

function OtherInfo({ formData, setFormData }) {

  const otherFinancialInterestItems = [
    {label: 'Stocks', value: 'stocks'},
    {label: 'Bonds', value: 'bonds'},
    {label: '401k', value: '401k'},
    {label: 'Credit Cards', value: 'creditCards'},
    {label: 'Interest Rates', value: 'interestRates'}
  ];

  return (

    <div className="personal-info-container">
      <div className="field col-12 md:col-4">

        <ListBox multiple value={formData.otherFinancialInterests} options={otherFinancialInterestItems} onChange={(e) => setFormData({ ...formData, otherFinancialInterests: e.target.value })} />
      </div>
    </div>

  );
}

export default OtherInfo;
