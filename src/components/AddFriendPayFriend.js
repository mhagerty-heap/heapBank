import React, { useState, useRef, useEffect } from 'react';
import { ListBox } from 'primereact/listbox';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import { Calendar } from 'primereact/calendar';
import { CustomerService } from '../service/CustomerService';

const AddFriendPayAccount = () => {
  const friendPayAccountsDataService = new CustomerService();
  const [initiallyRetrievedFriendPayAccountsData, setInitiallyRetrievedFriendPayAccountsData] = useState('');
  const [addFriendPayAccount, setAddFriendPayAccount] = useState(null)
  const addFriendPayAccountSuccessMessage = useRef(null);
  const addFriendPayAccountFailMessage = useRef(null);

  //LOAD DATA//
  ////////////////////////////////
  ////////////////////////////////
  useEffect(() => {
      friendPayAccountsDataService.getCustomersFriendPayAccountsData().then(data => {setInitiallyRetrievedFriendPayAccountsData(data);});
      //if bill pay data is available locally, use it, otherwise load default list
  },[]);
  if ("customerFriendPayAccountsData" in sessionStorage && sessionStorage.getItem("customerFriendPayAccountsData") !== null && sessionStorage.getItem("customerFriendPayAccountsData") !== '""') { // check if data already exists in sessionStorage
    //console.log('customerFriendPayAccountsData already exists and is not null, so will use existing value from sessionStorage');
  } else {
    //console.log('customerFriendPayAccountsData does not exist, so will create from initial data load ');
    const customerFriendPayAccountsString = JSON.stringify(initiallyRetrievedFriendPayAccountsData); // stringify initiallyRetrievedTicketData, required for sessionStorage
    const customerFriendPayAccountsDataLocalCopy = sessionStorage.setItem('customerFriendPayAccountsData', customerFriendPayAccountsString); // store ticketsLocalCopy key data in localStorage
  }
  const customerFriendPayAccountsDataLocalCopyParsed = JSON.parse(sessionStorage.getItem("customerFriendPayAccountsData"));
  ////////////////////////////////
  ////////////////////////////////
  //END LOAD DATA//

  const friendPayAccountOptions = [
    { name: 'Alfred Bundy', code: 'BOA' },
    { name: 'John Smith', code: 'USM' },
    { name: 'Steve Johnson', code: 'VER' },
    { name: 'Thomas Jefferson', code: 'TMO' },
    { name: 'PJ Thompson', code: 'AMA' },
    { name: 'George Davis', code: 'ZTR' },
    { name: 'Dan Ravellese', code: 'CHA' },
    { name: 'Travis Jimson', code: 'TUL' },
    { name: 'Carly Stuebens', code: 'NEW' },
    { name: 'Stephanie Flaunt', code: 'WIZ' }
  ];

  const addFriendPayAccountTemplate = (option) => {
    return (
        <div className="addFriendPay-item">
            <div>{option.name}</div>
        </div>
    );
  }

  const onAddFriendPayAccount = (e) => {
    e.preventDefault(); // prevents page from reloading
    if (addFriendPayAccount) {
      //console.log(addFriendPayAccount.name);

      var addAccountArray = {
        name: addFriendPayAccount.name,
        code: addFriendPayAccount.code,
      }
      customerFriendPayAccountsDataLocalCopyParsed.push(addAccountArray); // add form data array to local copy of checking data
      const friendPayAccountDataString = JSON.stringify(customerFriendPayAccountsDataLocalCopyParsed); // stringify local copy of ticket data, required for sessionStorage
      const friendPayAccountsDataLocalCopy = sessionStorage.setItem('customerFriendPayAccountsData', friendPayAccountDataString); // store updated ticketsLocalCopy sessionStorage

      addFriendPayAccountSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: 'Account added to FriendPay List'});
    } else {
      addFriendPayAccountFailMessage.current.show({severity: 'error', summary: 'Error:', detail: 'Please Select New Account'});
    }
    setAddFriendPayAccount('');
  }

    return (
      <form onSubmit={onAddFriendPayAccount}>
        <div className="grid">
          <div className="col-12">
            <div className="card col-6">
              <h5>Add a Suggested Friend from the list below</h5>
              <ListBox id="listOfFriends" value={addFriendPayAccount} options={friendPayAccountOptions} onChange={(e) => setAddFriendPayAccount(e.value)} filter optionLabel="name" itemTemplate={addFriendPayAccountTemplate} style={{ width: '15rem' }} listStyle={{ maxHeight: '250px' }} />
            </div>
            <div className="card col-6">
              <Button id="addFriendPayAccountButton" label="Add Account" type="submit" icon="pi pi-check-square" className="p-button-success"></Button>
              <div>
                <Messages ref={addFriendPayAccountSuccessMessage} />
                <Messages ref={addFriendPayAccountFailMessage} />
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

export default React.memo(AddFriendPayAccount, comparisonFn);
