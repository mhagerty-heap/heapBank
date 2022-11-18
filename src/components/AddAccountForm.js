import React, { useState, useRef } from "react";
import SignUpInfo from "./addAccountForm/SignUpInfo";
import PersonalInfo from "./addAccountForm/PersonalInfo";
import OtherInfo from "./addAccountForm/OtherInfo";
import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';


function AddAccountForm() {

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
      formFailMessage.current.show({severity: 'error', summary: 'Error:', detail: 'For Demo purposes, at a minimum, enter the nickname'});
    }
  };

  return (
    <div className="form card">
    <Messages ref={formSuccessMessage} />
    <Messages ref={formFailMessage} />
      <Button label="Show" icon="pi pi-external-link" onClick={() => setDisplayBasic(true)}/>
      <Dialog header="Tell us about yourself" visible={displayBasic} style={{ width: '30vw' }} onHide={() => {console.log("clicked close button"); setDisplayBasic(false);}}>
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

export default AddAccountForm;
