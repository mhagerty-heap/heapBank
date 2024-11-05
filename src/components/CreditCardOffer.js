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
    //console.log("apiErrorPercentage (>=20 = success) = " + apiErrorPercentage);
    if (applicantFirstName == "forcedApiError") { //added forced error by entering specific value in firstName
      axios.post(`https://run.mocky.io/v3/565efd39-8689-4b5d-98ea-f6fed47f1c51`);
      onSubmitApplicationFailMessage.current.show({severity: 'error', summary: 'Error: ', detail: 'There was a problem with your submission'});  
    } else if (applicantFirstName && applicantLastName && applicantDateOfBirth && applicantPhoneNumber && applicantEmailAddress && applicantStreetAddress && applicantCity && applicantState && applicantZipCode && applicantCountry && (apiErrorPercentage >= 30)) {
        onSubmitApplicationSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: 'Credit Card Application Submitted...Please wait.'});
        setTimeout(function() {
          window.location.replace('/creditCardOfferThankYou');
        }, 1000);
    } else if (applicantFirstName && applicantLastName && (apiErrorPercentage < 30)){
        console.log("apiErrorPercentage (<30 = apiFailure) = " + apiErrorPercentage)
        //axios.get("https://my.api.mockaroo.com/creditCardOffer.json?key=17612760");

        //axios.post(`https://my.api.mockaroo.com/creditCardOffer.json`, null, { params: {key: "17612760"}});
        axios.post(`https://run.mocky.io/v3/565efd39-8689-4b5d-98ea-f6fed47f1c51`);
        onSubmitApplicationFailMessage.current.show({severity: 'error', summary: 'Error:', detail: 'API Error'});
    } else {
        onSubmitApplicationFailMessage.current.show({severity: 'error', summary: 'Error:', detail: 'Please enter all Required fields.'});
    }
  };


    return (
        <div className="grid p-fluid">
            <div className="col-12">
                <div className="card lg:col-6">
                  <h5><b>Congratulations!</b></h5>
                  <h5>We're offering you a Low Interest Credit Card!</h5>
                  <h6>Would you be interested in a credit card with <b>Money Back</b>?</h6>
                  <h6>Complete the form below and we'll take care of the rest!</h6>
                  <img src="./images/creditCardOffer/creditCard.png" width="250" height="150" alt="image" />
                </div>
                    <div className="card" id="savings">
                      <form onSubmit={onSubmitApplication}>
                        <div className="card">
                          <div className="grid p-fluid">
                            <div className="col-12">
                              <h5 id="personalContactInformationHeader">Personal Contact Information</h5>
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>First Name (Required)</h6>
                              <InputText id="applicantFirstName" value={applicantFirstName} onChange={(e) => setApplicantFirstName(e.target.value)} />
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>Last Name (Required)</h6>
                              <InputText id="applicantLastName" value={applicantLastName} onChange={(e) => setApplicantLastName(e.target.value)} />
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>Middle Initial</h6>
                              <InputText id="applicantMiddleInitial" value={applicantMiddleInitial} onChange={(e) => setApplicantMiddleInitial(e.target.value)} />
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>Date of Birth (Required, mm/dd/yyyy)</h6>
                              <InputText id="applicantDateOfBirth" value={applicantDateOfBirth} onChange={(e) => setApplicantDateOfBirth(e.target.value)} />
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>Phone Number (Required)</h6>
                              <InputText id="applicantPhoneNumber" value={applicantPhoneNumber} onChange={(e) => setApplicantPhoneNumber(e.target.value)} />
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>Email Address (Required)</h6>
                              <InputText id="applicantEmailAddress" value={applicantEmailAddress} onChange={(e) => setApplicantEmailAddress(e.target.value)} />
                            </div>
                          </div>
                        </div>

                        <div className="card">
                          <div className="grid p-fluid">
                            <div className="col-12">
                              <h5 id="personalAddressInformationHeader">Personal Address Information</h5>
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>Street Address (Required)</h6>
                              <InputText id="applicantStreetAddress" value={applicantStreetAddress} onChange={(e) => setApplicantStreetAddress(e.target.value)} />
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>City (Required)</h6>
                              <InputText id="applicantCity" value={applicantCity} onChange={(e) => setApplicantCity(e.target.value)} />
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>State (Required)</h6>
                              <InputText id="applicantState" value={applicantState} onChange={(e) => setApplicantState(e.target.value)} />
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>Zip Code (Required)</h6>
                              <InputText id="applicantZipCode" value={applicantZipCode} onChange={(e) => setApplicantZipCode(e.target.value)} />
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>Country (Required)</h6>
                              <InputText id="applicantCountry" value={applicantCountry} onChange={(e) => setApplicantCountry(e.target.value)} />
                            </div>
                          </div>
                        </div>

                        <div className="card">
                          <div className="grid p-fluid">
                            <div className="col-12">
                              <h5 id="personalFinancialInformationHeader">Personal Financial Information</h5>
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>Homeowner or Renter?</h6>
                              <InputText id="applicantHomeownerRenter" value={applicantHomeownerRenter} onChange={(e) => setApplicantHomeownerRenter(e.target.value)} />
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>Gross Monthly Income</h6>
                              <InputText id="applicantGrossMonthlyIncome" value={applicantGrossMonthlyIncome} onChange={(e) => setApplicantGrossMonthlyIncome(e.target.value)} />
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>Mortgage/Rent Payment Monthly</h6>
                              <InputText id="applicantPaymentMonthly" value={applicantPaymentMonthly} onChange={(e) => setApplicantPaymentMonthly(e.target.value)} />
                            </div>
                          </div>
                        </div>

                        <div className="card">
                          <div className="grid p-fluid">
                            <div className="col-12">
                              <h5 id="disclosures">Disclosures</h5>
                            </div>
                            <div id="disclosureText" className="col-12">
                              This Credit Card Agreement and Disclosures, the applicable Schedule of Fees, the signature card and
                              other account opening documents for your account are part of the binding contract between you and
                              us (this “Agreement”) for your deposit account and your deposit relationship with us. They contain
                              the terms of our agreement with you. Please read all of these documents carefully.
                              This Credit Card Agreement and Disclosures also summarizes certain laws and regulations that apply to
                              common transactions, provides some disclosures for deposit accounts required by federal law, and
                              establishes terms that cover some transactions or situations that the law either does not cover or
                              allows us to change by this contract.  This is not a real bank, this is not a real credit card.  This
                              for demo purposes only.
                            </div>
                          </div>
                        </div>

                        <div className="card">
                          <div className="grid p-fluid">
                            <div className="col-12">
                              <h5>Submit Application</h5>
                              <div className="col-2">
                                <Button id="submitApplication" label="Submit Application" type="submit" icon="pi pi-check-square" className="p-button-success"></Button>
                              </div>
                              <div>
                                  <Messages ref={onSubmitApplicationSuccessMessage} />
                                  <Messages ref={onSubmitApplicationFailMessage} />
                              </div>
                            </div>
                            <div className="col-12">

                            </div>
                          </div>
                        </div>





                      </form>
                  </div>
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(CreditCardOffer, comparisonFn);
