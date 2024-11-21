import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Route, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppConfig } from './AppConfig';

import Dashboard from './components/Dashboard';
import ButtonDemo from './components/ButtonDemo';
import ChartDemo from './components/ChartDemo';
import Documentation from './components/Documentation';
import FileDemo from './components/FileDemo';
import FloatLabelDemo from './components/FloatLabelDemo';
import FormLayoutDemo from './components/FormLayoutDemo';
import InputDemo from './components/InputDemo';
import ListDemo from './components/ListDemo';
import MenuDemo from './components/MenuDemo';
import MessagesDemo from './components/MessagesDemo';
import MiscDemo from './components/MiscDemo';
import OverlayDemo from './components/OverlayDemo';
import MediaDemo from './components/MediaDemo';
import PanelDemo from './components/PanelDemo';
import TableDemo from './components/TableDemo';
import CheckingActivity from './components/CheckingActivity';
import SavingsActivity from './components/SavingsActivity';
import TreeDemo from './components/TreeDemo';
import InvalidStateDemo from './components/InvalidStateDemo';
import BlocksDemo from './components/BlocksDemo';
import IconsDemo from './components/IconsDemo';
import MakeATransfer from './components/MakeATransfer';
import CheckingDeposit from './components/CheckingDeposit';
import CheckingPayBill from './components/CheckingPayBill';
import SavingsDeposit from './components/SavingsDeposit';
import SavingsPayBill from './components/SavingsPayBill';
import AddAccounts from './components/AddAccounts';
import AddAccountForm from './components/AddAccountForm';
import ApplyForOurCard from './components/ApplyForOurCard';
import FriendPay from './components/FriendPay';
import AddBillPayAccount from './components/AddBillPayAccount';
import AddFriendPayFriend from './components/AddFriendPayFriend';
import CreditCardOffer from './components/CreditCardOffer'
import CreditCardOfferThankYou from './components/CreditCardOfferThankYou';
import AdminScreen from './components/AdminScreen';
import TestComponent from './components/TestComponent';
import CheckingPayBillThankYou from './components/CheckingPayBillThankYou';
import SavingsPayBillThankYou from './components/SavingsPayBillThankYou';
import TransferThankYou from './components/TransferThankYou';

import Crud from './pages/Crud';
import EmptyPage from './pages/EmptyPage';
import TimelineDemo from './pages/TimelineDemo';
import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';


import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './assets/demo/flags/flags.css';
import './assets/demo/Demos.scss';
import './assets/layout/layout.scss';
import './App.scss';

