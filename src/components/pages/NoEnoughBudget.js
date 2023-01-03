import React from "react";
import "./Style.css";

function NoEnoughBudget(props) {
  let height = props.height;
    const sendFalseToPerent = () => {
        props.onClick(false);
    }

  return (
    <>
      <div className="editcontent" style={{ height: `${height}px` }}>
        <div className="EditconfoBox">
          <div className="editcontenthad">
            <div className="edithade"> You have not enough budget for this.</div>
          </div>
          <div className="editlinksbox">
            <button style={{ background: "none", border: "none", width:'100%', height:'inherit' }} onClick={sendFalseToPerent}>OK</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoEnoughBudget;
