import { type } from "jquery";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import logoimages from "../../images/logo_1.png";
import { supabase } from "../../supabaseClient";

export default function SplashScreen() {
  const [loading, setLoading] = useState(false);
  const [teamCode, setTeamCode] = useState(null);
  const [existLeague, setExistLeague] = useState(false);
  const [existpublicLeague,setExistPublicLeague] = useState(false);
  const [isValidEntercode, setIsValidEntercode] = useState(false);
  const [isSuccfullyEntercode, setIsSuccfullyEntercode] = useState(false);
  const [pleseSelect, setPleseSelect] = useState(false);
  const [publiccheck, setPublicCheck] = useState(false);
  let [uiLeagueName, setUiLeagueName] = useState("");
  const location = useLocation();
  let leagueName;
  let leagueCode = null;
  console.log(location.state);
  let { email, teamname,  } = location.state;
  // =============================== page loder ==============================
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleTeamCode = async (e) => {
    const { value } = e.target;
    if (value === " ") {
      return;
    } else {

      setTeamCode(e.target.value);
    }
  };
//  =============================== swipup button query ==============================
  console.log(email);
  const checkboxInput = {
    publicCheck: publiccheck,
    email,
  };

  const history = useHistory();

  if (teamCode === "") {
    setTeamCode(null);
    setIsValidEntercode(false)
    setExistLeague(false)
  }
// ===================================next page ===================================
  const nextPage = async () => {
    console.log(publiccheck);
      console.log(publiccheck);
      if (teamCode === null) {
        if(publiccheck === true){
        const { data, error } = await supabase
            .from("league")
            .select()
            .match({ email: email });
          let existLeagueName = data.filter((userJoinedLeague) => {
            return userJoinedLeague.email === email;
          });
          console.log(existLeagueName);
          if (existLeagueName.length !== 0) {
            setExistPublicLeague(true);
          } else {
            setExistPublicLeague(false);
            const { data, error } = await supabase
            .from("globalleague")
            .select();
            console.log("file",data);
            const globalleaguename = data[0].leaguename;
            const globalleaguecode = data[0].leaguecode;
    
             if(data.length !== 0){
              const { data } = await supabase.from("league").insert({
                leaguename: globalleaguename,
                teamcode: globalleaguecode,
                email: email,
                teamname: teamname,
                type:'Global',
              });
              //console.log("insert",data);
             }
            
            // --------------------------store data in supabase------------------------------------
            history.push({
              pathname: "/landing-screen/",
              state: checkboxInput,
            });
             
            //============================= store data in supabase ===================
            
          }
        }else{
setPleseSelect(true);
        }
      }else{
        setPleseSelect(false);
        console.log("dsaf",teamCode);
        const { data, error } = await supabase
          .from("createnewleague")
          .select()
          .match({ leaguecode: teamCode.toLowerCase() });
        if (data[0] !== undefined || null) {
          leagueName = data[0].leaguename;
          leagueCode = data[0].leaguecode.toLowerCase();
          setUiLeagueName(leagueName);
        }
          
        console.log(data);
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
          if (existLeagueName.length !== 0) {
            setExistLeague(true);
          } else {
            setExistLeague(false);
  
            // --------------------------store data in supabase------------------------------------
            
              const { data } = await supabase.from("league").insert({
                leaguename: leagueName,
                teamcode: leagueCode,
                email: email,
                teamname: teamname,
                type:'Private',
              });
            setIsSuccfullyEntercode(true);
            history.push({
              pathname: "/landing-screen/",
              state: checkboxInput,
            });
            console.log(data);
            //============================= store data in supabase ===================
            
          }
        }
      }
  };

  const publicCheckBox = (e) => {
    if (e.target.checked) {
      setPublicCheck(true);
      console.log(e.target.checked);
    } else {
      setPublicCheck(false);
      //checkboxInput.publicCheck = false;
    }
  };
  return (
    <>
      <div>
        <div className="section">
          {loading ? (
            <div className="loader-container">
              <div className="spinner"></div>
              <img src={logoimages} style={{ width: 100, height: 100 }} />
            </div>
          ) : (
            <div className="Entercontener">
              <div className="mainhadding">
                <div className="back-arrow">
                  <i
                    onClick={(e) => history.goBack()}
                    className="fa fa-arrow-left mt-3"
                    aria-hidden="true"
                  ></i>
                </div>
                <div className="Competition mt-2">Enter Competition</div>
              </div>
              <div className="Enterhadding ms-2 my-4">
                You can enter your team into multiple Public and Private Leagues
              </div>
              <div className="Enterrow mt-1">
                <div className="Entercol">
                  <div className="boxhadding">Public Leaderboards</div>
                  <div className="boxdetiles">
                    See how you stack up against everyone playing
                  </div>
                </div>
                <div className="Entercol">
                  <label className="switch">
                    <input
                      id="checkboxinp"
                      type="checkbox"
                      onClick={publicCheckBox}
                    />
                    <div className="slider round"></div>
                  </label>
                </div>
              </div>

              <div className="Enterrow">
                <div className="Entercol">
                  <div className="boxhadding">Private Pools</div>
                  <div className="boxdetiles">
                    See how you stack up against everyone playing
                  </div>
                </div>
                <div className="Entercol">
                </div>
              </div>
              <div
                className="user-input-wrp"
                style={{ width: "98%", margin: "auto" }}
              >
                <br />
                <input
                  type="text"
                  value={teamCode}
                  autoCorrect="off"
                  autoComplete="off"
                  onChange={handleTeamCode}
                  className="inputText"
                  required
                />
                <span className="floating-label">Enter League Code</span>
                {isValidEntercode && (
                  <small className="d-block mb-2 red">
                    No such {teamCode} teamcode exists Please enter another
                    teamcode.
                  </small>
                )}
                {isSuccfullyEntercode && (
                  <div>
                    <div className="JoinedLeague">
                      {" "}
                      <i className="fa fa-check-circle jionicon"></i>{" "}
                      &nbsp;&nbsp;Joined {uiLeagueName}
                    </div>
                  </div>
                )}
                {existLeague && (
                  <small>
                    You are already joined the private league please enter another private league code.
                  </small>
                )}
                {existpublicLeague && (
                  <small>
                    You are already joined the public league please enter private league code.
                  </small>
                )}
                <div className="btn2">
                  <button
                    className="button ent-comp-btn"
                    style={{
                      textAlign: "center",
                      width: "100%",
                      margin: "auto",
                    }}
                    onClick={nextPage}
                  >
                    Enter Competitions
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {pleseSelect && (
        <div className="editcontent">
          <div className="EditconfoBox">
            <div className="editcontenthad">
              <div className="edithade">
                {" "}
                Please Select Public Leaderboard.
              </div>
            </div>
            <div className="editlinksbox">
              <button
                style={{
                  background: "none",
                  border: "none",
                  width: "100%",
                  height: "inherit",
                }}
                onClick={() => {
                  setPleseSelect(false);
                }}
              >
                YES
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
