import React, { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
//import { useForm, Controller } from 'react';
import { Toast } from 'primereact/toast';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import axios from 'axios';


const SavingsDeposit = () => {

    const [checkGiver, setCheckGiver] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const depositSuccessMessage = useRef(null);
    const depositFailMessage = useRef(null);

    const onButtonClick = (e) => {
      e.preventDefault(); // prevents page from reloading
      if (checkGiver && note && amount) {
        depositSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: 'Deposit Submitted'});
        setCheckGiver('');
        setAmount('');
        setNote('');
        // let payload = { name: 'John Doe', occupation: 'gardener' };
        // let res = axios.post('http://httpbin.org/post', payload);
      } else {
        depositSuccessMessage.current.show({severity: 'error', summary: 'Error:', detail: 'Enter Amount'});
      };
    };


    return (
        <form onSubmit={onButtonClick}>
          <div className="grid">
              <div className="col-12">
                  <div className="card">
                      <h5>Step #1: Upload Check Photos, Front and Back (Multiple Selections & Drag-n-Drop Allowed)</h5>
                      <FileUpload name="demo[]" url='./upload' multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
                      <h5>Step #2: Enter the name of Person/Company/Account</h5>
                      <InputText value={checkGiver} onChange={(e) => setCheckGiver(e.target.value)} required/>
                      <h5>Step #3: Enter Amount</h5>
                      <InputNumber value={amount} onValueChange={(e) => setAmount(e.value)} mode="currency" currency="USD" locale="en-US" required/>
                      <h5>Step #4: Enter Note</h5>
                      <InputText value={note} onChange={(e) => setNote(e.target.value)} required />
                      <h5>Step #5: Submit Deposit</h5>
                      <Button label="Submit Deposit" type="submit" icon="pi pi-check-square" className="p-button-success"></Button>
                  </div>
                  <div classname="card">
                      <Messages ref={depositSuccessMessage} />
                      <Messages ref={depositFailMessage} />
                  </div>
              </div>
          </div>
        </form>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(SavingsDeposit, comparisonFn);
