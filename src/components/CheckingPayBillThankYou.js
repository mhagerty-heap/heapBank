import React, { useState, useRef, useEffect } from 'react';
import { ListBox } from 'primereact/listbox';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import { Calendar } from 'primereact/calendar';
import { CustomerService } from '../service/CustomerService';
import axios from 'axios';

const CheckingPayBillThankYou = () => {

  return (
      <div className="grid p-fluid">
          <div className="col-12">
              <div className="card lg:col-6">
                <h5><b>Thank you for paying your bill with BankOne!</b></h5>
                <h5>Your checking statement will be updated shortly.</h5>
                <img src="./images/marketing/logo/logo-gray-black.png" width="170" height="50" alt="image" />
              </div>
          </div>
      </div>
  );

};


const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(CheckingPayBillThankYou, comparisonFn);
