import React, {useState} from "react";
import { ListBox } from 'primereact/listbox';
import { SelectButton } from 'primereact/selectbutton';


function JointOrIndividual({ formData, setFormData }) {

  const accountIndOrJoint = [
    { name: 'Individual', value: 'Individual'},
    { name: 'Joint', value: 'Joint', constant: true }
  ];

  const selectButtonaccountIndOrJoint = ['Individual', 'Joint'];

  const [selectButtonValue, setSelectButtonValue] = useState("null");

  return (

    <div className="personal-info-container">
      <div className="grid p-fluid">
        <div className="col-12 lg:col-6">
          <SelectButton value={formData.wizardAccountIndOrJoint} optionLabel="name" options={accountIndOrJoint} onChange={(event) => setFormData({ ...formData, wizardAccountIndOrJoint: event.value } )}></SelectButton>
        </div>
      </div>
    </div>

  );
}

export default JointOrIndividual;
