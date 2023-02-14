import React, { useEffect, useState, useRef } from 'react';
import { Chart } from 'primereact/chart';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { ToggleButton } from 'primereact/togglebutton';
import { Rating } from 'primereact/rating';
import { CustomerService } from '../service/CustomerService';
import { ProductService } from '../service/ProductService';
import { Toast } from 'primereact/toast';


const SavingsActivity = (props) => {
    const customerService = new CustomerService();
    const [initiallyRetrievedSavingsData, setInitiallyRetrievedSavingsData] = useState('');
    const [savingsData, setSavingsData] = useState('');
    const [filters, setFilters] = useState('');
    const downloadToast = useRef(null);


    //LOAD DATA//
    ////////////////////////////////
    ////////////////////////////////

    useEffect(() => {
      //customerService.getCustomersSavingsData().then(data => { setInitiallyRetrievedSavingsData(formatInitialDate(data));  });
      customerService.getCustomersSavingsData().then(data => { setInitiallyRetrievedSavingsData(data);  });
      initFilters();
      //setSavingsData(savingsDataLocalCopyParsed);
    },[]);
    if ("customerSavingsData" in sessionStorage && sessionStorage.getItem("customerSavingsData") !== null && sessionStorage.getItem("customerSavingsData") !== '""') { // check if data already exists in sessionStorage
      console.log('customerSavingsData already exists and is not null, so will use existing value from sessionStorage');
    } else {
      console.log('customerSavingsData does not exist, so will create from initial data load ');
      const customerSavingsString = JSON.stringify(initiallyRetrievedSavingsData); // stringify initiallyRetrievedTicketData, required for sessionStorage
      const savingsDataLocalCopy = sessionStorage.setItem('customerSavingsData', customerSavingsString); // store ticketsLocalCopy key data in localStorage
    }
    const savingsDataLocalCopyParsed = JSON.parse(sessionStorage.getItem("customerSavingsData"));
    console.log("typeof savingsDataLocalCopyParsed = " + typeof savingsDataLocalCopyParsed);
    console.log(savingsDataLocalCopyParsed);

    ////////////////////////////////
    ////////////////////////////////
    //END LOAD DATA//

    // format date string in intitially retrieved json
    const formatInitialDate = (data) => {
        return [...data || []].map(d => {
            d.transactionDate = new Date(d.transactionDate); //must translate value into date so that the DataTable utilizes the value correctly
            d.transactionDate.toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
            return d;
        });
    }


    const statuses = [
        'Paid', 'Received'
    ];

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const initFilters = () => {
        setFilters({
            'transactorName': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'transactionDate': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            'transactionAmount': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            'transactionStatus': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            'transactorPastActivity': { value: null, matchMode: FilterMatchMode.BETWEEN }
        });
    }

    const filterClearTemplate = (options) => {
        return <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} className="p-button-secondary"></Button>;
    }

    const filterApplyTemplate = (options) => {
        return <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} className="p-button-success"></Button>
    }

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.transactionDate);
    }

    const formatDate = (value) => {
        value = new Date(value);
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
    }

    const transactionAmountBodyTemplate = (rowData) => {
        return formatCurrency(rowData.transactionAmount);
    }

    const transactionAmountFilterTemplate = (options) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />
    }

    const statusBodyTemplate = (rowData) => {
        return <span className={`customer-badge status-${rowData.transactionStatus}`}>{rowData.transactionStatus}</span>;
    }

    const statusFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    }

    const statusItemTemplate = (option) => {
        return <span className={`customer-badge status-${option}`}>{option}</span>;
    }

    const activityBodyTemplate = (rowData) => {
        return <ProgressBar value={rowData.transactorPastActivity} showValue={false} style={{ height: '.5rem' }}></ProgressBar>;
    }

    const activityFilterTemplate = (options) => {
        return (
            <React.Fragment>
                <Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="m-3"></Slider>
                <div className="flex align-items-center justify-content-between px-2">
                    <span>{options.value ? options.value[0] : 0}</span>
                    <span>{options.value ? options.value[1] : 100}</span>
                </div>
            </React.Fragment>
        )
    }

    const searchBodyTemplate = () => {
        return <Button icon="pi pi-search" />;
    }

    const downloadData = () => {
        console.log('download requested');
        downloadToast.current.show({ severity: 'success', summary: 'Download Requested', detail: 'Starting Savings Download' });
    }

    const clearSessionStorage = () => {
        sessionStorage.removeItem('customerSavingsData');
    }

    return (
        <div className="grid p-fluid">
          <div className="col-12 lg:col-6">
            <div className="card flex flex-column align-items-center">
                <h5>Transaction Type</h5>
                <img src="images/dashboard/transactionType.png" style={{width: '100%'}}/>
            </div>
          </div>
          <div className="col-12 lg:col-6">
            <div className="card flex flex-column align-items-center">
                <h5>Account Comparison</h5>
                <img src="images/dashboard/accountComparison.png" style={{width: '100%'}}/>
            </div>
          </div>
          <div className="col-12 card">
              <div>
                <h5>Savings Transaction History &nbsp;&nbsp;
                <Toast ref={downloadToast} position="bottom-right"/>
                    <button onClick={downloadData} className="p-link layout-topbar-button" >
                      <i className="pi pi-cloud-download"/>
                    </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="p-link layout-topbar-button" style={{ color: 'transparent' }} onClick={clearSessionStorage} >
                      <i className="pi pi-minus"/>
                    </button>
                </h5>
              </div>
              <DataTable value={savingsDataLocalCopyParsed} sortField="transactionDate" sortOrder={-1} paginator className="p-datatable-gridlines" showGridlines rows={5} dataKey="transactionNumber" filters={filters} responsiveLayout="scroll" emptyMessage="No customers found.">
                  <Column sortable field="transactionDate" header="Transaction Date" dataType="date" style={{ minWidth: '8rem' }} body={dateBodyTemplate} filterField="transactionDate" filterElement={dateFilterTemplate} />
                  <Column sortable field="transactorName" header="Account Name" filter filterPlaceholder="Search by Name" style={{ minWidth: '12rem' }} />
                  <Column sortable field="transactionAmount" header="Transaction Amount" filterField="transactionAmount" dataType="numeric" style={{ minWidth: '10rem' }} body={transactionAmountBodyTemplate} filter filterElement={transactionAmountFilterTemplate} />
                  <Column sortable field="transactionStatus" header="Status" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusFilterTemplate} />
                  <Column sortable field="transactorPastActivity" header="Account Past Activity" showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={activityBodyTemplate} filter filterElement={activityFilterTemplate} />
              </DataTable>
          </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return (prevProps.location.pathname === nextProps.location.pathname) && (prevProps.colorMode === nextProps.colorMode);
};

export default React.memo(SavingsActivity, comparisonFn);
