import React from "react";
import "./Style.css";

function MoreThen10(props) {
  let height = props.height;
    const sendFalseToPerent = () => {
        props.onClick(false);
    }

  return (
    <>
      <div className="editcontent" style={{ height: `${height}px` }}>
        <div className="EditconfoBox">
          <div className="editcontenthad">
            <div className="edithade">You can't choose more than 10 players.</div>
          </div>
          <div className="editlinksbox">
            <button style={{ background: "none", border: "none", width:'100%', height:'inherit' }} onClick={sendFalseToPerent}>OK</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoreThen10;
