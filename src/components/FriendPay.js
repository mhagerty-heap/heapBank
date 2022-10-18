import React, { useState, useRef } from 'react';
import { ListBox } from 'primereact/listbox';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import { Calendar } from 'primereact/calendar';

const friendOptions = [
    { name: 'Carol Carpenter', code: 'cc' },
    { name: 'Tim Holmes', code: 'th' },
    { name: 'Steve Sobande', code: 'ss' },
    { name: 'Mike Swanson', code: 'ms' },
    { name: 'Derek Crisafi', code: 'dc' }
];


const FriendPay = () => {
  const [friend, setFriend] = useState(null);
  const [amount, setAmount] = useState(null);
  const friendPaySuccessMessage = useRef(null);
  const friendPayFailMessage = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const onButtonClick = (e) => {
    e.preventDefault(); // prevents page from reloading
    if (friend && amount && selectedDate) {
      friendPaySuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: 'Bill Paid to Friend'});
      setFriend('');
      setAmount('');
      setSelectedDate('');
      // let payload = { name: 'John Doe', occupation: 'gardener' };
      // let res = axios.post('http://httpbin.org/post', payload);
    } else {
      friendPayFailMessage.current.show({severity: 'error', summary: 'Error:', detail: 'Complete All Steps'});
    };
  };

    return (
        <form onSubmit={onButtonClick}>
          <div className="grid">
              <div className="col-12">
                  <div className="card">
                      <h5>Step #1: Select a Friend</h5>
                      <ListBox value={friend} options={friendOptions} onChange={(e) => setFriend(e.value)} optionLabel="name" style={{ width: '15rem' }} />
                      <h5>Step #2: Enter a Payment Amount</h5>
                      <InputNumber value={amount} onValueChange={(e) => setAmount(e.value)} mode="currency" currency="USD" locale="en-US" required/>
                      <h5>Step #3: Select a Date</h5>
                      <Calendar id="selecteDate" value={selectedDate} onChange={(e) => setSelectedDate(e.value)} />
                      <h5>Step #4: Submit Payment</h5>
                      <Button label="Submit Payment" icon="pi pi-check-square" className="p-button-success"></Button>
                      <div classname="card">
                          <Messages ref={friendPaySuccessMessage} />
                          <Messages ref={friendPayFailMessage} />
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
