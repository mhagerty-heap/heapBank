import React, { useState, useRef, useEffect } from 'react';
import { ListBox } from 'primereact/listbox';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import { Calendar } from 'primereact/calendar';
import { CustomerService } from '../service/CustomerService';
import axios from 'axios';

const SavingsPayBill = () => {
  const savingsDataService = new CustomerService(); // savingsDataService is used to request savings json data
  const billPayAccountsDataService = new CustomerService(); // billPayAccountsDataService is used to billPayAccount json data
  const [initiallyRetrievedSavingsData, setInitiallyRetrievedSavingsData] = useState('');
  const [initiallyRetrievedBillPayAccountsData, setInitiallyRetrievedBillPayAccountsData] = useState('');
  const [listOfAccounts, setListOfAccounts] = useState(null);
  const [transactorName, setTransactorName] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionNotes, setTransactionNotes] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const depositSuccessMessage = useRef(null);
  const depositFailMessage = useRef(null);
  const defaultListOfAccounts = [
      { name: 'Star Gas & Oil', code: 'StarOil' },
      { name: 'Northstar Mortgage', code: 'NorthstarMortgage' },
      { name: 'Benevolent Internet', code: 'BenevolentInternet' },
      { name: 'NetQuix', code: 'NetQuix' },
      { name: 'Affleck Insurance', code: 'AffleckInsurance' }
  ];

  //LOAD DATA//
  ////////////////////////////////
  ////////////////////////////////
  useEffect(() => {
      savingsDataService.getCustomersSavingsData().then(data => {setInitiallyRetrievedSavingsData(data);});
      billPayAccountsDataService.getCustomersBillPayAccountsData().then(data => {setInitiallyRetrievedBillPayAccountsData(data);});
      //if bill pay data is available locally, use it, otherwise load default list
      if ("customerBillPayAccountsData" in sessionStorage && sessionStorage.getItem("customerBillPayAccountsData") !== null && sessionStorage.getItem("customerBillPayAccountsData") !== '""') { // check if data already exists in sessionStorage
        setListOfAccounts(customerBillPayAccountsDataLocalCopyParsed);
      } else {
        setListOfAccounts(defaultListOfAccounts);

      }
  },[]);
  // set local data for savings
  if ("customerSavingsData" in sessionStorage && sessionStorage.getItem("customerSavingsData") !== null && sessionStorage.getItem("customerSavingsData") !== '""') { // check if data already exists in sessionStorage
    //console.log('customerSavingsData already exists and is not null, so will use existing value from sessionStorage');
  } else {
    //console.log('customerSavingsData does not exist, so will create from initial data load ');
    const customerSavingsString = JSON.stringify(initiallyRetrievedSavingsData); // stringify initiallyRetrievedTicketData, required for sessionStorage
    const savingsDataLocalCopy = sessionStorage.setItem('customerSavingsData', customerSavingsString); // store ticketsLocalCopy key data in localStorage
  }
  const savingsDataLocalCopyParsed = JSON.parse(sessionStorage.getItem("customerSavingsData"));
