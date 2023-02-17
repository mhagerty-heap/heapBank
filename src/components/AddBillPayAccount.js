import React, { useState, useRef, useEffect } from 'react';
import { ListBox } from 'primereact/listbox';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import { Calendar } from 'primereact/calendar';
import { CustomerService } from '../service/CustomerService';

const AddBillPayAccount = () => {
  const billPayAccountsDataService = new CustomerService();
  const [initiallyRetrievedBillPayAccountsData, setInitiallyRetrievedBillPayAccountsData] = useState('');
  const [addBillPayAccount, setAddBillPayAccount] = useState(null)
  const addBillPayAccountSuccessMessage = useRef(null);
  const addBillPayAccountFailMessage = useRef(null);

  //LOAD DATA//
  ////////////////////////////////
  ////////////////////////////////
  useEffect(() => {
      billPayAccountsDataService.getCustomersBillPayAccountsData().then(data => {setInitiallyRetrievedBillPayAccountsData(data);});
      //if bill pay data is available locally, use it, otherwise load default list
  },[]);
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

  const billPayAccountOptions = [
    { name: 'Bank of Americorp', code: 'BOA' },
    { name: 'USA Mortgage', code: 'USM' },
    { name: 'Verizap', code: 'VER' },
    { name: 'TMobits', code: 'TMO' },
    { name: 'Amazonk', code: 'AMA' },
    { name: 'Z-Trade', code: 'ZTR' },
    { name: 'Chasem', code: 'CHA' },
    { name: 'Tulu', code: 'TUL' },
    { name: 'NewTube', code: 'NEW' },
    { name: 'Bizney', code: 'BIZ' }
  ];

  const addBillPayAccountTemplate = (option) => {
    return (
        <div className="addBillPay-item">
            <div>{option.name}</div>
        </div>
    );
  }

  const onAddBillPayAccount = (e) => {
    e.preventDefault(); // prevents page from reloading
    if (addBillPayAccount) {
      //console.log(addBillPayAccount.name);

      var addAccountArray = {
        name: addBillPayAccount.name,
        code: addBillPayAccount.code,
      }
      customerBillPayAccountsDataLocalCopyParsed.push(addAccountArray); // add form data array to local copy of checking data
      const billPayAccountDataString = JSON.stringify(customerBillPayAccountsDataLocalCopyParsed); // stringify local copy of ticket data, required for sessionStorage
      const billPayAccountsDataLocalCopy = sessionStorage.setItem('customerBillPayAccountsData', billPayAccountDataString); // store updated ticketsLocalCopy sessionStorage

      addBillPayAccountSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: 'Account added to Bill Pay List'});
    } else {
      addBillPayAccountFailMessage.current.show({severity: 'error', summary: 'Error:', detail: 'Please Select New Account'});
    }
    setAddBillPayAccount('');
  }

    return (
      <form onSubmit={onAddBillPayAccount}>
        <div className="grid">
          <div className="col-12">
            <div className="card col-6">
              <h5>Select a New Bill Pay Account</h5>
              <ListBox value={addBillPayAccount} options={billPayAccountOptions} onChange={(e) => setAddBillPayAccount(e.value)} filter optionLabel="name" itemTemplate={addBillPayAccountTemplate} style={{ width: '15rem' }} listStyle={{ maxHeight: '250px' }} />
            </div>
            <div className="card col-6">
              <Button label="Add Account" type="submit" icon="pi pi-check-square" className="p-button-success"></Button>
              <div classname="card">
                <Messages ref={addBillPayAccountSuccessMessage} />
                <Messages ref={addBillPayAccountFailMessage} />
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

export default React.memo(AddBillPayAccount, comparisonFn);
