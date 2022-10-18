import React, { useState, useRef } from 'react';
import { ListBox } from 'primereact/listbox';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';

const MakeATransfer = () => {

  const [toAccount, setToAccount] = useState(null);
  const [fromAccount, setFromAccount] = useState(null);
  const [amount, setAmount] = useState(null);
  const depositSuccessMessage = useRef(null);
  const depositFailMessage = useRef(null);

  const accounts = [
    {label: 'Checking (XX91)', value: 'checkingxx91'},
    {label: 'Savings (XX45)', value: 'savingsxx45'},
  ];

  const onButtonClick = (e) => {
    e.preventDefault(); // prevents page from reloading
    if (toAccount && fromAccount && amount) {
      depositSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: 'Amount Transferred'});
      setToAccount('');
      setFromAccount('');
      setAmount('');
      // let payload = { name: 'John Doe', occupation: 'gardener' };
      // let res = axios.post('http://httpbin.org/post', payload);
    } else {
      depositFailMessage.current.show({severity: 'error', summary: 'Error:', detail: 'Complete All Steps'});
    };
  };




    return (
      <form onSubmit={onButtonClick}>
        <div className="grid p-fluid">
          <div className="col-12 lg:col-6">
            <div className="card">
                <h5>Step1: Select From Account</h5>
                <ListBox value={toAccount} options={accounts} onChange={(e) => setToAccount(e.value)} />
            </div>
          </div>
          <div className="col-12 lg:col-6">
            <div className="card">
                <h5>Step2: Select To Account</h5>
                <ListBox value={fromAccount} options={accounts} onChange={(e) => setFromAccount(e.value)} />
            </div>
          </div>
          <div className="col-6">
            <div class="card">
              <h5>Step #3: Enter a Transfer Amount</h5>
              <InputNumber value={amount} onValueChange={(e) => setAmount(e.value)} mode="currency" currency="USD" locale="en-US" required/>
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
