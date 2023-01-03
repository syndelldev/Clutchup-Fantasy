import React from "react";
import { useHistory, useLocation } from "react-router-dom";

function ConforPsmpopup(props) {
  const history = useHistory();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();
  async function UpdateUserPlayer(e) {
    history.push({
      pathname: "/Mainlogin/",
      state: location,
    });
  }
  return (
    <>
      <div className="editcontent">
        <div className="EditconfoBox">
          <div className="editcontenthad">
            <div className="edithade">
              Reset password link sent to your email id....
            </div>
          </div>
          <div className="editlinksbox">
            <button
              style={{ background: "none", border: "none", width:'100%', height:'inherit' }}
              onClick={UpdateUserPlayer}
            >
              YES
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConforPsmpopup;
