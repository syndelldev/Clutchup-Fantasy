import React, { useState } from "react";
import "./Style.css";
import { supabase } from "../../supabaseClient";


export default function (props) {
  let height = props.height;
  const email = props.email;
  const teamName = props.teamName;
  const [teamCode, setTeamCode] = useState(null);
  const [isValidLeague, setIsValidLeague] = useState(false);
  const [isValidEntercode, setIsValidEntercode] = useState(false);
  const [existLeagueName, setExistLeagueName] = useState(false);
  const [isSuccfullyEntercode, setIsSuccfullyEntercode] = useState(false);
  let [uiLeagueName, setUiLeagueName] = useState("");
  let leagueName;
  let leagueCode;

  const handleTeamCode = async (e) => {
    const { value } = e.target;
    if (e.target.value === " ") {
      setIsValidLeague(true);
      setIsValidEntercode(false);
      setExistLeagueName(false);
      setTeamCode(e.target.value);
      return;
    } else {
      setIsValidLeague(false);
      setIsValidEntercode(false);
      setExistLeagueName(false);
      setTeamCode(e.target.value);
    }
  };
  console.log("ereoe", isValidEntercode);
  const closebutton = () => {
    props.onClick(false);
  };
  const handleEnterCompetition = async () => {
    console.log("asdgf",teamCode);
    // =================================== validation part============================
    if (teamCode === null) {
      setIsValidLeague(true);
      setIsValidEntercode(false)
    } else {
      setIsValidLeague(false);
      // ================================ supabse select querys ================================
      const { data, error } = await supabase
        .from("createnewleague")
        .select()
        .match({ leaguecode: teamCode.toLowerCase() });
      console.log(data);

      if (data[0] !== undefined || null) {
        leagueName = data[0].leaguename;
        leagueCode = data[0].leaguecode;
        setUiLeagueName(leagueName);
      }

      if (data[0] === undefined || null) {
        setIsValidEntercode(true);
      } else {
        setIsValidEntercode(false);
        // ======================================supabse match query ===============================
        const { data, error } = await supabase
          .from("league")
          .select()
          .match({ email: email });
        let existLeagueName = data.filter((userJoinedLeague) => {
          return userJoinedLeague.teamcode === teamCode.toLowerCase();
        });
        console.log(existLeagueName);

        if (existLeagueName[0]) {
          setExistLeagueName(true);
        } else {
          // --------------------------store data in supabase------------------------------------
          const { data, error } = await supabase.from("league").insert({
            leaguename: leagueName,
            teamcode: leagueCode,
            email: email,
            teamname: teamName,
            type:'Private',
          });
          setIsSuccfullyEntercode(true);
          setTimeout(function () {
            window.location.reload('/landing-screen/');
        }, 1500);
        }
      }
    }
  };

  return (
    <>
      <div className="editcontent " style={{ height: `${height}px` }}>
        <div className="h-100">

        
        <div className="EditBox">
          <div className="crosebtn">
            <a className="closebutton" onClick={closebutton}>
              ×
            </a>
          </div>
          <div className="mt-0 edithad">Join Private Pools</div>
          <div style={{ width: "98%", height: 150 }}>
            <div className="user-input-wrp">
              <br />
              <input
                onChange={handleTeamCode}
                value={teamCode}
                autoCorrect="off"
                autoComplete="off"
                id="League"
                type="text"
                className="inputText"
                required
              />
              <span className="floating-label">Your league code</span>
              {isValidLeague && (
                <small className="d-block mb-2 red errors">
                  Please Enter Your league code.
                </small>
              )}
              {isValidEntercode && (
                <small className="d-block mb-2 red">
                  No such {teamCode} league code exists, Please enter another
                  league code.
                </small>
              )}
            </div>
            {isSuccfullyEntercode && (
              <div>
                <div className="JoinedLeague">
                  {" "}
                  <i className="fa fa-check-circle jionicon"></i>{" "}
                  &nbsp;&nbsp;Joined {uiLeagueName}
                </div>
              </div>
            )}
            {existLeagueName && (
              <small className="m-0">
                You are already joined the private league please enter another private league code.
              </small>
            )}
          </div>
          <div className="">
            <button
              className="button"
              type="submit"
              name="submit"
              value="Submit"
              onClick={handleEnterCompetition}
            >
              Enter Competitions
            </button>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
