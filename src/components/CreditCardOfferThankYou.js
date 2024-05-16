import React, { useRef, useState } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import axios from 'axios';

const CreditCardOffer = () => {
  const [applicantFirstName, setApplicantFirstName] = useState('')
  const [applicantLastName, setApplicantLastName] = useState('')
  const [applicantMiddleInitial, setApplicantMiddleInitial] = useState('')
  const [applicantDateOfBirth, setApplicantDateOfBirth] = useState('')
  const [applicantPhoneNumber, setApplicantPhoneNumber] = useState('')
  const [applicantEmailAddress, setApplicantEmailAddress] = useState('')

  const [applicantStreetAddress, setApplicantStreetAddress] = useState('')
  const [applicantCity, setApplicantCity] = useState('')
  const [applicantState, setApplicantState] = useState('')
  const [applicantZipCode, setApplicantZipCode] = useState('')
  const [applicantCountry, setApplicantCountry] = useState('')

  const [applicantHomeownerRenter, setApplicantHomeownerRenter] = useState('')
  const [applicantGrossMonthlyIncome, setApplicantGrossMonthlyIncome] = useState('')
  const [applicantPaymentMonthly, setApplicantPaymentMonthly] = useState('')


  const onSubmitApplicationSuccessMessage = useRef(null);
  const onSubmitApplicationFailMessage = useRef(null);

  const onSubmitApplication = (e) => {
    e.preventDefault(); // prevents page from reloading
    const apiErrorPercentage = Math.floor(Math.random() * 101);
    console.log("apiErrorPercentage (>=40 = success) = " + apiErrorPercentage);
    if (applicantFirstName && applicantLastName && applicantDateOfBirth && applicantPhoneNumber && applicantEmailAddress && applicantStreetAddress && applicantCity && applicantState && applicantZipCode && applicantCountry && (apiErrorPercentage >= 40)) {
        onSubmitApplicationSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: 'Credit Card Application Submitted for Processing'});
    } else if (applicantFirstName && applicantLastName && (apiErrorPercentage < 40)){
        axios.get("https://my.api.mockaroo.com/getApiData.json?key=17612760");
        onSubmitApplicationFailMessage.current.show({severity: 'error', summary: 'Error:', detail: 'API Error'});
    } else {
        onSubmitApplicationFailMessage.current.show({severity: 'error', summary: 'Error:', detail: 'Please enter all Required fields.'});
    }
  };


    return (
        <div className="grid p-fluid">
            <div className="col-12">
                <div className="card lg:col-6">
                  <h5><b>Thank you for Applying for the BankOne Credit Card!</b></h5>
                  <h5>We'll be following up with you shortly regarding your application.</h5>
                  <img src="./images/creditCardOffer/creditCard.png" width="250" height="150" alt="image" />
                </div>
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(CreditCardOffer, comparisonFn);
