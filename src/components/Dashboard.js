import React, { useState, useEffect, useRef } from 'react';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../service/ProductService';
import { Link } from 'react-router-dom';

import SignUpInfo from "./addAccountForm/SignUpInfo";
import PersonalInfo from "./addAccountForm/PersonalInfo";
import OtherInfo from "./addAccountForm/OtherInfo";
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';


const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Checking',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: .4
        },
        {
            label: 'Savings',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: .4
        }
    ]
};

const Dashboard = (props) => {
    const [products, setProducts] = useState(null);
    const menu1 = useRef(null);
    const menu2 = useRef(null);
    const [lineOptions, setLineOptions] = useState(null)

    const applyLightTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef',
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef',
                    }
                },
            }
        };

        setLineOptions(lineOptions)
    }

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    }
                },
            }
        };

        setLineOptions(lineOptions)
    }

    useEffect(() => {
        const productService = new ProductService();
        productService.getProductsSmall().then(data => setProducts(data));
    }, []);

    useEffect(() => {
        if (props.colorMode === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [props.colorMode]);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const [displayBasic, setDisplayBasic] = useState(false);
    const [position, setPosition] = useState('center');
    const formSuccessMessage = useRef(null);
    const formFailMessage = useRef(null);

    const dialogFuncMap = {
      'displayBasic': setDisplayBasic,
    }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
      nickname: "",
      birthday: "",
      otherFinancialInterests: "",
    });

    const FormTitles = ["Nickname", "Birth Date", "Financial Interests (Select Multiple)"];

    const PageDisplay = () => {
      if (page === 0) {
        return <SignUpInfo formData={formData} setFormData={setFormData} />;
      } else if (page === 1) {
        return <PersonalInfo formData={formData} setFormData={setFormData} />;
      } else {
        return <OtherInfo formData={formData} setFormData={setFormData} />;
      }
    };

    const formSubmitMessage = (e) => {
      //e.preventDefault(); // prevents page from reloading
      if (formData.nickname) {
        formSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: ' Personal Details Saved!'});
      } else {
        formFailMessage.current.show({severity: 'error', summary: 'Error:', detail: 'For Demo purposes, at a minimum, enter a nickname'});
      }
    };







    return (

        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Transactions</span>
                            <div className="text-900 font-medium text-xl" data-cs-capture=''>152</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i id="dashboardShoppingCartImage" className="pi pi-shopping-cart text-blue-500 text-xl"/>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">24 new </span>
                    <span className="text-500">since last visit</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Checking</span>
                            <div className="text-900 font-medium text-xl" data-heap-redact-text data-heaptextredactionexample>$5678.90</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i id="dashboardMapMarkerImage" className="pi pi-map-marker text-orange-500 text-xl"/>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">+52% </span>
                    <span className="text-500">since last week</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Savings</span>
                            <div className="text-900 font-medium text-xl" data-heap-redact-text data-heaptextredactionexample>$1234.56</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i id="dashboardInboxImage" className="pi pi-inbox text-cyan-500 text-xl"/>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">+24%</span>
                    <span className="text-500">since last week</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Credit Card Offers</span>
                            <div className="text-900 font-medium text-xl">
                              <Link id="linkToCreditCardOffers" to='/creditCardOffer'>1 Unread</Link>
                            </div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i id="dashboardTextBubbleImage" className="pi pi-comment text-purple-500 text-xl"/>
                        </div>
                    </div>

                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Balances</h5>
                    <img src="images/dashboard/balances.png" style={{width: '100%'}}/>
                </div>
            </div>

            <div className="col-12 xl:col-6">
            <div className="card">
                <div className="flex align-items-center justify-content-between mb-4">
                    <h5>Notifications</h5>
                    <div>
                        <Button type="button" icon="pi pi-ellipsis-v" className="p-button-rounded p-button-text p-button-plain" onClick={(event) => menu2.current.toggle(event)}/>
                        <Menu ref={menu2} popup model={[{label: 'Add New', icon: 'pi pi-fw pi-plus'}, {label: 'Remove', icon: 'pi pi-fw pi-minus'}]}/>
                    </div>
                </div>

                <span className="block text-600 font-medium mb-3">TODAY</span>
                <ul className="p-0 mx-0 mt-0 mb-4 list-none">
                    <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                        <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            <i className="pi pi-dollar text-xl text-blue-500"/>
                        </div>
                        <span className="text-900 line-height-3">Richard Jones
        <span className="text-700"> has sent you <span className="text-blue-500">$79</span></span>
      </span>
                    </li>
                    <li className="flex align-items-center py-2">
                        <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0">
                            <i className="pi pi-download text-xl text-orange-500"/>
                        </div>
                        <span className="text-700 line-height-3">Your request for withdrawal of <span className="text-blue-500 font-medium">$2500</span> has been initiated.</span>
                    </li>
                </ul>

                <span className="block text-600 font-medium mb-3">YESTERDAY</span>
                <ul className="p-0 m-0 list-none">
                    <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                        <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            <i className="pi pi-dollar text-xl text-blue-500"/>
                        </div>
                        <span className="text-900 line-height-3">Keyser Wick
        <span className="text-700"> has sent you <span className="text-blue-500">$55</span></span>
      </span>
                    </li>

                </ul>
            </div>
            </div>









        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return (prevProps.location.pathname === nextProps.location.pathname) && (prevProps.colorMode === nextProps.colorMode);
};

export default React.memo(Dashboard, comparisonFn);
