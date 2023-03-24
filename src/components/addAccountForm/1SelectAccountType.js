import React, {useState} from "react";
import { ListBox } from 'primereact/listbox';
import { SelectButton } from 'primereact/selectbutton';

function SelectAccountType({ formData, setFormData }) {

  const accountTypes = [
    { name: 'Savings', code: 'Savings' },
    { name: 'Checking', code: 'Checking' }
  ];

  const [selectButtonValue, setSelectButtonValue] = useState(null);

  return (

    <div className="personal-info-container">
      <div className="field col-12 md:col-4">
        <ListBox id="accountType" value={formData.wizardAccountType} onChange={(event) => setFormData({ ...formData, wizardAccountType: event.target.value } )} options={accountTypes} optionLabel="name"/>
      </div>
    </div>

  );
}

export default SelectAccountType;
