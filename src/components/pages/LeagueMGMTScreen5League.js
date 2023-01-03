import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import logoimages from "../../images/logo_1.png";
import "../../assets/css/TeamSelection.css";
import EditLeaguePage from "./EditLeaguePage";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function LeagueMGMTScreen5League() {
  const [editLeague, setEditLeague] = useState(false);

  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const joinedTeamOnLeague = location.state.joinedTeamOnLeague;
  const email = location.state.email;
  let height = document.documentElement.scrollHeight;
  const handleSubmit = () => {
    setEditLeague(true);
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const getBoolian = () => {
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
  return (
    <>
      <div className="section playerlist-section">
        {loading ? (
        <div className="loader-container">
      	  <div className="spinner"> </div>
          <img src={logoimages} style={{ width:100,height:100, }} />
        </div>
      ) : (
        <div className="contenor">
        <div className="row top-bar mt-5">
          <div className="rowhaddingbar">

          <div className=" back-arrow">
            <i
              onClick={() => history.goBack()}
              className="fa fa-arrow-left ms-3"
              style={{ fontSize: "17px" }}
              aria-hidden="true"
            ></i>
          </div>
          <div className=" title text-center mb-4 w-100">Standings</div>
          </div>
        </div>

          <div className="row table-data w-100 m-0">
            <div className="Mgmthadding">
            <div className="mgmtplace">PLACE</div>
                <div className="mgmtteam">TEAM</div>
                <div className="mgmtpoint">POINTS</div>
            </div>
            {joinedTeamOnLeague &&
              joinedTeamOnLeague.map((league, index) => (
                <div
                  key={index}
                  id={"row-data-" + index}
                  className="col-12 MGMTRow d-flex justify-content-between"
                >
                  <div className="selectteamname">
                  <div style={{width:25,marginLeft:5}}>{index + 1}</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          
                      <div className="playernamebox">{league.leagueName}</div>{" "}
                      {/* {/ <div className="playernamebox">{team.teamName}</div>{" "} /} */}
              
                  </div>

                  <div className="points">{league.totalPoints}&nbsp;&nbsp;&nbsp;</div>
                </div>
              ))}
          </div>

          <div className="row btn-section">
            <button
              onClick={() => handleSubmit()}
              className="col-12 procced-btn"
            >
              Edit League Settings
            </button>
            <button
              onClick={() => handleHome()}
              className="col-12 procced-btn homebuton"
              style={{backgroundColor: 'transparent',color: '#e5007d',border: '1px solid '}}
            >
              Home
            </button>
          </div>
        </div>)}
      </div>
      {editLeague && <EditLeaguePage email = {email} height={height}  onClick={getBoolian}/>}
    </>
  );
}
