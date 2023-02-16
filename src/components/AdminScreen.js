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

const AdminScreen = () => {
  const deleteToast = useRef(null);

  const deleteCheckingData = () => {
    sessionStorage.removeItem('customerCheckingData');
    deleteToast.current.show({severity:'success', summary: 'Success', detail:'Checking Data Deleted'});
  }

  const deleteSavingsData = () => {
    sessionStorage.removeItem('customerSavingsData');
    deleteToast.current.show({severity:'success', summary: 'Success', detail:'Savings Data Deleted'});
  }

  const deleteAccountData = () => {
    sessionStorage.removeItem('customerBillPayAccountsData');
    deleteToast.current.show({severity:'success', summary: 'Success', detail:'Account Data Deleted'});
  }

  const deleteFriendData = () => {
    sessionStorage.removeItem('customerFriendData');
    deleteToast.current.show({severity:'success', summary: 'Success', detail:'Friend Data Deleted'});
  }

  const deleteAllData = () => {
    sessionStorage.removeItem('customerCheckingData');
    sessionStorage.removeItem('customerSavingsData');
    sessionStorage.removeItem('customerBillPayAccountsData');
    sessionStorage.removeItem('customerFriendData');
    deleteToast.current.show({severity:'success', summary: 'Success', detail:'All Data Deleted'});
  }



    return (
          <div className="grid">
            <div className="card">
              <h5>Admin Settings</h5>
              <Toast ref={deleteToast} />
              <div className="col-12">
                  <Button label="Reset Checking Demo Data" onClick={deleteCheckingData}/>
              </div>
              <div className="col-12">
                  <Button label="Reset Savings Demo Data" onClick={deleteSavingsData}/>
              </div>
              <div className="col-12">
                  <Button label="Reset Account List Data" onClick={deleteAccountData}/>
              </div>
              <div className="col-12">
                  <Button label="Reset Friend Data" onClick={deleteFriendData}/>
              </div>
              <div className="col-12">
              </div>
              <div className="col-12">
              </div>
              <div className="col-12">
                  <Button label="Reset All Demo Data" severity="danger" onClick={deleteAllData}/>
              </div>
            </div>
          </div>

    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(AdminScreen, comparisonFn);
