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


const CheckingPayBill = () => {
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState(null);
  const depositSuccessMessage = useRef(null);
  const depositFailMessage = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const onButtonClick = (e) => {
    e.preventDefault(); // prevents page from reloading
    if (account && amount && selectedDate) {
      depositSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: 'Bill Paid'});
      setAccount('');
      setAmount('');
      setSelectedDate('');
      // let payload = { name: 'John Doe', occupation: 'gardener' };
      // let res = axios.post('http://httpbin.org/post', payload);
    } else {
      depositFailMessage.current.show({severity: 'error', summary: 'Error:', detail: 'Complete All Steps'});
    };
  };

    return (
        <form onSubmit={onButtonClick}>
          <div className="grid">
              <div className="col-12">
                  <div className="card">
                      <h5>Step #1: Select an Account</h5>
                      <ListBox value={account} options={accounts} onChange={(e) => setAccount(e.value)} optionLabel="name" style={{ width: '15rem' }} />
                      <h5>Step #2: Enter a Payment Amount</h5>
                      <InputNumber value={amount} onValueChange={(e) => setAmount(e.value)} mode="currency" currency="USD" locale="en-US" required/>
                      <h5>Step #3: Select a Date</h5>
                      <Calendar id="selecteDate" value={selectedDate} onChange={(e) => setSelectedDate(e.value)} />
                      <h5>Step #4: Submit Payment</h5>
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

export default React.memo(CheckingPayBill, comparisonFn);
