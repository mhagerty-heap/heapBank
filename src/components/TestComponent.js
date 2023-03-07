import React, { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import SelectAccountType from "./addAccountForm/1SelectAccountType";
import JointOrIndividual from "./addAccountForm/2JointOrIndividual";
import ContactInformation from "./addAccountForm/3ContactInformation";
import EmploymentDetails from "./addAccountForm/4EmploymentDetails";
import BankInvestmentProfile from "./addAccountForm/5BankInvestmentProfile";
import RegulatoryQuestions from "./addAccountForm/6RegulatoryQuestions";
import Disclosures from "./addAccountForm/7Disclosures";
import SubmitAddAccount from "./addAccountForm/8SubmitAddAccount";
import axios from 'axios';


const AddAccounts = () => {

  const [checked, setChecked] = useState(null);

  const onCheckingButtonClick = (e) => {
  };

    return (
      <div className="flex align-items-center justify-content-center">
          <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
              <div className="text-center mb-5">
                  <img src="assets/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" />
                  <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
              </div>

              <div>
                  <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                  <InputText id="email" type="text" placeholder="Email address" className="w-full mb-3" />

                  <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                  <InputText id="password" type="password" placeholder="Password" className="w-full mb-3" />

                  <div className="flex align-items-center justify-content-between mb-6">
                      <div className="flex align-items-center">
                          <Checkbox id="rememberme" onChange={e => setChecked(e.checked)} checked={checked} className="mr-2" />
                          <label htmlFor="rememberme">Remember me</label>
                      </div>
                  </div>

                  <Button label="Sign In" icon="pi pi-user" className="w-full" />
              </div>
          </div>
      </div>


    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(AddAccounts, comparisonFn);