// set local data for list of bill pay accounts
  if ("customerBillPayAccountsData" in sessionStorage && sessionStorage.getItem("customerBillPayAccountsData") !== null && sessionStorage.getItem("customerBillPayAccountsData") !== '""') { // check if data already exists in sessionStorage
    //console.log('customerBillPayAccountsData already exists and is not null, so will use existing value from sessionStorage');
  } else {
    //console.log('customerBillPayAccountsData does not exist, so will create from initial data load ');
    const customerBillPayAccountsString = JSON.stringify(initiallyRetrievedBillPayAccountsData); // stringify initiallyRetrievedTicketData, required for sessionStorage
    const customerBillPayAccountsDataLocalCopy = sessionStorage.setItem('customerBillPayAccountsData', customerBillPayAccountsString); // store ticketsLocalCopy key data in localStorage
  }
  const customerBillPayAccountsDataLocalCopyParsed = JSON.parse(sessionStorage.getItem("customerBillPayAccountsData"));
  ////////////////////////////////
  ////////////////////////////////
  //END LOAD DATA//

  function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  // what happens when they click the submit deposit button
  const submitPayment = (e) => {
    e.preventDefault(); // prevents page from reloading
    const apiErrorPercentage = Math.floor(Math.random() * 101);
    if (transactorName && transactionAmount && transactionDate && transactionNotes !== "forcedApiError" && apiErrorPercentage >= 30) {
      var newTransactionNumber = getRandomInt(300000, 399999);  //define random value between 69999 and 80000
      var randomAccountPastActivityNumber = 51 //getRandomInt(1, 100);
      var newTransactionAccountNumber = getRandomInt(1700000000, 1799999999);
      var newTransactionRoutingNumber = getRandomInt(20000000, 29999999);
      var transactionSelectedDate = new Date(transactionDate).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'});
      var transactionArray = {
        transactionNumber: newTransactionNumber,
        transactorName: transactorName.name,
        transactionDate: transactionSelectedDate,
        transactionAmount: transactionAmount,
        transactionStatus: "PAID",
        transactorPastActivity: randomAccountPastActivityNumber,
        transactionNotes: transactionNotes,
        transactionAccountNumber: newTransactionAccountNumber,
        transactionRoutingNumber: newTransactionRoutingNumber
      }
      //console.log(transactionArray);
      savingsDataLocalCopyParsed.push(transactionArray); // add form data array to local copy of savings data
      const savingsDataString = JSON.stringify(savingsDataLocalCopyParsed); // stringify local copy of ticket data, required for sessionStorage
      const savingsDataLocalCopy = sessionStorage.setItem('customerSavingsData', savingsDataString); // store updated ticketsLocalCopy sessionStorage
      depositSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: 'Bill Paid'});
      setTransactorName('');
      setTransactionAmount('');
      setTransactionDate('');
      setTransactionNotes('');
      setTimeout(function() {
        window.location.replace('/savingsPayBillThankYou');
      }, 2000);
    } else if (transactorName && transactionAmount && transactionDate && transactionNotes !== "forcedApiError" && apiErrorPercentage < 30) {
      axios.post(`https://my.api.mockaroo.com/bankone/savingsPayBill.json?key=3fa20c10`);
    } else if (transactionNotes == "forcedApiError") {
      axios.post(`https://my.api.mockaroo.com/bankone/savingsPayBill.json?key=3fa20c10`);
      depositFailMessage.current.show({severity: 'error', summary: 'Savings Pay Bill Forced Error:', detail: 'Forced API Error'});
    } else {
      depositFailMessage.current.show({severity: 'error', summary: 'Savings Pay Bill Entry Error:', detail: 'Please complete All Steps (Account/Amount/Date)'});
    };
  };

    return (
        <form onSubmit={submitPayment}>
          <div className="grid">
              <div className="col-12">
                  <div className="card">
                      <h5>Step #1: Select an Account</h5>
                      <ListBox value={transactorName} options={listOfAccounts} onChange={(e) => setTransactorName(e.value)} optionLabel="name" style={{ width: '15rem' }} />
                      <h5>Step #2: Enter a Payment Amount</h5>
                      <InputNumber value={transactionAmount} onValueChange={(e) => setTransactionAmount(e.value)} mode="currency" currency="USD" locale="en-US" required/>
                      <h5>Step #3: Select a Date</h5>
                      <Calendar id="transactionDate" value={transactionDate} onChange={(e) => setTransactionDate(e.value)} />
                      <h5>Step #4: Enter Note</h5>
                      <InputText name="transactionNote"s value={transactionNotes} onChange={(e) => setTransactionNotes(e.target.value)} />
                      <h5>Step #5: Submit Payment</h5>
                      <Button label="Submit Payment" icon="pi pi-check-square" className="p-button-success"></Button>
                      <div classname="card">
                          <Messages ref={depositSuccessMessage} />
                          <Messages ref={depositFailMessage} />
                      </div>
                  </div>
              </div>
          </div>
        </form>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(SavingsPayBill, comparisonFn);