import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const App = () => {
    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState('light')
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();

    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    }

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value)
    }

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode)
    }

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode)
    }

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    }

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive((prevState) => !prevState);
            }
        }
        else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    }

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }
    const isDesktop = () => {
        return window.innerWidth >= 992;
    }

    const menu = [
        {
            label: 'Home',
            items: [{
                label: 'Banking Home', icon: 'pi pi-fw pi-home', to: '/'
            }]
        },
        {
            label: 'Checking (XX91)',
            items: [
                { label: 'Activity', icon: 'pi pi-fw pi-list', to: '/checkingActivity' },
                { label: 'Deposit', icon: 'pi pi-fw pi-wallet', to: '/checkingDeposit' },
                { label: 'Pay Bill', icon: 'pi pi-fw pi-send', to: '/checkingPayBill' }
            ]
        },
        {
            label: 'Savings (XX45)',
            items: [
                { label: 'Activity', icon: 'pi pi-fw pi-list', to: '/savingsActivity' },
                { label: 'Deposit', icon: 'pi pi-fw pi-wallet', to: '/savingsDeposit' },
                { label: 'Pay Bill', icon: 'pi pi-fw pi-send', to: '/savingsPayBill' }
            ]
        },
        {
            label: 'Transfers',
            items: [
                { label: 'Make a Transfer', icon: 'pi pi-fw pi-arrows-h', to: '/makeatransfer' },
            ]
        },
        {
            label: 'Add Accounts',
            items: [
                { label: 'Add Savings/Checking Accounts', icon: 'pi pi-fw pi-pencil', to: '/addAccounts' },
                { label: 'Add Bill Pay Accounts', icon: 'pi pi-fw pi-send', to: '/addBillPayAccount' }
            ]
        },
        {
            label: 'Pay a Friend',
            items: [
                { label: 'FriendPay', icon: 'pi pi-fw pi-money-bill', to: '/friendPay', badge: "NEW" },
                { label: 'Add a Friend', icon: 'pi pi-fw pi-user', to: '/addFriendPayFriend', badge: "NEW" },
            ]
        },
        {
            label: 'Take a Tour',
            items: [
                { label: 'BankOne Tour', icon: 'pi pi-fw pi-sitemap', badge: "NEW", command: () => {driverObj.drive();} },
            ]
        }
    ];

    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false,
        'layout-theme-light': layoutColorMode === 'light'
    });

    const driverObj = driver({
      showProgress: true,
      steps: [
        { element: '#tour-example', popover: { title: 'BankOne Tour', description: 'Welcome to BankOne!  Let\'s take a quick look at your BankOne experience!', side: "left", align: 'start' }},
        { element: '#root > div > div.layout-sidebar > div > ul > li:nth-child(1)', popover: { title: 'Banking Home', description: 'This is your Banking Homeg screen, where you can get a high-level overview of your accounts.', side: "bottom", align: 'start' }},
        { element: '#root > div > div.layout-sidebar > div > ul > li:nth-child(2)', popover: { title: 'Checking', description: 'This is where you interact with your Checking accounts.', side: "bottom", align: 'start' }},
        { element: '#root > div > div.layout-sidebar > div > ul > li:nth-child(3)', popover: { title: 'Savings', description: 'This is where you interact with your Savings accounts.', side: "bottom", align: 'start' }},
        { element: '#root > div > div.layout-sidebar > div > ul > li:nth-child(4)', popover: { title: 'Transfers', description: 'This is where you perform account transfers.', side: "bottom", align: 'start' }},
        { element: '#root > div > div.layout-sidebar > div > ul > li:nth-child(5)', popover: { title: 'Add Accounts', description: 'This is where you can add new accounts.', side: "bottom", align: 'start' }},
        { element: '#root > div > div.layout-sidebar > div > ul > li:nth-child(6)', popover: { title: 'Pay a Friend', description: 'This is where you can pay your friends.', side: "bottom", align: 'start' }},
        { element: '#root > div > div.layout-topbar > ul > li:nth-child(2)', popover: { title: 'Personalize', description: 'This is where you can personalize your banking experience.', side: "bottom", align: 'start' }},
        { popover: { title: 'Happy Banking!!', description: 'That\'s it! Enjoy banking with BankOne!' } }
      ]
    });

    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

            <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode}
                mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />

            <div className="layout-sidebar" onClick={onSidebarClick}>
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
            </div>

            <div className="layout-main-container">
                <div className="layout-main">
                    <Route path="/" exact render={() => <Dashboard colorMode={layoutColorMode} location={location} />} />
                    <Route path="/formlayout" component={FormLayoutDemo} />
                    <Route path="/input" component={InputDemo} />
                    <Route path="/floatlabel" component={FloatLabelDemo} />
                    <Route path="/invalidstate" component={InvalidStateDemo} />
                    <Route path="/button" component={ButtonDemo} />
                    <Route path="/table" component={TableDemo} />
                    <Route path="/list" component={ListDemo} />
                    <Route path="/tree" component={TreeDemo} />
                    <Route path="/panel" component={PanelDemo} />
                    <Route path="/overlay" component={OverlayDemo} />
                    <Route path="/media" component={MediaDemo} />
                    <Route path="/menu" component={MenuDemo} />
                    <Route path="/messages" component={MessagesDemo} />
                    <Route path="/blocks" component={BlocksDemo} />
                    <Route path="/icons" component={IconsDemo} />
                    <Route path="/file" component={FileDemo} />
                    <Route path="/chart" render={() => <ChartDemo colorMode={layoutColorMode} location={location} />} />
                    <Route path="/misc" component={MiscDemo} />
                    <Route path="/timeline" component={TimelineDemo} />
                    <Route path="/crud" component={Crud} />
                    <Route path="/empty" component={EmptyPage} />
                    <Route path="/makeatransfer" component={MakeATransfer} />
                    <Route path="/documentation" component={Documentation} />
                    <Route path="/checkingActivity" component={CheckingActivity} />
                    <Route path="/savingsActivity" component={SavingsActivity} />
                    <Route path="/checkingDeposit" component={CheckingDeposit} />
                    <Route path="/checkingPayBill" component={CheckingPayBill} />
                    <Route path="/savingsDeposit" component={SavingsDeposit} />
                    <Route path="/savingsPayBill" component={SavingsPayBill} />
                    <Route path="/addAccounts" component={AddAccounts} />
                    <Route path="/applyForOurCard" component={ApplyForOurCard} />
                    <Route path="/friendPay" component={FriendPay} />
                    <Route path="/addBillPayAccount" component={AddBillPayAccount} />
                    <Route path="/addFriendPayFriend" component={AddFriendPayFriend} />
                    <Route path="/creditCardOffer" component={CreditCardOffer} />
                    <Route path="/creditCardOfferThankYou" component={CreditCardOfferThankYou} />
                    <Route path="/addAccountForm" component={AddAccountForm} />
                    <Route path="/adminScreen" component={AdminScreen} />
                    <Route path="/testComponent" component={TestComponent} />
                    <Route path="/checkingPayBillThankYou" component={CheckingPayBillThankYou} />
                    <Route path="/savingsPayBillThankYou" component={SavingsPayBillThankYou} />
                    <Route path="/transferThankYou" component={TransferThankYou} />
                </div>

                <AppFooter layoutColorMode={layoutColorMode} />
            </div>

            <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>

        </div>
    );

}

export default App;
