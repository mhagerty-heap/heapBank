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
    if (applicantFirstName && applicantLastName) {
      onSubmitApplicationSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: 'Credit Card Application Submitted for Processing'});
    } else {
      onSubmitApplicationFailMessage.current.show({severity: 'error', summary: 'Error:', detail: 'For Demo purposes, at a minimum, enter the First and Last Name'});
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
                              <h5>Personal Contact Information</h5>
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>First Name</h6>
                              <InputText value={applicantFirstName} onChange={(e) => setApplicantFirstName(e.target.value)} />
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>Last Name</h6>
                              <InputText value={applicantLastName} onChange={(e) => setApplicantLastName(e.target.value)} />
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>Middle Initial</h6>
                              <InputText value={applicantMiddleInitial} onChange={(e) => setApplicantMiddleInitial(e.target.value)} />
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>Date of Birth (mm/dd/yyyy)</h6>
                              <InputText value={applicantDateOfBirth} onChange={(e) => setApplicantDateOfBirth(e.target.value)} />
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>Phone Number</h6>
                              <InputText value={applicantPhoneNumber} onChange={(e) => setApplicantPhoneNumber(e.target.value)} />
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>Email Address</h6>
                              <InputText value={applicantEmailAddress} onChange={(e) => setApplicantEmailAddress(e.target.value)} />
                            </div>
                          </div>
                        </div>

                        <div className="card">
                          <div className="grid p-fluid">
                            <div className="col-12">
                              <h5>Personal Address Information</h5>
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>Street Address</h6>
                              <InputText value={applicantStreetAddress} onChange={(e) => setApplicantStreetAddress(e.target.value)} />
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>City</h6>
                              <InputText value={applicantCity} onChange={(e) => setApplicantCity(e.target.value)} />
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>State</h6>
                              <InputText value={applicantState} onChange={(e) => setApplicantState(e.target.value)} />
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>Zip Code</h6>
                              <InputText value={applicantZipCode} onChange={(e) => setApplicantZipCode(e.target.value)} />
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>Country</h6>
                              <InputText value={applicantCountry} onChange={(e) => setApplicantCountry(e.target.value)} />
                            </div>
                          </div>
                        </div>

                        <div className="card">
                          <div className="grid p-fluid">
                            <div className="col-12">
                              <h5>Personal Financial Information</h5>
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>Homeowner or Renter?</h6>
                              <InputText value={applicantHomeownerRenter} onChange={(e) => setApplicantHomeownerRenter(e.target.value)} />
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>Gross Monthly Income</h6>
                              <InputText value={applicantGrossMonthlyIncome} onChange={(e) => setApplicantGrossMonthlyIncome(e.target.value)} />
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>Mortgage/Rent Payment Monthly</h6>
                              <InputText value={applicantPaymentMonthly} onChange={(e) => setApplicantPaymentMonthly(e.target.value)} />
                            </div>
                          </div>
                        </div>

                        <div className="card">
                          <div className="grid p-fluid">
                            <div className="col-12">
                              <h5>Disclosures</h5>
                            </div>
                            <div className="col-12">
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
                                <Button label="Submit Application" type="submit" icon="pi pi-check-square" className="p-button-success"></Button>
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
