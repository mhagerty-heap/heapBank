import React, { useState, useRef, useEffect } from 'react';
import { ListBox } from 'primereact/listbox';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import { CustomerService } from '../service/CustomerService';

const MakeATransfer = () => {
  const savingsDataService = new CustomerService();
  const checkingDataService = new CustomerService();
  const [initiallyRetrievedCheckingData, setInitiallyRetrievedCheckingData] = useState('');
  const [initiallyRetrievedSavingsData, setInitiallyRetrievedSavingsData] = useState('');
  const [toAccount, setToAccount] = useState(null);
  const [fromAccount, setFromAccount] = useState(null);
  const [transactionAmount, setTransactionAmount] = useState(null);
  const depositSuccessMessage = useRef(null);
  const depositFailMessage = useRef(null);

  const accounts = [
    {label: 'Checking (XX91)', value: 'checkingxx91'},
    {label: 'Savings (XX45)', value: 'savingsxx45'},
  ];

  //LOAD DATA//
  ////////////////////////////////
  ////////////////////////////////
  useEffect(() => {
      savingsDataService.getCustomersSavingsData().then(data => {setInitiallyRetrievedSavingsData(data);});
      checkingDataService.getCustomersCheckingData().then(data => { setInitiallyRetrievedCheckingData(data);  });
  },[]);
  // set local data for savings
  if ("customerSavingsData" in sessionStorage && sessionStorage.getItem("customerSavingsData") !== null && sessionStorage.getItem("customerSavingsData") !== '""') { // check if data already exists in sessionStorage
    console.log('customerSavingsData already exists and is not null, so will use existing value from sessionStorage');
  } else {
    console.log('customerSavingsData does not exist, so will create from initial data load ');
    const customerSavingsString = JSON.stringify(initiallyRetrievedSavingsData); // stringify initiallyRetrievedTicketData, required for sessionStorage
    const savingsDataLocalCopy = sessionStorage.setItem('customerSavingsData', customerSavingsString); // store ticketsLocalCopy key data in localStorage
  }
  const savingsDataLocalCopyParsed = JSON.parse(sessionStorage.getItem("customerSavingsData"));

  if ("customerCheckingData" in sessionStorage && sessionStorage.getItem("customerCheckingData") !== null && sessionStorage.getItem("customerCheckingData") !== '""') { // check if data already exists in sessionStorage
    console.log('customerCheckingData already exists and is not null, so will use existing value from sessionStorage');
  } else {
    console.log('customerCheckingData does not exist, so will create from initial data load ');
    const customerCheckingString = JSON.stringify(initiallyRetrievedCheckingData); // stringify initiallyRetrievedTicketData, required for sessionStorage
    const checkingDataLocalCopy = sessionStorage.setItem('customerCheckingData', customerCheckingString); // store ticketsLocalCopy key data in localStorage
  }
  const checkingDataLocalCopyParsed = JSON.parse(sessionStorage.getItem("customerCheckingData"));
  ////////////////////////////////
  ////////////////////////////////
  //END LOAD DATA//

  function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const onButtonClick = (e) => {
    e.preventDefault(); // prevents page from reloading
    if (toAccount && fromAccount && transactionAmount) {  // if all values are present and toAccount does not equal fromAccount
      if (toAccount !== fromAccount) {
        var checkingStatus;
        var savingsStatus;
        if (toAccount == "checkingxx91" && fromAccount == "savingsxx45") {
            checkingStatus = "TRANSFERRED IN";
            savingsStatus = "TRANSFERRED OUT";
        } else {
          checkingStatus = "TRANSFERRED OUT";
          savingsStatus = "TRANSFERRED IN";
        };
        var newTransactionNumber = getRandomInt(400000, 499999);  //define random value between 69999 and 80000
        var randomAccountPastActivityNumber = 51 //getRandomInt(1, 100);
        var newCheckingAccountNumber = 1799999991;
        var newCheckingRoutingNumber = 29999999;
        var newSavingsAccountNumber = 1799999945;
        var newSavingsRoutingNumber = 29999999;
        var transactionSelectedDate = new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'});
        var checkingTransactionArray = {
          transactionNumber: newTransactionNumber,
          transactorName: "Savings Account",
          transactionDate: transactionSelectedDate,
          transactionAmount: transactionAmount,
          transactionStatus: checkingStatus,
          transactorPastActivity: randomAccountPastActivityNumber,
          transactionNotes: "Money Transfer",
          transactionAccountNumber: newSavingsAccountNumber,
          transactionRoutingNumber: newSavingsRoutingNumber
        }
        var savingsTransactionArray = {
          transactionNumber: newTransactionNumber,
          transactorName: "Checking Account",
          transactionDate: transactionSelectedDate,
          transactionAmount: transactionAmount,
          transactionStatus: savingsStatus,
          transactorPastActivity: randomAccountPastActivityNumber,
          transactionNotes: "Money Transfer",
          transactionAccountNumber: newCheckingAccountNumber,
          transactionRoutingNumber: newCheckingRoutingNumber
        }
        checkingDataLocalCopyParsed.push(checkingTransactionArray); // add form data array to local copy of checking data
        const checkingDataString = JSON.stringify(checkingDataLocalCopyParsed); // stringify local copy of ticket data, required for sessionStorage
        const checkingDataLocalCopy = sessionStorage.setItem('customerCheckingData', checkingDataString); // store updated ticketsLocalCopy sessionStorage
        savingsDataLocalCopyParsed.push(savingsTransactionArray); // add form data array to local copy of savings data
        const savingsDataString = JSON.stringify(savingsDataLocalCopyParsed); // stringify local copy of ticket data, required for sessionStorage
        const savingsDataLocalCopy = sessionStorage.setItem('customerSavingsData', savingsDataString); // store updated ticketsLocalCopy sessionStorage
        depositSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: 'Amount Transferred'});
        setToAccount('');
        setFromAccount('');
        setTransactionAmount('');
        // let payload = { name: 'John Doe', occupation: 'gardener' };
        // let res = axios.post('http://httpbin.org/post', payload);
      } else {
        depositFailMessage.current.show({severity: 'error', summary: 'Error:', detail: ' From Account Must be Different Than To Account'});
      }
    } else {
      depositFailMessage.current.show({severity: 'error', summary: 'Error:', detail: ' Please Complete All Steps'});
    };
  };

    return (
      <form onSubmit={onButtonClick}>
        <div className="grid p-fluid">
          <div className="col-12 lg:col-6">
            <div className="card">
                <h5>Step1: Select From Account</h5>
                <ListBox value={fromAccount} options={accounts} onChange={(e) => setFromAccount(e.value)} />
            </div>
          </div>
          <div className="col-12 lg:col-6">
            <div className="card">
                <h5>Step2: Select To Account</h5>
                <ListBox value={toAccount} options={accounts} onChange={(e) => setToAccount(e.value)} />
            </div>
          </div>
          <div className="col-6">
            <div class="card">
              <h5>Step #3: Enter a Transfer Amount</h5>
              <InputNumber value={transactionAmount} onValueChange={(e) => setTransactionAmount(e.value)} mode="currency" currency="USD" locale="en-US" required/>
              <h5>Step #4: Submit Transfer</h5>
              <Button label="Submit Transfer" icon="pi pi-check-square" className="p-button-success"></Button>
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

export default React.memo(MakeATransfer, comparisonFn);
