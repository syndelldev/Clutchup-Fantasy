import React, { useState, useEffect, useRef } from "react";
import "./Style.css";
import { supabase } from "../../supabaseClient";
import { useHistory } from "react-router-dom";

const Leaderboards = (props) => {
  const { myTeam, email } = props;

  const [top3GlobalTeams, setTop3GlobalTeams] = useState([]);
  const [joinedTeamOnLeague, setJoinedTeamOnLeague] = useState([]);
  const [usersEmail, setUsersEmail] = useState([]);
  const [loading, setLoading] = useState(true);
  const[loadingnel,setLoadingNel] = useState(true);
  const[loadinggolbl,setLoadinggolbl] = useState(true);
  const [buttonLeague,setButtonLeague] = useState('');
  const [nersLeague, setNersLeague] = useState([]);
  const [Leaguename,set5Leaguename] = useState('')
  const [leaguebtn,setLeagueBtn] = useState('')
  const [Leaguenameval, setLeaguenameval] = useState([]);
  const [activeTab, setActiveTab] = useState("global");
  const [nearTab, setNearTab] = useState("");

  var filterData = [];
  let points = [];
  const [asandindPoints5League, setAsandindPoints5League] = useState([]);
  const [totalPointsOfAllTeam, setTotalPointsOfAllTeam] = useState([]);
  let joinedLeague = [];

  const history = useHistory();

  useEffect(() => {
    fetchNersLeague();
    fetchGlobal();
    fetch5League();
    fetchUsersWithEmail();
  }, []);

  // ----------------handle button click of leaderboard---------------------
  const handleTabnyarChange = (tabName) => {
    setActiveTab(tabName);
    setNearTab(tabName);
    fetchleagteamdata(tabName);
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    //setNearTab(tabName);
    //fetchleagteamdata(tabName);
  };
  const fetchUsersWithEmail = async () => {
    const { data, error } = await supabase.from("user").select("email");
    setUsersEmail(data);
  };

  // ----------------------------5league--------------------------------------------
  const fetch5League = async () => {
    const { data, error } = await supabase.from("user").select();
    const leagueName = [];
    console.log(data[0].LeagueName);
    set5Leaguename(data[0].LeagueName)
    data.forEach((user) => {
      if (user.email && user.LeagueName !== null) {
        leagueName.push(user.LeagueName);
      }
    });

    if (leagueName.length > 0) {
      for (let i = 0; i < leagueName.length; i++) {
        const { data, error } = await supabase
          .from("league")
          .select()
          .match({leaguename: leagueName[i],type:'Private'});
        joinedTeamOnLeague.push({
          leagueName: leagueName[i],
          teamName: data.map((user) => user.teamname),
          teams: [],
        });
      }

 if (joinedTeamOnLeague.length !== 0) {
        joinedTeamOnLeague.map((teams, i) => {
          teams.teamName.forEach(async (team) => {
            const { data, error } = await supabase
              .from("selectedteam")
              .select()
              .eq("teamname", team);
              
            joinedTeamOnLeague[i].teams = [
              ...joinedTeamOnLeague[i].teams,
              data.map((player) => player),
              
            ];
          });
        });
      }
    }
    setLoading(false);
  };

  if (joinedTeamOnLeague) {
    joinedTeamOnLeague.map((team, i) => {
      totalPointsOfAllTeam[i] = team.teams.map((teams) =>
        teams.map((player) => {
          return player.pointsearend;
        })
      );
    });
    // -------------------------------total count---------------------------
    let totalPointsLeague = [];
    if (totalPointsOfAllTeam) {
      for (let i = 0; i < totalPointsOfAllTeam.length; i++) {
        totalPointsLeague[i] = 0;
        for (let j = 0; j < totalPointsOfAllTeam[i].length; j++) {
          for (let k = 0; k < totalPointsOfAllTeam[i][j].length; k++) {
            totalPointsLeague[i] =
              totalPointsLeague[i] + Number(totalPointsOfAllTeam[i][j][k]);
          }
        }
      }
    }

    if (totalPointsLeague.length !== 0) {
      totalPointsLeague.map((tPoints) => asandindPoints5League.push(tPoints));
      // -------------------------------sorting------------------------------
      let a;
      if (asandindPoints5League.length > 0) {
        for (let i = 0; i < asandindPoints5League.length; ++i) {
          for (let j = i + 1; j < asandindPoints5League.length; ++j) {
            if (asandindPoints5League[i] < asandindPoints5League[j]) {
              a = asandindPoints5League[i];
              asandindPoints5League[i] = asandindPoints5League[j];
              asandindPoints5League[j] = a;
            }
          }
        }
      }
    }

    if (totalPointsLeague[0] !== 0) {
      for (let i = 0; i < totalPointsLeague.length; i++) {
        joinedTeamOnLeague[i].totalPoints = totalPointsLeague[i];
      }
    }
  }

  // ---------------------------sorting league of 5 league----------------------
  if (joinedTeamOnLeague) {
    joinedTeamOnLeague.sort(function (a, b) {
      return b.totalPoints - a.totalPoints;
    });
  }

  // -----------------------------------global---------------------------------
  const fetchGlobal = async () => {
    setLoadinggolbl(true);
    let teamPlayersWithEmail =[];
    let goloballeag = [];
    let teams = [];
    const { data, error } = await supabase.from("league").select().match({type:"Global",email:email});
    console.log("file",data);
    if(data.length !== 0){
      setLoadinggolbl(true);

    const { data, error } = await supabase.from("league").select().eq("type","Global");
    // console.log(data[0].leaguename);
    setLeagueBtn(data[0].leaguename);
    goloballeag.push(data);
    console.log("assdwsdf",goloballeag[0].length);
    for(let i=0; i < goloballeag[0].length; i++){
    console.log("assds",goloballeag[0][i].teamname);
    const { data, error } = await supabase.from("selectedteam").select().eq("teamname",goloballeag[0][i].teamname);
    console.log("shfnvdc",data);
    teamPlayersWithEmail = data.filter((teamPlayer) => {
      if (teamPlayer.email && teamPlayer.email !== "") {
        return true;
      }
      return false;
    });
  
  console.log("shfnv",teamPlayersWithEmail);
    let teamGroupedByEmail = [];

    if (teamPlayersWithEmail.length > 0) {

      teamPlayersWithEmail.forEach((player) => {
        let previousCount = teamGroupedByEmail[player.email]
          ? teamGroupedByEmail[player.email].teamScore
          : 0;

        let count = previousCount + Number(player.pointsearend);

        let team = {
          teamName: player.username,
          teamScore: count,
        };
        teamGroupedByEmail[player.email] = team;
      });
    }

    let allKeys = Object.keys(teamGroupedByEmail);
    
    allKeys.forEach((key) => {
      teams.push(teamGroupedByEmail[key]);
    });

    teams = teams.sort(compare).reverse();
  }
    setTop3GlobalTeams(teams);
    console.log("dfsdf",teams);
    setLoadinggolbl(false);

  }else{
    let joinleag = [];
    const { data, error } = await supabase.from("league").select().match({email: email,type:'Private'});
    // console.log(data[0].leaguename);
    //setLeagueBtn(data[0].leaguename)
    console.log("cdjfk",data);
    joinleag.push(data);
    console.log("assdwsdf",joinleag[0]);
    joinedLeague = data.map((joinedLeague) => {
          return joinedLeague.leaguename;
        });
    console.log("lgmanem",joinedLeague[0]);
    setActiveTab(joinedLeague[0]);
    setNearTab(joinedLeague[0]);
    fetchleagteamdata(joinedLeague[0]);
  }
  setLoadinggolbl(false);

  };
  
  function compare(a, b) {
    if (a.teamScore < b.teamScore) {
      return -1;
    }
    if (a.teamScore > b.teamScore) {
      return 1;
    }
    return 0;
  }
  // useEffect(() => {
  //   fetchGlobal();
  //   fetchNersLeague();
  //   fetch5League();
  //   fetchUsersWithEmail();
  // }, []);

  const fetchleagteamdata = async (leagname) => {
    setLoadingNel(true);
      console.log("namevausda",leagname);
      setNersLeague([]);
      let teamPlayersWithEmail =[];
    let joinleag = [];
    let teams = [];
    console.log("sdcb",nersLeague);
    const { data, error } = await supabase.from("league").select().match({leaguename: leagname,type:'Private'});
    console.log("lisrdata",data);
    joinleag.push(data);
    for(let i=0; i < joinleag[0].length; i++){
      console.log("assdsqec",joinleag[0]);
      const { data, error } = await supabase.from("selectedteam").select().eq("teamname",joinleag[0][i].teamname);
      console.log("shfnvdcqefv",data);
      teamPlayersWithEmail = data.filter((teamPlayer) => {
        if (teamPlayer.email && teamPlayer.email !== "") {
          return true;
        }
        return false;
      });
    
    console.log("shfnv",teamPlayersWithEmail);
      let teamGroupedByEmail = [];
  
      if (teamPlayersWithEmail.length > 0) {
  
        teamPlayersWithEmail.forEach((player) => {
          let previousCount = teamGroupedByEmail[player.email]
            ? teamGroupedByEmail[player.email].teamScore
            : 0;
  
          let count = previousCount + Number(player.pointsearend);
  
          let team = {
            teamName: player.username,
            teamScore: count,
          };
          teamGroupedByEmail[player.email] = team;
        });
      }
  
      let allKeys = Object.keys(teamGroupedByEmail);
      
      allKeys.forEach((key) => {
        teams.push(teamGroupedByEmail[key]);
      });
  
        teams = teams.sort(compare).reverse();
      }
      setNersLeague(teams);
      console.log("joinleg",teams);
      setLoadingNel(false);
    // const { data, error } = await supabase.from("user").select("email");
    // setUsersEmail(data);
  };
  // -----------------------------------nersleague---------------------------------------
  const fetchNersLeague = async () => {
    setLoadingNel(true);
    let teamPlayersWithEmail =[];
    let joinleag = [];
    let teams = [];
    let leagnameval = [];
    const { data, error } = await supabase.from("league").select().match({email: email,type:'Private'});
    // console.log(data[0].leaguename);
    //setLeagueBtn(data[0].leaguename)
    console.log("cdjfk",data);
    joinleag.push(data);
    if(data.length !== 0){
    console.log("assdwsdf",joinleag[0]);
    joinedLeague = joinleag[0].map((joinedLeague) => {
         console.log("fnbma",joinedLeague);
          return joinedLeague.leaguename;
        });
    setLeaguenameval(joinedLeague);
    console.log("list",joinedLeague);
    for(let i=0; i < joinleag.length; i++){
        //console.log("fhdjk",joinleag[0][i].leaguename);
        const { data } = await supabase
          .from("createnewleague")
          .select()
          .eq("leaguename",joinleag[0][i].leaguename);
          console.log("vcnsm",data);
         leagnameval.push(data[0].teamname);
    }
    console.log("mycajs",leagnameval.length);
    
      // joinedLeague.forEach(async (element, index) => {
      // console.log("name",element);
      //   const { data } = await supabase
      //     .from("user")
      //     .select()
      //     .match({leaguename: element});
      //     console.log("vcnsm",data);
      //    leagnameval.push(data);
      // });
      //setButtonLeague(joinedLeague[0].leaguename);
      //console.log("myleagx", joinedLeague);
     // setButtonLeague(joinedLeague[0].leaguename);
    for(let i=0; i < leagnameval.length; i++){
    console.log("assdsqec",leagnameval[i]);
    const { data, error } = await supabase.from("selectedteam").select().eq("teamname",leagnameval[i]);
    console.log("shfnvdcqefv",data);
    teamPlayersWithEmail = data.filter((teamPlayer) => {
      if (teamPlayer.email && teamPlayer.email !== "") {
        return true;
      }
      return false;
    });
  
  console.log("shfnv",teamPlayersWithEmail);
    let teamGroupedByEmail = [];

    if (teamPlayersWithEmail.length > 0) {

      teamPlayersWithEmail.forEach((player) => {
        let previousCount = teamGroupedByEmail[player.email]
          ? teamGroupedByEmail[player.email].teamScore
          : 0;

        let count = previousCount + Number(player.pointsearend);

        let team = {
          teamName: player.username,
          teamScore: count,
        };
        teamGroupedByEmail[player.email] = team;
      });
    }

    let allKeys = Object.keys(teamGroupedByEmail);
    
    allKeys.forEach((key) => {
      teams.push(teamGroupedByEmail[key]);
    });

      teams = teams.sort(compare).reverse();
    }
    setNersLeague(teams);
    console.log("joinleg",teams);
  }
    // console.log("buttom",leaguebtn);
    // if(leaguebtn === ''){

    // }
    // const { data, error } = await supabase.from("selectedteam").select();
    
    // let teamPlayersWithEmail = data.filter((teamPlayer) => {
    //   if (teamPlayer.email && teamPlayer.email !== "") {
    //     return true;
    //   }
    //   return false;
    // });

    // let teamGroupedByEmail = [];

    // if (teamPlayersWithEmail.length > 0) {
    

    //   teamPlayersWithEmail.forEach((player) => {
    //     let previousCount = teamGroupedByEmail[player.email]
    //       ? teamGroupedByEmail[player.email].teamScore
    //       : 0;

    //     let count = previousCount + Number(player.pointsearend);

    //     let team = {
    //       teamName: player.teamname,
    //       teamScore: count,
    //     };
    //     console.log();
    //     teamGroupedByEmail[player.email] = team;
    //   });
    // }


    // let allKeys = Object.keys(teamGroupedByEmail);
    // let teams = [];
    // allKeys.forEach((key) => {
    //   teams.push(teamGroupedByEmail[key]);
    // });

    // teams = teams.sort(compare).reverse();

    // if (teams) {
    //   const { data, error } = await supabase
    //     .from("league")
    //     .select()
    //     .match({email: email,type:'Private'});
    //   let joinedLeague = data.map((joinedLeague) => {
    //     return joinedLeague.leaguename;
    //   });
    //   var newData;

    //   joinedLeague.forEach(async (element, index) => {
    //     const { data } = await supabase
    //       .from("league")
    //       .select()
    //       .match({leaguename: element,type:'Private'});
    
    //   });

    //   for (let i = 0; i < joinedLeague.length; i++) {
    //     newData = [];
    //     const { data, error } = await supabase
    //       .from("league")
    //       .select()
    //       .match({leaguename: joinedLeague[i],type:'Private'});
          
    //         setButtonLeague(data[0].leaguename);
    //       nersLeague.push({
    //         leagueName: joinedLeague[i],
    //         teams: data.map((league) => league.teamname),
    //         teamTotalScore: teams.teamScore,
    //       });
    //     } 
          
    //  ;
    //   var myFilerTeam = [];
    //   var count;
    //   nersLeague.map((myLeagueTeams, i) => {
    //     count = 0;
    //     myLeagueTeams.teams.forEach((team) => {
    //       teams.filter((teams) => {
    //         if (teams.teamName === team) {
    //           count = count + Number(teams.teamScore);
    //         }
    //       });
    //     });
    //     nersLeague[i].teamTotalScore = count;
    //   });
    //    console.log(nersLeague);
    //   nersLeague.sort(function (a, b) {
    //     return b.teamTotalScore - a.teamTotalScore;
    //   });
    setLoadingNel(false);
  };

  // ------------------------------leader board button click-------------------------------
  const viewAllGlobal = () => {
    history.push({
      pathname: "/league-mgmt-screen/",
      state: {top3GlobalTeams, email, leaguebtn},
    });
  };

  const viewAllNersLeague = () => {
    console.log("leagdata",nersLeague);
    history.push({
      pathname: "/league-mgmt-screen-ners-league/",
      state: {nersLeague, email, nearTab},
    });
  };

  const viewAllLeague5 = () => {
    history.push({
      pathname: "/league-mgmt-screen-5league/",
      state: {joinedTeamOnLeague, email},
    });
  };
  console.log("cnvmd",Leaguenameval);
  return (
    <>
     {loading ? (
          <div className="loader-containersss">
            <div className="spinnerss"></div>
           
          </div>
        ) : (
    <div className="landing-box">
      <h4 className="p-3 contenthadding">Leaderboards</h4>
      <div className="btn-container w-100" style={{ marginBottom: '10px' }}>
          <div className="rowscontents">
          <div className="leaguerow" style ={{overflowX:'auto',overflowY:"hidden",scrollBehavior:'smooth'}}>
          {leaguebtn &&(
          <ul className="buttonsui">
            <li className="buttonli">
            <button 

              onClick={() => handleTabChange("global")}
              className={ 
                activeTab === "global" ? "activebutton " : "Leaderboards-button "
              }
            >
              {leaguebtn}
            </button>
            </li>
          </ul>
          )}
        
         
           
            {Leaguenameval &&(
            Leaguenameval.map((legnam,i) =>{
              {console.log("cnvmd",legnam);}
              return(
                <ul key={i}  className= 'buttonsui'>
                  <li className="buttonli">
                  <button
                onClick={() => handleTabnyarChange(legnam)}
                className={
                  activeTab === legnam ? "activebutton" : "Leaderboards-button"
                }
              >
                {legnam}
              </button>
                  </li>
                </ul>
              )
            }))}
            </div>
          </div>
          
        
      
          {/* <label>
            <button
              onClick={() => handleTabChange("fiveLeague")}
              className={ 
                activeTab === "fiveLeague"
                  ? "activebutton"
                  : "Leaderboards-button"
              }
            >
              {Leaguename}
            </button>
          </label> */}
        
      </div>

      {activeTab === "global" && (
        <>
          {loadinggolbl ? (
          
          <div className="spoilorloder">
            <div className="spinnerssun "></div>
          </div>
          
         
        
        ) : (<table className="table">
            <thead>
              <tr className="border-btm">
                <th style={{ fontSize: 11, color: "#757575" }}>&nbsp;&nbsp;&nbsp;TEAM</th>
                <th
                  style={{
                    fontSize: 11,
                    color: "#757575",
                    textAlign: "right",
                    paddingRight: "1%",
                  }}
                >
                  SCORED&nbsp;&nbsp;
                </th>
              </tr>
            </thead>
            <tbody>
              {top3GlobalTeams.length > 0 &&
                top3GlobalTeams.map((team, i) => {
                  if (i <= 2) {
                    return (
                      <tr key={i}>
                        <td style={{ fontSize: 17 }}>
                        &nbsp;&nbsp;&nbsp;{i + 1}. {team.teamName}
                        </td>
                        <td
                          className="teamnameonbord"
                        >
                          {team.teamScore}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>)}
          <button className="landingbuttonlink" onClick={viewAllGlobal}>
            View All
          </button>
        </>
      )}
      {activeTab === nearTab && (
        <>
         {loadingnel? (
          
            <div className="spoilorloder">
              <div className="spinnerssun "></div>
            </div>
            
           
          
          ) : (<table className="table">
            <thead>
              <tr className="border-btm">
                <th style={{ fontSize: 11, color: "#757575" }}>&nbsp;&nbsp;&nbsp;TEAM</th>
                <th
                  style={{
                    fontSize: 11,
                    color: "#757575",
                    textAlign: "right",
                    paddingRight: "1%",
                  }}
                >
                  SCORED&nbsp;&nbsp;
                </th>
              </tr>
            </thead>
            <tbody>
              {nersLeague &&
                nersLeague.map((league, i) => {
                  if (i <= 2) {
                    return (
                      <tr key={i}>
                        <td style={{ fontSize: 17 }}>
                        &nbsp;&nbsp;&nbsp;{i + 1}. {league.teamName}
                        </td>
                        <td
                          style={{
                            fontsize: 13,
                            color: "#E5007D",
                            textAlign: "right",
                            paddingRight: "2%",
                          }}
                        >
                          {league.teamScore}
                          &nbsp;&nbsp;&nbsp;
                        </td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>)}
          <button className="landingbuttonlink" onClick={viewAllNersLeague}>
            View All
          </button>
        </>
      )}
      {activeTab === "fiveLeague" && (
        <>
          <table className="table">
            <thead>
              <tr className="border-btm">
                <th style={{ fontSize: 11, color: "#757575" }}>&nbsp;&nbsp;&nbsp;LEAGUE</th>
                <th
                  style={{
                    fontSize: 11,
                    color: "#757575",
                    textAlign: "right",
                    paddingRight: "1%",
                  }}
                >
                  SCORED&nbsp;&nbsp;
                </th>
              </tr>
            </thead>
            <tbody>
              {joinedTeamOnLeague &&
                joinedTeamOnLeague.map((league, i) => {
                  if (i <= 4) {
                    return (
                      <tr key={i}>
                        <td style={{ fontSize: 17 }}>
                          &nbsp;&nbsp;&nbsp;{i + 1}. {league.leagueName}
                        </td>
                        <td
                          style={{
                            fontsize: 13,
                            color: "#E5007D",
                            textAlign: "right",
                            paddingRight: "2%",
                          }}
                        >
                          {league.totalPoints}
                          &nbsp;&nbsp;&nbsp;&nbsp;
                        </td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
          <button className="landingbuttonlink" onClick={viewAllLeague5}>
            View All
          </button>
        </>
      )}
    </div>)}
    </>
  );
};

export default Leaderboards;
