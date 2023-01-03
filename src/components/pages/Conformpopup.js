import { height } from "@mui/system";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

function Conformpopup(props) {
  const history = useHistory();
  const location = useLocation();
  const email = props.email
  const userDetails = {
    username:location.state.username,
    teamname:location.state.teamname,
    email:email
  }
   const registr = () => {
    history.push({
      pathname: "/WelcomesScreen/",
      state: userDetails,
    });
  }

  return (
    <>
      <div className="editcontent">
        <div className="EditconfoBox">
          <div className="editcontenthad">
            <div className="edithade">Please confirm your email...</div>
          </div>
          <div className="editlinksbox">
            <button
              style={{ background: "none", border: "none", width:'100%', height:'inherit' }}
              onClick={registr}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Conformpopup;
