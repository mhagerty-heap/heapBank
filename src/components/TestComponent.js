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

const FriendPay = () => {
  const savingsDataService = new CustomerService(); // savingsDataService is used to request savings json data
  const checkingDataService = new CustomerService();
  const friendPayAccountsDataService = new CustomerService(); // friendPayAccountsDataService is used to billPayAccount json data
  const [initiallyRetrievedSavingsData, setInitiallyRetrievedSavingsData] = useState('');
  const [initiallyRetrievedCheckingData, setInitiallyRetrievedCheckingData] = useState('');
  const [initiallyRetrievedFriendPayAccountsData, setInitiallyRetrievedFriendPayAccountsData] = useState('');
  const [listOfFriends, setListOfFriends] = useState(null);
  const [transactorName, setTransactorName] = useState('');
  const [transactionFromAccount, setTransactionFromAccount] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionNotes, setTransactionNotes] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const depositSuccessMessage = useRef(null);
  const depositFailMessage = useRef(null);

  const defaultListOfFriends = [
      { name: 'Carol Carpenter', code: 'cc' },
      { name: 'Steve Sobande', code: 'ss' },
      { name: 'Derek Crisafi', code: 'dc' }
  ];

  const defaultListOfAccounts = [
      { name: 'CHECKING - XX91', code: 'checking' },
      { name: 'SAVINGS - XX45', code: 'savings' }
  ];

  //LOAD DATA//
  ////////////////////////////////
  ////////////////////////////////
  useEffect(() => {
      savingsDataService.getCustomersSavingsData().then(data => {setInitiallyRetrievedSavingsData(data);});
      checkingDataService.getCustomersCheckingData().then(data => {setInitiallyRetrievedCheckingData(data);});
      friendPayAccountsDataService.getCustomersFriendPayAccountsData().then(data => {setInitiallyRetrievedFriendPayAccountsData(data);});
      //if bill pay data is available locally, use it, otherwise load default list
      if ("customerFriendPayAccountsData" in sessionStorage && sessionStorage.getItem("customerFriendPayAccountsData") !== null && sessionStorage.getItem("customerFriendPayAccountsData") !== '""') { // check if data already exists in sessionStorage
        setListOfFriends(customerFriendPayAccountsDataLocalCopyParsed);
      } else {
        setListOfFriends(defaultListOfFriends);

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

  // set local data for checking
  if ("customerCheckingData" in sessionStorage && sessionStorage.getItem("customerCheckingData") !== null && sessionStorage.getItem("customerCheckingData") !== '""') { // check if data already exists in sessionStorage
    //console.log('customerSavingsData already exists and is not null, so will use existing value from sessionStorage');
  } else {
    //console.log('customerSavingsData does not exist, so will create from initial data load ');
    const customerCheckingString = JSON.stringify(initiallyRetrievedCheckingData); // stringify initiallyRetrievedTicketData, required for sessionStorage
    const checkingDataLocalCopy = sessionStorage.setItem('customerCheckingData', customerCheckingString); // store ticketsLocalCopy key data in localStorage
  }
  const checkingDataLocalCopyParsed = JSON.parse(sessionStorage.getItem("customerCheckingData"));

  // set local data for list of bill pay accounts
  if ("customerFriendPayAccountsData" in sessionStorage && sessionStorage.getItem("customerFriendPayAccountsData") !== null && sessionStorage.getItem("customerFriendPayAccountsData") !== '""') { // check if data already exists in sessionStorage
    //console.log('customerFriendPayAccountsData already exists and is not null, so will use existing value from sessionStorage');
  } else {
    //console.log('customerFriendPayAccountsData does not exist, so will create from initial data load ');
    const customerBillPayAccountsString = JSON.stringify(initiallyRetrievedFriendPayAccountsData); // stringify initiallyRetrievedTicketData, required for sessionStorage
    const customerFriendPayAccountsDataLocalCopy = sessionStorage.setItem('customerFriendPayAccountsData', customerBillPayAccountsString); // store ticketsLocalCopy key data in localStorage
  }
  const customerFriendPayAccountsDataLocalCopyParsed = JSON.parse(sessionStorage.getItem("customerFriendPayAccountsData"));
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
    if (transactorName && transactionFromAccount && transactionAmount && transactionDate) {
      var newTransactionNumber = getRandomInt(400000, 499999);  //define random value between 69999 and 80000
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

      // set local data depending on what account was selected, checking or savings
      if (transactionFromAccount.code == 'savings') {
        savingsDataLocalCopyParsed.push(transactionArray); // add form data array to local copy of savings data
        const savingsDataString = JSON.stringify(savingsDataLocalCopyParsed); // stringify local copy of ticket data, required for sessionStorage
        const savingsDataLocalCopy = sessionStorage.setItem('customerSavingsData', savingsDataString); // store updated ticketsLocalCopy sessionStorage
      } else {
        checkingDataLocalCopyParsed.push(transactionArray); // add form data array to local copy of savings data
        const checkingDataString = JSON.stringify(checkingDataLocalCopyParsed); // stringify local copy of ticket data, required for sessionStorage
        const checkingDataLocalCopy = sessionStorage.setItem('customerCheckingData', checkingDataString); // store updated ticketsLocalCopy sessionStorage
      }

      depositSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: 'Friend Paid'});
      setTransactorName('');
      setTransactionFromAccount('');
      setTransactionAmount('');
      setTransactionDate('');
      setTransactionNotes('');
    } else {
      depositFailMessage.current.show({severity: 'error', summary: 'Bill Pay Error:', detail: 'Please complete All Steps (Account/Amount/Date)'});
    };
  };

    return (
        <form onSubmit={submitPayment}>
          <div className="grid">
              <div className="col-12">
                  <div className="card">
                      <h5>Step #1: Select a Friend to Pay</h5>
                      <ListBox value={transactorName} options={listOfFriends} onChange={(e) => setTransactorName(e.value)} optionLabel="name" style={{ width: '15rem' }} />
                      <h5>Step #1: Select one of your accounts to fund the payment</h5>
                      <ListBox value={transactionFromAccount} options={defaultListOfAccounts} onChange={(e) => setTransactionFromAccount(e.value)} optionLabel="name" style={{ width: '15rem' }} />
                      <h5>Step #3: Enter a Payment Amount</h5>
                      <InputNumber value={transactionAmount} onValueChange={(e) => setTransactionAmount(e.value)} mode="currency" currency="USD" locale="en-US" required/>
                      <h5>Step #4: Select a Date</h5>
                      <Calendar id="transactionDate" value={transactionDate} onChange={(e) => setTransactionDate(e.value)} />
                      <h5>Step #5: Enter Note</h5>
                      <InputText name="transactionNote"s value={transactionNotes} onChange={(e) => setTransactionNotes(e.target.value)} />
                      <h5>Step #6: Submit Payment</h5>
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

export default React.memo(FriendPay, comparisonFn);
