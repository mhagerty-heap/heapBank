import React, { useRef, useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { CustomerService } from '../service/CustomerService';

const SavingsDeposit = () => {
    const customerService = new CustomerService(); // CustomerService is used to request ticket json data
    const [transactorName, setTransactorName] = useState('');
    const [transactionAmount, setTransactionAmount] = useState('');
    const [transactionNotes, setTransactionNotes] = useState('');
    const depositToast = useRef(null);
    const [showMessage, setShowMessage] = useState(false);
    const [inputs, setInputs] = useState({});
    const [initiallyRetrievedSavingsData, setInitiallyRetrievedSavingsData] = useState('');

    //LOAD DATA//
    ////////////////////////////////
    ////////////////////////////////
    useEffect(() => {
      customerService.getCustomersSavingsData().then(data => { setInitiallyRetrievedSavingsData(data);  });
    },[]);
    if ("customerSavingsData" in sessionStorage && sessionStorage.getItem("customerSavingsData") !== null && sessionStorage.getItem("customerSavingsData") !== '""') { // check if data already exists in sessionStorage
      console.log('customerSavingsData already exists and is not null, so will use existing value from sessionStorage');
    } else {
      console.log('customerSavingsData does not exist, so will create from initial data load ');
      const customerSavingsString = JSON.stringify(initiallyRetrievedSavingsData); // stringify initiallyRetrievedTicketData, required for sessionStorage
      const savingsDataLocalCopy = sessionStorage.setItem('customerSavingsData', customerSavingsString); // store ticketsLocalCopy key data in localStorage
    }
    const savingsDataLocalCopyParsed = JSON.parse(sessionStorage.getItem("customerSavingsData"));
    ////////////////////////////////
    ////////////////////////////////
    //END LOAD DATA//


     /**
      * Returns a random integer between min (inclusive) and max (inclusive).
      * The value is no lower than min (or the next integer greater than min
      * if min isn't an integer) and no greater than max (or the next integer
      * lower than max if max isn't an integer).
      * Using Math.round() will give you a non-uniform distribution!
      */
     function getRandomInt(min, max) {
         min = Math.ceil(min);
         max = Math.floor(max);
         return Math.floor(Math.random() * (max - min + 1)) + min;
     }

    const makeDeposit = (event) => {
        event.preventDefault();
        //console.log('transactorName = ' + event.target.transactorName.value);
        //console.log('transactionAmount = ' + event.target.transactionAmount.value);
        //console.log('transactionNote = '+ event.target.transactionNote.value);
        var newTransactionNumber = getRandomInt(300000, 399999);  //define random value between 69999 and 80000
        var randomAccountPastActivityNumber = getRandomInt(1, 100);
        var newTransactionAccountNumber = getRandomInt(1700000000, 1799999999);
        var newTransactionRoutingNumber = getRandomInt(20000000, 29999999);
        //var todaysDate = new Date().toLocaleDateString('fr-CA', {year: 'numeric', month: '2-digit', day: '2-digit'});
        // Create a date object from a date string
        // Get year, month, and day part from the date
        //var date = new Date();
        // var year = date.toLocaleString("default", { year: "numeric" });
        // var month = date.toLocaleString("default", { month: "2-digit" });
        // var day = date.toLocaleString("default", { day: "2-digit" });
        // var todaysDate = year + "-" + month + "-" + day;
        var todaysDate = new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'});
        console.log('transactorName = ' + transactorName);
        console.log('transactionAmount = ' + transactionAmount);
        console.log('transactionNote = '+ transactionNotes);
        console.log('transactionNumber = ' + newTransactionNumber);
        console.log('accountPastActivityNumber = ' + randomAccountPastActivityNumber);
        console.log('transactionAccountNumber = ' + newTransactionAccountNumber);
        console.log('transactionRoutingNumber = ' + newTransactionRoutingNumber);
        var transactionArray = {
          transactionNumber: newTransactionNumber,
          transactorName: transactorName,
          transactionDate: todaysDate,
          transactionAmount: transactionAmount,
          transactionStatus: "RECEIVED",
          transactorPastActivity: randomAccountPastActivityNumber,
          transactionNotes: transactionNotes,
          transactionAccountNumber: newTransactionAccountNumber,
          transactionRoutingNumber: newTransactionRoutingNumber
        }
        savingsDataLocalCopyParsed.push(transactionArray); // add form data array to local copy of savings data
        const savingsDataString = JSON.stringify(savingsDataLocalCopyParsed); // stringify local copy of ticket data, required for sessionStorage
        const savingsDataLocalCopy = sessionStorage.setItem('customerSavingsData', savingsDataString); // store updated ticketsLocalCopy sessionStorage
        depositToast.current.show({ severity: 'success', summary: 'Deposit Complete', detail: 'Completed Savings Download' });

    };

    return (
      <form onSubmit={makeDeposit}>
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Step #1: Upload Check Photos, Front and Back (Multiple Selections & Drag-n-Drop Allowed)</h5>
                    <FileUpload name="demo[]" url='./upload' multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
                    <h5>Step #2: Enter the name of Person/Company/Account</h5>
                    <InputText name="transactorName" value={transactorName} onChange={(e) => setTransactorName(e.target.value) } required/>
                    <h5>Step #3: Enter Amount</h5>
                    <InputNumber name="transactionAmount" value={transactionAmount} onValueChange={(e) => setTransactionAmount(e.value)} mode="currency" currency="USD" locale="en-US" required/>
                    <h5>Step #4: Enter Note</h5>
                    <InputText name="transactionNote"s value={transactionNotes} onChange={(e) => setTransactionNotes(e.target.value)} />
                    <h5>Step #5: Submit Deposit</h5>
                    <Button label="Submit Deposit" type="submit" icon="pi pi-check-square" className="p-button-success"></Button>
                    <Toast ref={depositToast} />

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
