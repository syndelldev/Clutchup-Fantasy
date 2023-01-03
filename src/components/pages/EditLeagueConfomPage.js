import React, { useState } from "react";
import "./Style.css";

import { supabase } from "../../supabaseClient";
import { useHistory } from "react-router-dom";

function EditLeagueConfomPage(props) {
  const [state, setstate] = useState(false);
  const { email,leaguename, userEnteredTeamCode, updateLeagueCode, userActualTeamCode } =
    props;
  const history = useHistory();
  let height = props.height;
  console.log(email);
  console.log(userEnteredTeamCode);
  console.log(updateLeagueCode);
  console.log(userActualTeamCode);

  const updateTeamCode = async (props) => {
    if (userEnteredTeamCode === userActualTeamCode) {
      const { error } = await supabase
        .from("createnewleague")
        .update({ leaguecode: updateLeagueCode.toLowerCase() })
        .match({email: email ,leaguename: leaguename });
        cancleUpdate()

    } else {
      alert("Teamcode does not match");
      setstate(true);
      cancleUpdate()
    }
    setTimeout(function () {
      window.location.reload('/league-mgmt-screen/');
  }, 500);
  };
  const cancleUpdate = async () => {
   props.onClick(false);
  };
  return (
    <>
      <div className="editcontent" style={{ height: `${height}px` }}>
        <div className="EditconfoBox">
          <div className="editcontenthad">
            <div className="edithade">Are you Sure?</div>
            {/* <div className="Changingwill">Changing will do blah to blah</div> */}
            {state && (
                      <small className="d-block mb-1 red">
                        Teamcode does not match.
                      </small>
                    )}
          </div>
          
          
          
          <div className='buttonscontents'>
          <button className="editbutton"style={{borderLeft:'none'}} onClick={cancleUpdate}>
              Cancel
            </button>
            <button className="editbutton" onClick={updateTeamCode}>
              Yes
            </button>
          </div>
            
         
        </div>
      </div>
    </>
  );
}

export default EditLeagueConfomPage;
