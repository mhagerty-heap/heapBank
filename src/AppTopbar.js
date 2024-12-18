import React, { useState, useRef, useEffect } from "react";
import SignUpInfo from "./components/addAccountForm/SignUpInfo";
import PersonalInfo from "./components/addAccountForm/PersonalInfo";
import OtherInfo from "./components/addAccountForm/OtherInfo";
import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';

import { Link } from 'react-router-dom';
import classNames from 'classnames';


export const AppTopbar = (props) => {

  // useEffect(() => {
  //     //if nickname data is available locally, use it, otherwise load default list
  //     if ("customerNickname" in sessionStorage && sessionStorage.getItem("customerNickname") !== null && sessionStorage.getItem("customerNickname") !== '""') { // check if data already exists in sessionStorage
  //       setCustomerNickname(customerCustomerNicknameParsed);
  //     }
  // },[]);

  const [displayBasic, setDisplayBasic] = useState(false);
  const [position, setPosition] = useState('center');
  const formSuccessMessage = useRef(null);
  const formFailMessage = useRef(null);
  const [customerNickname, setCustomerNickname] = useState('');
  const customerCustomerNicknameParsed = JSON.parse(sessionStorage.getItem("customerNickname"));

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
      //console.log(formData.nickname);
      const newNickname = "Welcome, " + formData.nickname + "!";
      //console.log("newNickname = " + newNickname);
      setCustomerNickname(newNickname);
      //console.log('customerNickname = ' + customerNickname);
      //const nicknameDataString = JSON.stringify(customerNickname);
      //const customerNicknameDataLocalCopy = sessionStorage.setItem('customerNickname', nicknameDataString); // store updated ticketsLocalCopy sessionStorage
      formSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: ' Personal Details Saved!'});
    } else {
      formFailMessage.current.show({severity: 'error', summary: 'Error:', detail: 'For Demo purposes, at a minimum, enter the nickname'});
    }
  };

  const signOut = () => {
      window.heap.resetIdentity();
      console.log("reset Heap Identity");
      window.location = '/signin.html';
  }

  const style3 = {
    alignSelf: 'flex-end'
  };

    return (
        <div className="layout-topbar">

            <a href="/main.html" >
                <img id="mainLogo" width="170" height="50" src={props.layoutColorMode === 'light' ? 'images/marketing/logo/logo-gray-black.png' : 'images/marketing/logo/logo-gray-white.png'} alt="logo"/>
            </a>

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars"/>
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>


                <ul className={classNames("layout-topbar-menu lg:flex origin-top", {'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                    <li>
                    <Messages ref={formSuccessMessage} />
                    <Messages ref={formFailMessage} />
                    </li>

                    <li>
                        <Button label={customerNickname} icon="pi pi-user-edit"  className="p-button-success" onClick={() => setDisplayBasic(true)}></Button>
                    </li>
                    <li>
                        <a href="/adminScreen">
                          <button className="p-link layout-topbar-button" id="adminScreenButton">
                              <i className="pi pi-cog"/>
                              <span>Admin</span>
                          </button>
                        </a>
                        <button className="p-link layout-topbar-button" id="adminScreenButton" onClick={() => signOut()}>
                            <i className="pi pi-sign-out"/>
                        </button>
                    </li>
                </ul>

                <Dialog header="Personalize your Banking Experience" visible={displayBasic} style={{ width: '30vw' }} onHide={() => {console.log("clicked close button"); setDisplayBasic(false);}}>
                  <div className="progressbar">
                    <div style={{ width: page === 0 ? "33.3%" : page == 1 ? "66.6%" : "100%" }}></div>
                  </div>
                  <div className="form-container">
                    <div className="header">
                      <h5>{FormTitles[page]}</h5>
                    </div>
                    <div className="body">{PageDisplay()}</div><h5></h5>
                    <div className="footer">

                      <Button disabled={page == 0} label="Previous" onClick={() => {setPage((currPage) => currPage - 1)}} />
                      &nbsp;&nbsp;
                      <Button label={page === FormTitles.length - 1 ? "Submit" : "Next"} onClick={() => {
                        if (page === FormTitles.length - 1) {
                          console.log(formData);
                          setDisplayBasic(false);
                          formSubmitMessage();
                        } else {
                          setPage((currPage) => currPage + 1);
                        }

                      }} />
                    </div>
                  </div>
                </Dialog>




        </div>
    );
}
