import React, { useRef, useState } from 'react';
import { SelectButton } from 'primereact/selectbutton';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import { ListBox } from 'primereact/listbox';


const CreditCardOffer = () => {
  const accountTypes = ['Savings', 'Checking'];
  const [accountType, setAccountType] = useState('Savings');
  const [showchecking, setShowChecking] = useState(false)
  const [showSavings, setShowSavings] = useState(true)
  const [showBillPay, setShowBillPay] = useState(false)
  const depositSuccessMessage = useRef(null);
  const depositFailMessage = useRef(null);
  const [savingsAccountIndOrJoint, setSavingsAccountIndOrJoint] = useState('Individual');
  const [savingsWithholding, setSavingsWithholding] = useState('No');
  const [savingsFirstName, setSavingsFirstName] = useState('')
  const [savingsLastName, setSavingsLastName] = useState('')
  const [savingsMiddleInitial, setSavingsMiddleInitial] = useState('')
  const [savingsPhoneNumber, setSavingsPhoneNumber] = useState('')
  const [savingsEmailAddress, setSavingsEmailAddress] = useState('')
  const [savingsOccupation, setSavingsOccupation] = useState('')
  const [savingsSelectAnnualIncome, setSavingsSelectAnnualIncome] = useState(null)
  const [savingsSelectNetWorth, setSavingsSelectNetWorth] = useState(null)
  const [savingsSourceOfNetWorth, setSavingsSourceOfNetWorth] = useState(null)
  const [savingsExpectedUseOfAccount, setSavingsExpectedUseOfAccount] = useState(null)
  const [savingsAccountUsageFrequency, setSavingsAccountUsageFrequency] = useState(null)
  const [savingsAccountDisclosure, setSavingsAccountDisclosure] = useState('Yes');
  const savingsAccountSuccessMessage = useRef(null);
  const savingsAccountFailMessage = useRef(null);

  const [checkingAccountIndOrJoint, setCheckingAccountIndOrJoint] = useState('Individual');
  const [checkingWithholding, setCheckingWithholding] = useState('No');
  const [checkingFirstName, setCheckingFirstName] = useState('')
  const [checkingLastName, setCheckingLastName] = useState('')
  const [checkingMiddleInitial, setCheckingMiddleInitial] = useState('')
  const [checkingPhoneNumber, setCheckingPhoneNumber] = useState('')
  const [checkingEmailAddress, setCheckingEmailAddress] = useState('')
  const [checkingOccupation, setCheckingOccupation] = useState('')
  const [checkingSelectAnnualIncome, setCheckingSelectAnnualIncome] = useState(null)
  const [checkingSelectNetWorth, setCheckingSelectNetWorth] = useState(null)
  const [checkingSourceOfNetWorth, setCheckingSourceOfNetWorth] = useState(null)
  const [checkingExpectedUseOfAccount, setCheckingExpectedUseOfAccount] = useState(null)
  const [checkingAccountUsageFrequency, setCheckingAccountUsageFrequency] = useState(null)
  const [checkingAccountDisclosure, setCheckingAccountDisclosure] = useState('Yes');
  const checkingAccountSuccessMessage = useRef(null);
  const checkingAccountFailMessage = useRef(null);
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

  const savingsWithholdingOptions = ['No', 'Yes'];
  const savingsDisclosureAgreement = ['No', 'Yes'];

  const savingsSelectAnnualIncomeItems = [
    {label: '0-50k', value: '0-50k'},
    {label: '50k-100k', value: '50k-100k'},
    {label: '100k-250k', value: '100k-250k'},
    {label: '250k-1mil', value: '250k-1mil'},
    {label: '1mil+', value: '1mil+'}
  ];

  const savingsSelectNetWorthItems = [
    {label: '0-50k', value: '0-50k'},
    {label: '50k-100k', value: '50k-100k'},
    {label: '100k-250k', value: '100k-250k'},
    {label: '250k-1mil', value: '250k-1mil'},
    {label: '1mil+', value: '1mil+'}
  ];

  const savingsSourceOfNetWorthOptions = [
    {label: 'Employment', value: 'Employment'},
    {label: 'Inheritance', value: 'Inheritance'},
  ];

  const savingsExpectedUseOfAccountOptions = [
    {label: 'Savings', value: 'Savings'},
    {label: 'Transfers', value: 'Transfers'},
    {label: 'Bills', value: 'Bills'},
  ];

  const savingsAccountUsageFrequencyOptions = [
    {label: '1-2 Times a Week', value: '1-2 Times a Week'},
    {label: '5-10 Times a Week', value: '5-10 Times a Week'},
    {label: 'Less than Once a Week', value: 'Less than Once a Week'},
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const onClick = (itemIndex) => {
      let _activeIndex = activeIndex ? [...activeIndex] : [];

      if (_activeIndex.length === 0) {
          _activeIndex.push(itemIndex);
      } else {
          const index = _activeIndex.indexOf(itemIndex);

          if (index === -1) {
              _activeIndex.push(itemIndex);
          } else {
              _activeIndex.splice(index, 1);
          }
      }

      setActiveIndex(_activeIndex);
  };

  const accountTypeButtonClick = (buttonClickValue) => {
    setAccountType(buttonClickValue)
    if(buttonClickValue == "Savings") {
      console.log(buttonClickValue);
      setShowSavings(true);
      setShowChecking(false);
      setShowBillPay(false);
    } else if (buttonClickValue == "Checking") {
      console.log(buttonClickValue);
      setShowChecking(true);
      setShowSavings(false);
      setShowBillPay(false);
    } else {
      console.log(buttonClickValue);
      setShowBillPay(true)
      setShowChecking(false);
      setShowSavings(false);
    }
  }

  const onSavingsButtonClick = (e) => {
    e.preventDefault(); // prevents page from reloading
    if (savingsLastName && savingsFirstName) {
      savingsAccountSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: 'Savings Account Submitted for Processing'});
    } else {
      savingsAccountFailMessage.current.show({severity: 'error', summary: 'Error:', detail: 'For Demo purposes, at a minimum, enter the First and Last Name'});
    }
  };

  const onCheckingButtonClick = (e) => {
    e.preventDefault(); // prevents page from reloading
    if (checkingLastName && checkingFirstName) {
      checkingAccountSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: 'Checking Account Submitted for Processing'});
    } else {
      checkingAccountFailMessage.current.show({severity: 'error', summary: 'Error:', detail: 'For Demo purposes, at a minimum, enter the First and Last Name'});
    }
  };

    return (
        <div className="grid p-fluid">
            <div className="col-12">
                <div className="card lg:col-6">
                  <h5><b>Congratulations!</b></h5>
                  <h5>We're offering a Low Interest Credit Card!</h5>
                  <h6>Would you be interested in a credit card with <b>Money Back</b>?</h6>
                  <h6>Complete the form below and we'll take care of the rest!</h6>
                  <img src="./images/creditCardOffer/creditCard.png" width="250" height="150" alt="image" />
                </div>
                    <div className="card" id="savings">
                      <form onSubmit={onSavingsButtonClick}>
                      </form>
                  </div>
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(CreditCardOffer, comparisonFn);
