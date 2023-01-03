import React from "react";
import "./Style.css";
import { supabase } from "../../supabaseClient";
import { useHistory } from "react-router-dom";
import { useState } from "react";

function PopupSelectAtleast1(props) {
  let height = props.height;

    const sendFalseToPerent = () => {
        props.onClick(false);
    }

  return (
    <>
      <div className="editcontent" style={{ height: `${height}px` }}>
        <div className="EditconfoBox">
          <div className="editcontenthad">
            <div className="edithade">Please select at least 1 player</div>
          </div>
          <div className="editlinksbox">
            <button style={{ background: "none", border: "none", width:'100%', height:'inherit' }} onClick={sendFalseToPerent}>OK</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopupSelectAtleast1;
