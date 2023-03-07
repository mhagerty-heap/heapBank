import React from "react";
import { ListBox } from 'primereact/listbox';

function SubmitAddAccount({ formData, setFormData }) {

  const otherFinancialInterestItems = [
    {label: 'IT Assets', value: 'itAssets'},
    {label: 'Ticket Routing', value: 'ticketRouting'},
    {label: 'Automated Workflow', value: 'automatedWorkflow'},
    {label: 'Technical Articles', value: 'technicalArticles'},
    {label: 'Release Notes', value: 'releaseNotes'}
  ];

  return (

    <div className="personal-info-container">
      <div className="field col-12 md:col-12">
        <b>Please review your answers.  If you are satisfied with your answers, please select the Finish button below. Account access may take up to 14 days.</b>
      </div>
    </div>

  );
}

export default SubmitAddAccount;
