import React from "react";
import { Calendar } from 'primereact/calendar';

function PersonalInfo({ formData, setFormData }) {
  return (
    <div className="personal-info-container">

      <div className="field col-12 md:col-4">
        <Calendar id="birthday" placeholder="ex: 01/01/1990"value={formData.birthday} onChange={(e) => setFormData({ ...formData, birthday: e.target.value })} />
      </div>

    </div>
  );
}

export default PersonalInfo;
