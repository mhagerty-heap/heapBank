import React, { useState, useRef } from 'react';
import { ListBox } from 'primereact/listbox';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import { Calendar } from 'primereact/calendar';

const accounts = [
    { name: 'Star Gas & Oil', code: 'StarOil' },
    { name: 'Northstar Mortgage', code: 'NorthstarMortgage' },
    { name: 'Benevolent Internet', code: 'BenevolentInternet' },
    { name: 'NetQuix', code: 'NetQuix' },
    { name: 'Affleck Insurance', code: 'AffleckInsurance' }
];


const AddBillPayAccount = () => {
  const [addBillPayAccount, setAddBillPayAccount] = useState(null)
  const addBillPayAccountSuccessMessage = useRef(null);
  const addBillPayAccountFailMessage = useRef(null);

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
    { name: 'Wizney', code: 'WIZ' }
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
      addBillPayAccountSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: 'Account Submitted for Bill Pay List'});
    } else {
      addBillPayAccountFailMessage.current.show({severity: 'error', summary: 'Error:', detail: 'Select Account'});
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
