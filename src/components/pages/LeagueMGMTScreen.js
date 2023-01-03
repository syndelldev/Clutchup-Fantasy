import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import logoimages from "../../images/logo_1.png";
import "../../assets/css/TeamSelection.css";
import EditLeaguePage from "./EditLeaguePage";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function LeagueMGMTScreen() {
  const [editLeague, setEditLeague] = useState(false);
  const [editLeaguebutton, setEditLeagueButton] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const {top3GlobalTeams, email, leaguebtn} = location.state;
  let height = document.documentElement.scrollHeight;
  const handleSubmit = async () => {
    console.log("emailc",email);
    const { data, error } = await supabase
    .from("createnewleague")
    .select()
    .match({email: email ,leaguename: leaguebtn });
  console.log(data);
  if(data.length !== 0){
    setEditLeagueButton(false);
    setEditLeague(true);
  }else{

    setEditLeagueButton(true);
    setEditLeague(false);
  }
  
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  // useEffect(() => {
  //   fachdata();
  // }, []);
  // const fachdata = async () => {
  //   console.log("email",email);
    
    
  // };
   const getBoolian =async () =>{
    setEditLeague(false);
    
   }
   const checkboxInput = {
    email : email,
  };
  const handleHome = async () => {
      history.push({
        pathname: "/landing-screen/",
        state: checkboxInput,
      });
  };
  console.log("fjdla",editLeague);
  return (
    <>
      <div className="section playerlist-section">
        {loading ? (
          <div className="loader-container">
            <div className="spinner"> </div>
            <img src={logoimages} style={{ width: 100, height: 100 }} />
          </div>
        ) : (
          <div className="contenor">
          <div className="row top-bar mt-2">
           
            <div className="haddinsmgmyssc">
              <i
                onClick={() => history.goBack()}
                className="fa fa-arrow-left ms-3"
                style={{ fontSize: "17px" }}
                aria-hidden="true"
              ></i>
              <div className="mainhaddings">{leaguebtn}</div>
             
            </div>
            <div className="text-center mb-4 w-100">   Standings</div>
            
          </div>

            <div className="row table-data w-100 m-0">
              <div className="Mgmthadding">
                <div className="mgmtplace">PLACE</div>
                <div className="mgmtteam">TEAM</div>
                <div className="mgmtpoint">POINTS</div>
              </div>
              {top3GlobalTeams &&
                top3GlobalTeams.map((team, index) => (
                  <div
                    key={index}
                    id={"row-data-" + index}
                    className="col-12 MGMTRow d-flex justify-content-between"
                  >
                    <div className="selectteamname">
                      <div style={{width:25,marginLeft:5}}>{index + 1}</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          
                        <div className="playernamebox">{team.teamName}</div>{" "}
                      
                    </div>

                    <div className="points">{team.teamScore}&nbsp;&nbsp;&nbsp;</div>
                  </div>
                ))}
            </div>

            <div className="row btn-section">
            <button
                onClick={() => handleSubmit()}
                className="col-12 procced-btn mb-2"
              >
                Edit League Settings
              </button> 
              {editLeaguebutton && (
        <small className="d-block mb-2 red errors text-center">
                  League can be modify by it's league owner only.
                </small>
      )}
              <button
              onClick={() => handleHome()}
              className="col-12 procced-btn homebuton"
              style={{backgroundColor: 'transparent',color: '#e5007d',border: '1px solid '}}
            >
              Home
            </button>
            </div>
          </div>
        )}
      </div>
      
      {editLeague && <EditLeaguePage email={email} height={height}  onClick={getBoolian}/> }
    </>
  );
}
