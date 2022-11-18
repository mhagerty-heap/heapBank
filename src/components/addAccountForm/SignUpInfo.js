import React from "react";
import { InputText } from 'primereact/inputtext';


function SignUpInfo({ formData, setFormData }) {
  return (

    <div className="sign-up-container">
      <div className="field col-12 md:col-4">
        <InputText placeholder="Nickname..." value={formData.nickname} onChange={(event) => setFormData({ ...formData, nickname: event.target.value } )}/>
      </div>
    </div>

  );
}

export default SignUpInfo;
