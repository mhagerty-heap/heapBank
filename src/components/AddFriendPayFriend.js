import React, { useState, useRef } from 'react';
import { ListBox } from 'primereact/listbox';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import { Calendar } from 'primereact/calendar';
import { AutoComplete } from 'primereact/autocomplete';

const AddFriendPayFriend = () => {
  const [addFriendPayAccount, setAddFriendPayAccount] = useState(null)
  const addFriendPayAccountSuccessMessage = useRef(null);
  const addFriendPayAccountFailMessage = useRef(null);

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
      addFriendPayAccountSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: 'Account Submitted for Friend Pay List'});
    } else {
      addFriendPayAccountFailMessage.current.show({severity: 'error', summary: 'Error:', detail: 'Select Friend to Pay'});
    }
    setAddFriendPayAccount('');
  }

    return (
      <form onSubmit={onAddFriendPayAccount}>
        <div className="grid">
          <div className="col-12">
            <div className="card col-6">
              <h5>Select a New FriendPay Friend</h5>
              <ListBox value={addFriendPayAccount} options={friendPayAccountOptions} onChange={(e) => setAddFriendPayAccount(e.value)} filter optionLabel="name" itemTemplate={addFriendPayAccountTemplate} style={{ width: '15rem' }} listStyle={{ maxHeight: '250px' }} />
            </div>
            <div className="card col-6">
              <Button label="Add FriendPay Friend" type="submit" icon="pi pi-check-square" className="p-button-success"></Button>
              <div classname="card">
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

export default React.memo(AddFriendPayFriend, comparisonFn);
