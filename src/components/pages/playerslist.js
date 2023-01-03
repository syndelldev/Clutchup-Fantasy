import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import logoimages from "../../images/logo_1.png";
import "../../assets/css/TeamSelection.css";

import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function LeagueMGMTScreen() {
  const [editLeague, setEditLeague] = useState(false);
  const [nersLeague, setNersLeague] = useState([]);
  const [historyleage, setHistoryLeage] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const email = location.state;
  console.log("email",email);
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
  useEffect(() =>{
    loadData();
  },[]);
  function compare(a, b) {
    if (a.teamScore < b.teamScore) {
      return -1;
    }
    if (a.teamScore > b.teamScore) {
      return 1;
    }
    return 0;
  }
  const loadData = async () => {
    const { data, error } = await supabase.from("selectedteam").select();
    let teamPlayersWithEmail = data.filter((teamPlayer) => {
        if (teamPlayer.email && teamPlayer.email !== "") {
            return true;
        }
        return false;
    });
    console.log(data);

    let teamGroupedByEmail = [];

    if (teamPlayersWithEmail.length > 0) {
    

      teamPlayersWithEmail.forEach((player) => {
        let previousCount = teamGroupedByEmail[player.email]
          ? teamGroupedByEmail[player.email].teamScore
          : 0;

        let count = previousCount + Number(player.pointsearend);

        let team = {
          teamName: player.teamname,
          teamScore: count,
        };
        teamGroupedByEmail[player.email] = team;
      });
    }


    let allKeys = Object.keys(teamGroupedByEmail);
    let teams = [];
    allKeys.forEach((key) => {
      teams.push(teamGroupedByEmail[key]);
    });

    teams = teams.sort(compare).reverse();

    if (teams) {
      const { data, error } = await supabase
        .from("league")
        .select()
        .match({email: email,type:'Private'});
        console.log("leagusdate",data);
      let joinedLeague = data.map((joinedLeague) => {
        return joinedLeague.leaguename;
      });
      var newData;

      joinedLeague.forEach(async (element, index) => {
        const { data } = await supabase
          .from("league")
          .select()
          .match({leaguename: element,type:'Private'});
    
      });
      console.log("vfdas",joinedLeague);

      for (let i = 0; i < joinedLeague.length; i++) {
        newData = [];
        const { data, error } = await supabase
          .from("league")
          .select()
          .match({leaguename: joinedLeague[i],type:'Private'});
        console.log(data);
        nersLeague.push({
          leagueName: joinedLeague[i],
          teams: data.map((league) => league.teamname),
          teamTotalScore: 0,
        });
      }
     ;
      var myFilerTeam = [];
      var count;
      nersLeague.map((myLeagueTeams, i) => {
        count = 0;
        myLeagueTeams.teams.forEach((team) => {
          teams.filter((teams) => {
            if (teams.teamName === team) {
              count = count + Number(teams.teamScore);
            }
          });
        });
        nersLeague[i].teamTotalScore = count;
      });
      nersLeague.sort(function (a, b) {
        return b.teamTotalScore - a.teamTotalScore;
      });
      console.log('dataofleag',nersLeague);
    }
    setHistoryLeage(nersLeague);
    console.log('data',nersLeague);
}
console.log("lagne",historyleage.length);
if(historyleage.length > 0){
  console.log('dataof',historyleage );
}

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
            <div className=" title text-center mb-4 w-100">League History</div>
            </div>
          </div>

          <div className="row table-data w-100 m-0">
            <div className="Mgmthadding">
              <div className="mgmtplace">PLACE</div>
                  <div className="mgmtteam">LEAGUE</div>
                  <div className="mgmtpoint">POINTS</div>
              </div>
            {nersLeague &&
              nersLeague.map((league, index) => (
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

                  <div className="points">{league.teamTotalScore}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                </div>
              ))}
          </div>

            {/* <div className="row btn-section">
              <button
                onClick={() => handleSubmit()}
                className="col-12 procced-btn mb-2"
              >
                Edit League Settings
              </button>
             
            </div> */}
          </div>
        )}
      </div>
     
    </>
  );
}
